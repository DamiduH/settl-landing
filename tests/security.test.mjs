import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const source = readFileSync(new URL("../lib/security-headers.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } }).outputText;
const { securityHeaders } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));

test("production headers restrict framing, external requests, plugins and browser permissions", () => {
  const headers = Object.fromEntries(securityHeaders(false).map(({ key, value }) => [key, value]));
  const csp = headers["Content-Security-Policy"];
  for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'self'", "connect-src 'self'", "script-src-attr 'none'", "upgrade-insecure-requests"]) assert.ok(csp.includes(directive));
  assert.ok(!csp.includes("unsafe-eval"));
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["Strict-Transport-Security"], "max-age=31536000");
  assert.ok(headers["Permissions-Policy"].includes("camera=()"));
});

test("development headers allow hot reload without forcing local HTTPS", () => {
  const headers = Object.fromEntries(securityHeaders(true).map(({ key, value }) => [key, value]));
  assert.ok(headers["Content-Security-Policy"].includes("ws: wss:"));
  assert.ok(headers["Content-Security-Policy"].includes("unsafe-eval"));
  assert.ok(!headers["Content-Security-Policy"].includes("upgrade-insecure-requests"));
  assert.equal(headers["Strict-Transport-Security"], undefined);
});

test("client components never reference the server database secret", () => {
  const scan = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (/\.[jt]sx?$/.test(entry.name)) {
        assert.ok(!readFileSync(file, "utf8").includes("SUPABASE_SECRET_KEY"), `Server secret referenced by ${file}`);
      }
    }
  };
  scan(fileURLToPath(new URL("../components", import.meta.url)));
});
