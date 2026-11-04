# Set up form storage

1. Create a project in the [Supabase dashboard](https://supabase.com/dashboard).
2. Open **SQL Editor**, create a query, paste the contents of [the migration](migrations/202611040001_landing_forms.sql), and run it once. It creates the two submission tables and the private rate limiter in one transaction. If you already use the Supabase CLI, apply the migration with your normal migration workflow instead.
3. Copy `.env.example` to `.env.local`. Set `SUPABASE_URL` to the project URL and `SUPABASE_SECRET_KEY` to a server secret key (`sb_secret_...`). A legacy `service_role` JWT also works. Do not use a publishable/anon key here, put secrets in browser code, or commit `.env.local`.
4. Restart `npm run dev`. For deployment, add the same two environment variables to the appropriate Vercel environment and redeploy. Preview deployments should use a separate test Supabase project.
5. Submit each form with your own test details. In **Table Editor**, confirm the rows in `waitlist_signups` and `demo_requests`. Repeat the waitlist email and confirm there is still only one row.

## Stored data and behavior

Before deploying optional early-access contact consent, run [the optional consent migration](migrations/202611040003_optional_contact_consent.sql). Unchecked submissions store `consent = false` and no consent timestamp; checked submissions retain a consent timestamp.

Before deploying the conditional “Other” fields, also run [the Other details migration](migrations/202611040002_waitlist_other_details.sql) in SQL Editor (or apply it with the Supabase CLI). It adds `work_other` and `paid_other` to `waitlist_signups`. These answers are required when the corresponding Other choice is selected.

- Waitlist: name, lowercase email, canonical WhatsApp number (`+94` followed by nine digits), work type, payment platforms, consent and timestamps. One signup per email. Repeating an email succeeds without overwriting the original details or revealing membership.
- Demos: name, email, optional organisation and message, timestamps. Each form opening generates a request ID on first submission; retrying it does not create another request. Opening a fresh form allows a new request.
- Row Level Security is enabled. Anonymous visitors and signed-in users have no table access. The Next.js endpoints use a server secret. View and export submissions through the Supabase dashboard; no visitor account is needed.
- Both endpoints validate independently of the browser. Database constraints also enforce key rules. Success appears only after a confirmed insert or ignored duplicate.
- Requests are capped at 16 KiB. A honeypot and persistent rate limit provide basic spam protection: five requests per ten minutes per IP across both forms. Raw IPs are not stored; only keyed hashes are stored, and expired limiter rows are removed on subsequent submissions.
- IP limiting is configured for Vercel's `x-vercel-forwarded-for` header. Locally, or on another host, requests share one fallback bucket. Before using another host, configure a trusted IP source in `lib/forms/server.ts`; do not trust arbitrary forwarded headers. Distributed abuse may require additional WAF or CAPTCHA protection.
- Supabase failures or missing configuration return an error; there is no fallback to FormSubmit and no email notification yet. Check the dashboard for new leads.

## Verification

Run `npm run test:forms`, `npm run typecheck`, `npm run lint`, and `npm run build`. Automated tests mock Supabase HTTP calls and do not insert rows into a real project. The SQL migration and a real insert must also be checked in your own Supabase project after configuring it.

Review retention and delete submissions you no longer need in Table Editor. This setup stores contact details only; it does not create user accounts or hold financial records.

References: [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
