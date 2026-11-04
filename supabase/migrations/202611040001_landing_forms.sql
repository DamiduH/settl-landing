begin;

create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null,
  name text not null check (length(btrim(name)) between 1 and 120),
  email text not null unique check (email = lower(btrim(email)) and length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  whatsapp text not null check (whatsapp ~ '^\+94[0-9]{9}$'),
  work_type text not null check (work_type in ('Development', 'Design', 'Writing and content', 'Marketing', 'Video and photo', 'Other')),
  payment_platforms text[] not null default '{}' check (payment_platforms <@ array['PayPal', 'Payoneer', 'Fiverr', 'Upwork', 'Other']::text[]),
  consent boolean not null check (consent = true),
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  name text not null check (length(btrim(name)) between 1 and 120),
  email text not null check (email = lower(btrim(email)) and length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  organisation text not null default '' check (length(organisation) <= 200),
  message text not null default '' check (length(message) <= 5000),
  created_at timestamptz not null default now()
);

create index waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index demo_requests_created_at_idx on public.demo_requests (created_at desc);

alter table public.waitlist_signups enable row level security;
alter table public.demo_requests enable row level security;
revoke all on public.waitlist_signups, public.demo_requests from public, anon, authenticated;
grant select, insert on public.waitlist_signups, public.demo_requests to service_role;
-- No public RLS policies: visitors cannot read or write submissions directly.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
create table private.form_rate_limits (
  client_hash text primary key,
  window_start timestamptz not null,
  attempts integer not null
);
create index form_rate_limits_window_idx on private.form_rate_limits (window_start);
alter table private.form_rate_limits enable row level security;

create function public.consume_form_rate_limit(client_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  attempt_count integer;
begin
  if client_hash is null or client_hash !~ '^[0-9a-f]{64}$' then
    return false;
  end if;
  delete from private.form_rate_limits where window_start < now() - interval '1 day';
  insert into private.form_rate_limits as limits (client_hash, window_start, attempts)
    values (client_hash, now(), 1)
  on conflict on constraint form_rate_limits_pkey do update set
    attempts = case when limits.window_start <= now() - interval '10 minutes' then 1 else limits.attempts + 1 end,
    window_start = case when limits.window_start <= now() - interval '10 minutes' then now() else limits.window_start end
  returning attempts into attempt_count;
  return attempt_count <= 5;
end;
$$;

revoke all on function public.consume_form_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_form_rate_limit(text) to service_role;

commit;
