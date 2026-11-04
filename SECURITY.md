# Landing page security

## Implemented

- Database credentials are used only in server code. `.env.local` is ignored by Git.
- Form endpoints validate input and consent, cap request bodies at 16 KiB, and reject foreign origins and cross-site browser requests. These checks supplement, rather than replace, abuse protection; the endpoints intentionally accept unauthenticated visitors.
- The SQL migration enables RLS, revokes anonymous and authenticated table access, and limits the rate-limit RPC to the server role. A server secret bypasses RLS and must remain private.
- Both forms use persistent limiting (five attempts per ten minutes per IP on Vercel), a honeypot, timeouts, and duplicate handling. Database error details and contact data are not logged.
- HTTP headers prohibit framing and plugins, restrict resource origins and form destinations, disable unused browser permissions, and enable HTTPS enforcement in production. The `X-Powered-By` header is disabled.
- The CSP allows inline scripts/styles for Next.js's cached static shell and existing styles. It does not provide strict inline-script XSS protection. It blocks inline event-handler attributes and does not allow JavaScript evaluation in production. A stricter nonce/hash policy would require rendering or build changes and browser testing. Do not add external analytics/scripts without reviewing the CSP.

## Verified on 4 November 2026

- Twelve automated security/form tests, TypeScript, and the production build pass. Lint passes with an existing Open Graph image warning.
- A local production server using the real Supabase project accepted both forms. Duplicate waitlist emails and repeated demo request IDs produced only one record each. A sixth request from the same isolated test client returned HTTP 429.
- Foreign-origin requests and invalid WhatsApp numbers were rejected; the HTTP security headers were present.
- All synthetic submission records were deleted and their removal checked. The isolated test limiter bucket expires automatically.
- The built browser assets did not contain the configured database secret, and local environment files are not tracked by Git.
- `npm audit --omit=dev` reported zero known production vulnerabilities. The full audit reported 16 moderate findings in the development lint dependency tree, rooted in minimatch's denial-of-service advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). Suggested automatic fixes downgrade incompatible lint tooling; no forced downgrade or cross-major minimatch override was applied. Recheck when compatible upstream fixes are available. Do not process untrusted lint configuration or glob patterns in CI.

## Actions requiring project/account access

1. **Verify live database permissions.** Run [the read-only audit](supabase/security-audit.sql) in Supabase SQL Editor and check the expected results described in the file. Our server-key connectivity tests do not prove anonymous access is blocked. Alternatively, set `SUPABASE_PUBLISHABLE_KEY` in `.env.local` and rerun the live verifier; a publishable key is not a secret and is only needed here for auditing. Authenticated-role permissions are covered by the SQL audit.
2. **Enable MFA and restrict membership** in Supabase, Vercel, and GitHub. Review Supabase Security Advisor findings and remediate unintended public access. Keep the database secret limited to the production server environment and trusted local development. Use separate projects/keys for preview and production. Rotate a key if exposed.
3. **Configure Vercel Firewall** for `/api/forms/*` so abusive requests can be rejected before invoking the app/database. Monitor traffic before enforcing thresholds that may affect shared networks. Consider CAPTCHA if distributed spam persists. The application's DB limiter is not an edge firewall.
4. **Deploy and verify.** Add the server environment values in Vercel, deploy the changes, and confirm headers and both forms on the deployed URL. Code in this workspace does not change the deployed site until deployed. Preview toolbar/third-party integrations may require explicit CSP allowances.
5. **Set alerts and recovery.** Configure Vercel error/traffic/usage alerts and review available Supabase backup options. Choose and test a restore process. Do not send contact details or API keys to logs.
6. **Decide data retention and privacy wording.** Explain the contact purpose and services used, provide a deletion contact, restrict CSV exports, and periodically remove leads no longer needed. This repository does not implement an automatic retention job or publish an unapproved privacy policy.

## Repeatable checks

```powershell
npm run test:security
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

For the live verifier, start a temporary local production server in a separate terminal:

```powershell
$env:VERCEL = '1' # Test process only: permits an isolated synthetic test IP bucket.
npm run start -- --hostname 127.0.0.1 --port 3100
```

Then run `node scripts/verify-supabase.mjs http://127.0.0.1:3100`. It writes synthetic contact records to the configured project and deletes only those records in a `finally` block. Stop the temporary server afterwards. If cleanup fails, remove only the records named `Automated Security Test` with that run's `security-<UUID>@example.invalid` email. A failed test must not be reported as a passing check.

References: [Supabase security checklist](https://supabase.com/docs/guides/security/production-checklist), [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Vercel bot management](https://vercel.com/docs/bot-management).
