import "server-only";

import { createHmac } from "node:crypto";
import { type FormKind, validateSubmission } from "./validation";

const reply = (body: Record<string, unknown>, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function handleSubmission(request: Request, kind: FormKind) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply({ error: "This request is not allowed." }, 403);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ error: "This request is not allowed." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply({ error: "Send JSON form data." }, 415);

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Missing form data." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return reply({ error: "Form data is too large." }, 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "Invalid form data." }, 400);
  }

  if (input && typeof input === "object" && "website" in input && input.website) return reply({ success: true });
  let row: Record<string, unknown>;
  try {
    row = validateSubmission(kind, input);
  } catch (error) {
    return reply({ error: error instanceof Error ? error.message : "Please check your details." }, 400);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return reply({ error: "Signups are temporarily unavailable. Please try again later or email us." }, 503);

  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  // Legacy service-role JWTs need Authorization; modern sb_secret keys only use apikey.
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;
  const base = `${url.replace(/\/$/, "")}/rest/v1`;
  try {
    // Local testing (including phones on the LAN) must not share a production quota.
    const localDevelopment = process.env.NODE_ENV === "development" && !process.env.VERCEL;
    if (!localDevelopment) {
    // Vercel supplies this header. Never trust arbitrary X-Forwarded-For values.
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : null;
    const clientHash = createHmac("sha256", key).update(ip || "local-development").digest("hex");
    const limit = await fetch(`${base}/rpc/consume_form_rate_limit`, {
      method: "POST", headers, body: JSON.stringify({ client_hash: clientHash }),
      signal: AbortSignal.timeout(8000), cache: "no-store",
    });
    if (!limit.ok) throw new Error("rate_limit_unavailable");
    const allowed = await limit.json();
    if (allowed === false) return new Response(JSON.stringify({ error: "Too many requests. Please try again in 10 minutes." }), { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "600", "Cache-Control": "no-store" } });
    if (allowed !== true) throw new Error("invalid_rate_limit_response");
    }

    const table = kind === "waitlist" ? "waitlist_signups" : "demo_requests";
    const conflict = kind === "waitlist" ? "email" : "request_id";
    const result = await fetch(`${base}/${table}?on_conflict=${conflict}`, {
      method: "POST", headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify(row), signal: AbortSignal.timeout(8000), cache: "no-store",
    });
    if (!result.ok) throw new Error("insert_failed");
    return reply({ success: true });
  } catch {
    // Never log request contents, credentials, or Supabase response bodies.
    console.error(`Unable to save ${kind} submission.`);
    return reply({ error: "We couldn’t save your details. Please try again or email us." }, 503);
  }
}
