-- Read-only audit. Run in Supabase SQL Editor; never paste API keys into SQL.
-- Expected: rls_enabled = true; anon/authenticated privileges all false.
select c.relname as table_name, c.relrowsecurity as rls_enabled,
  has_table_privilege('anon', c.oid, 'select') as anon_select,
  has_table_privilege('anon', c.oid, 'insert') as anon_insert,
  has_table_privilege('anon', c.oid, 'update') as anon_update,
  has_table_privilege('anon', c.oid, 'delete') as anon_delete,
  has_table_privilege('authenticated', c.oid, 'select') as user_select,
  has_table_privilege('authenticated', c.oid, 'insert') as user_insert,
  has_table_privilege('authenticated', c.oid, 'update') as user_update,
  has_table_privilege('authenticated', c.oid, 'delete') as user_delete
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname in ('waitlist_signups', 'demo_requests');

-- Expected: false, false, true.
select
  has_function_privilege('anon', 'public.consume_form_rate_limit(text)', 'execute') as anon_execute,
  has_function_privilege('authenticated', 'public.consume_form_rate_limit(text)', 'execute') as user_execute,
  has_function_privilege('service_role', 'public.consume_form_rate_limit(text)', 'execute') as server_execute;

-- Expected: no policies granting public access.
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies where schemaname = 'public' and tablename in ('waitlist_signups', 'demo_requests');

-- Expected: false for both roles.
select has_schema_privilege('anon', 'private', 'usage') as anon_private_access,
  has_schema_privilege('authenticated', 'private', 'usage') as user_private_access;
