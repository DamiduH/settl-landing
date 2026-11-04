begin;

alter table public.waitlist_signups
  drop constraint waitlist_signups_consent_check,
  alter column consent_at drop not null;

commit;
