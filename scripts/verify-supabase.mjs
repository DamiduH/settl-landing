import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const origin = process.argv[2];
if (!origin || !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
  throw new Error("Provide a local production server URL, e.g. http://localhost:3100. Start it with VERCEL=1 for isolated test IP limits.");
}
const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("Missing Supabase configuration.");
const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const headers = { apikey: secret, "Content-Type": "application/json" };
if (!secret.startsWith("sb_secret_")) headers.Authorization = `Bearer ${secret}`;
const base = `${url.replace(/\/$/, "")}/rest/v1`;
const run = randomUUID();
const email = `security-${run}@example.invalid`;
const waitId = randomUUID();
const demoId = randomUUID();
const ip = `2001:db8:${run.slice(0, 4)}:${run.slice(4, 8)}::1`;
const api = async (kind, data, extraHeaders = {}) => fetch(`${origin}/api/forms/${kind}`, {
  method: "POST", headers: { "Content-Type": "application/json", origin, "x-vercel-forwarded-for": ip, ...extraHeaders },
  body: JSON.stringify(data), signal: AbortSignal.timeout(20000),
});
const waitlist = { name: "Automated Security Test", email, whatsapp: "+94 771234567", work: "Development", paid: ["PayPal"], consent: "on", request_id: waitId };
const demo = { name: "Automated Security Test", email, organisation: "Synthetic test; delete", message: "Automated verification only.", request_id: demoId };
const rows = async (table) => {
  const response = await fetch(`${base}/${table}?email=eq.${encodeURIComponent(email)}&select=id`, { headers, signal: AbortSignal.timeout(10000) });
  assert.equal(response.ok, true, `${table}: could not verify test record count (${response.status})`);
  return response.json();
};
try {
  const page = await fetch(origin);
  assert.equal(page.headers.get("x-content-type-options"), "nosniff");
  assert.equal(page.headers.get("x-frame-options"), "DENY");
  assert.equal(page.headers.get("x-powered-by"), null);
  assert.ok(page.headers.get("content-security-policy")?.includes("form-action 'self'"));
  console.log("PASS: production HTTP security headers.");

  assert.equal((await api("waitlist", waitlist, { origin: "https://untrusted.example" })).status, 403);
  assert.equal((await api("waitlist", { ...waitlist, whatsapp: "+94 abc123456" })).status, 400);
  console.log("PASS: foreign-origin and invalid phone submissions rejected.");

  for (const [kind, payload] of [["waitlist", waitlist], ["waitlist", { ...waitlist, request_id: randomUUID() }], ["demo", demo], ["demo", demo], ["demo", demo]]) {
    const response = await api(kind, payload);
    assert.equal(response.status, 200, `${kind}: expected acceptance, got ${response.status}`);
    assert.equal((await response.json()).success, true);
  }
  assert.equal((await rows("waitlist_signups")).length, 1);
  assert.equal((await rows("demo_requests")).length, 1);
  console.log("PASS: both forms save successfully; duplicate waitlist emails and demo retries produce one row each.");
  const limited = await api("demo", demo);
  assert.equal(limited.status, 429, "Sixth request must be rate limited.");
  assert.equal(limited.headers.get("retry-after"), "600");
  console.log("PASS: persistent limiter blocks the sixth request.");

  if (!publicKey) {
    console.log("NOT VERIFIED: anonymous database access; add SUPABASE_PUBLISHABLE_KEY locally or run supabase/security-audit.sql in SQL Editor.");
  } else {
    const publicHeaders = { apikey: publicKey, "Content-Type": "application/json" };
    if (!publicKey.startsWith("sb_publishable_")) publicHeaders.Authorization = `Bearer ${publicKey}`;
    // Check authentication separately: a bad key must not look like a passing permission check.
    const keyCheck = await fetch(`${url}/auth/v1/settings`, { headers: publicHeaders, signal: AbortSignal.timeout(10000) });
    assert.equal(keyCheck.ok, true, "Public key is not valid; cannot verify permissions.");
    const publicWaitlist = { name: waitlist.name, email, request_id: waitId, whatsapp: "+94771234567", work_type: "Development", payment_platforms: ["PayPal"], consent: true };
    for (const [table, payload] of [["waitlist_signups", publicWaitlist], ["demo_requests", demo]]) {
      const target = `${base}/${table}?email=eq.${encodeURIComponent(email)}`;
      const read = await fetch(`${target}&select=id`, { headers: publicHeaders });
      assert.ok([401, 403].includes(read.status), `${table}: anonymous read is not denied.`);
      const write = await fetch(`${base}/${table}`, { method: "POST", headers: publicHeaders, body: JSON.stringify(payload) });
      assert.ok([401, 403].includes(write.status), `${table}: anonymous insert is not denied.`);
      const update = await fetch(target, { method: "PATCH", headers: publicHeaders, body: JSON.stringify({ name: "Unauthorized test" }) });
      assert.ok([401, 403].includes(update.status), `${table}: anonymous update is not denied.`);
      const remove = await fetch(target, { method: "DELETE", headers: publicHeaders });
      assert.ok([401, 403].includes(remove.status), `${table}: anonymous delete is not denied.`);
    }
    const rpc = await fetch(`${base}/rpc/consume_form_rate_limit`, { method: "POST", headers: publicHeaders, body: JSON.stringify({ client_hash: "invalid" }) });
    assert.ok([401, 403].includes(rpc.status), "Anonymous callers can invoke the rate-limit function.");
    console.log("PASS: anonymous table reads/writes and limiter RPC access denied.");
  }
} finally {
  // Only delete records bearing this unique test email; never read or modify real leads.
  for (const table of ["waitlist_signups", "demo_requests"]) {
    const response = await fetch(`${base}/${table}?email=eq.${encodeURIComponent(email)}`, { method: "DELETE", headers, signal: AbortSignal.timeout(10000) });
    assert.equal(response.ok, true, `${table}: test cleanup failed; remove Automated Security Test records manually.`);
    assert.equal((await rows(table)).length, 0, `${table}: test cleanup incomplete.`);
  }
  console.log("PASS: synthetic submission records removed. Isolated limiter bucket expires automatically.");
}
