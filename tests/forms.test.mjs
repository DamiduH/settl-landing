import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, test } from "node:test";
import ts from "typescript";

// Transpile the real modules in memory; no generated files or database needed.
const asModule = (source) => "data:text/javascript;base64," + Buffer.from(ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText).toString("base64");
const validationUrl = asModule(readFileSync(new URL("../lib/forms/validation.ts", import.meta.url), "utf8"));
const { validateSubmission } = await import(validationUrl);
const serverSource = readFileSync(new URL("../lib/forms/server.ts", import.meta.url), "utf8")
  .replace('import "server-only";', "")
  .replace('"./validation"', JSON.stringify(validationUrl));
const { handleSubmission } = await import(asModule(serverSource));

const originalFetch = globalThis.fetch;
const originalEnv = { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SECRET_KEY, vercel: process.env.VERCEL };
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [name, value] of [["SUPABASE_URL", originalEnv.url], ["SUPABASE_SECRET_KEY", originalEnv.key], ["VERCEL", originalEnv.vercel]]) {
    if (value === undefined) delete process.env[name]; else process.env[name] = value;
  }
});
const waitlist = {
  request_id: "a9dc49e3-5350-4c5b-925d-769a596ced49", name: " Test Person ", email: "TEST@example.com",
  whatsapp: "+94 771234567", work: "Development", paid: ["PayPal", "Upwork"], consent: "on",
};
const demo = { request_id: waitlist.request_id, name: "Test Person", email: "test@example.com", message: "Hello" };
const request = (body, headers = {}) => {
  const merged = new Headers({ "Content-Type": "application/json", origin: "https://settl.example" });
  for (const [key, value] of Object.entries(headers)) merged.set(key, value);
  return new Request("https://settl.example/api/forms/waitlist", { method: "POST", headers: merged, body: JSON.stringify(body) });
};
const configure = () => {
  process.env.SUPABASE_URL = "https://test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
};

test("waitlist normalizes contact fields and preserves all selected platforms", () => {
  const row = validateSubmission("waitlist", waitlist);
  assert.equal(row.name, "Test Person");
  assert.equal(row.email, "test@example.com");
  assert.equal(row.whatsapp, "+94771234567");
  assert.deepEqual(row.payment_platforms, ["PayPal", "Upwork"]);
  assert.equal(row.consent, true);
  assert.deepEqual(validateSubmission("waitlist", { ...waitlist, paid: undefined }).payment_platforms, []);
});

test("Other choices require details and preserve trimmed answers", () => {
  const other = { ...waitlist, work: "Other", paid: ["PayPal", "Other"], work_other: " Teaching ", paid_other: " Bank transfer " };
  const row = validateSubmission("waitlist", other);
  assert.equal(row.work_other, "Teaching");
  assert.equal(row.paid_other, "Bank transfer");
  for (const field of ["work_other", "paid_other"]) {
    for (const invalid of [undefined, "", "   ", "x".repeat(201), []]) {
      assert.throws(() => validateSubmission("waitlist", { ...other, [field]: invalid }));
    }
  }
  const regular = validateSubmission("waitlist", { ...waitlist, work_other: "Stale answer", paid_other: "Stale answer" });
  assert.equal(regular.work_other, undefined);
  assert.equal(regular.paid_other, undefined);
});

test("WhatsApp requires +94 and exactly nine following digits", () => {
  for (const whatsapp of ["+94 771234567", "+94771234567"]) assert.doesNotThrow(() => validateSubmission("waitlist", { ...waitlist, whatsapp }));
  for (const whatsapp of ["+94", "+94 77123456", "+94 7712345678", "+94 77abc4567", "0771234567", "+91 771234567", "+94         "]) {
    assert.throws(() => validateSubmission("waitlist", { ...waitlist, whatsapp }));
  }
});

test("contact preference is optional and never records unchecked consent", () => {
  for (const consent of [undefined, false]) {
    const row = validateSubmission("waitlist", { ...waitlist, consent });
    assert.equal(row.consent, false);
    assert.equal(row.consent_at, null);
  }
  for (const consent of [true, "on"]) {
    assert.equal(validateSubmission("waitlist", { ...waitlist, consent }).consent, true);
  }
  for (const consent of ["yes", "false", [], {}]) {
    assert.throws(() => validateSubmission("waitlist", { ...waitlist, consent }));
  }
});

test("validation rejects invalid choices, whitespace names, bad email and wrong types", () => {
  for (const patch of [{ work: "Hacked" }, { paid: ["Unknown"] }, { paid: "PayPal" }, { name: "   " }, { email: "invalid" }, { name: {} }, { request_id: "bad" }]) {
    assert.throws(() => validateSubmission("waitlist", { ...waitlist, ...patch }));
  }
  assert.throws(() => validateSubmission("demo", { ...demo, message: "x".repeat(5001) }));
  assert.equal(validateSubmission("demo", demo).organisation, "");
});

test("API rejects invalid data, foreign origin and oversized bodies without accessing Supabase", async () => {
  globalThis.fetch = () => { throw new Error("Unexpected network call"); };
  assert.equal((await handleSubmission(request({ ...waitlist, whatsapp: "letters" }), "waitlist")).status, 400);
  assert.equal((await handleSubmission(request(waitlist, { origin: "https://other.example" }), "waitlist")).status, 403);
  assert.equal((await handleSubmission(request(waitlist, { "sec-fetch-site": "cross-site" }), "waitlist")).status, 403);
  assert.equal((await handleSubmission(request({ message: "x".repeat(17000) }), "demo")).status, 413);
  assert.equal((await handleSubmission(new Request("https://settl.example", { method: "POST", headers: { "content-type": "application/json" }, body: "{" }), "demo")).status, 400);
  assert.equal((await handleSubmission(request(waitlist, { "content-type": "text/plain" }), "waitlist")).status, 415);
});

test("unconfigured storage fails honestly and honeypot avoids database writes", async () => {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SECRET_KEY;
  globalThis.fetch = () => { throw new Error("Unexpected network call"); };
  assert.equal((await handleSubmission(request(waitlist), "waitlist")).status, 503);
  assert.deepEqual(await (await handleSubmission(request({ website: "bot.example" }), "waitlist")).json(), { success: true });
});

test("successful API stores normalized data using a server secret and duplicate-safe insert", async () => {
  configure();
  process.env.VERCEL = "1";
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options });
    return calls.length === 1 ? Response.json(true) : new Response(null, { status: 201 });
  };
  const response = await handleSubmission(request(waitlist, { "x-vercel-forwarded-for": "192.0.2.1" }), "waitlist");
  assert.deepEqual(await response.json(), { success: true });
  assert.match(calls[0].url, /rpc\/consume_form_rate_limit$/);
  assert.match(JSON.parse(calls[0].body).client_hash, /^[0-9a-f]{64}$/);
  assert.ok(!calls[0].body.includes("192.0.2.1"));
  assert.match(calls[1].url, /waitlist_signups\?on_conflict=email$/);
  assert.equal(calls[1].headers.apikey, "sb_secret_test");
  assert.equal(calls[1].headers.Authorization, undefined);
  assert.equal(calls[1].headers.Prefer, "resolution=ignore-duplicates,return=minimal");
  assert.equal(JSON.parse(calls[1].body).whatsapp, "+94771234567");
  assert.equal(JSON.parse(calls[1].body).email, "test@example.com");
});

test("demo retries use the same request ID as conflict key", async () => {
  configure();
  let inserts = 0;
  globalThis.fetch = async (url, options) => {
    if (url.includes("/rpc/")) return Response.json(true);
    assert.match(url, /demo_requests\?on_conflict=request_id$/);
    assert.equal(JSON.parse(options.body).request_id, demo.request_id);
    inserts++;
    return new Response(null, { status: 201 });
  };
  for (let i = 0; i < 2; i++) assert.equal((await handleSubmission(request(demo), "demo")).status, 200);
  assert.equal(inserts, 2); // Database ON CONFLICT, rather than process memory, suppresses duplicates.
});

test("local development submissions bypass the shared limiter but still save", async () => {
  configure();
  const previousNodeEnv = process.env.NODE_ENV;
  delete process.env.VERCEL;
  process.env.NODE_ENV = "development";
  try {
    let inserts = 0;
    globalThis.fetch = async (url) => {
      assert.ok(!url.includes("/rpc/"));
      inserts++;
      return new Response(null, { status: 201 });
    };
    for (let i = 0; i < 6; i++) {
      assert.equal((await handleSubmission(request(waitlist), "waitlist")).status, 200);
    }
    assert.equal(inserts, 6);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});

test("rate-limited requests return retry guidance without inserting", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json(false); };
  const response = await handleSubmission(request(waitlist), "waitlist");
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "600");
  assert.equal(calls, 1);
});

test("database and rate-limiter failures do not report success or expose provider errors", async () => {
  configure();
  for (const failureAt of ["rate", "insert", "network"]) {
    globalThis.fetch = async (url) => {
      if (failureAt === "network") throw new Error("secret provider detail");
      if (url.includes("/rpc/") && failureAt !== "rate") return Response.json(true);
      return Response.json({ error: "secret provider detail" }, { status: 500 });
    };
    const response = await handleSubmission(request(waitlist), "waitlist");
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.success, undefined);
    assert.ok(!body.error.includes("secret provider detail"));
  }
});
