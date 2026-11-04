begin;

alter table public.waitlist_signups
  add column work_other text check (length(btrim(work_other)) between 1 and 200),
  add column paid_other text check (length(btrim(paid_other)) between 1 and 200);

commit;
