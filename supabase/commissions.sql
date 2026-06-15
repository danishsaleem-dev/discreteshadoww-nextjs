-- Custom-order / commission requests submitted from /commission.
-- Run this in the Supabase SQL editor.

create table if not exists public.commissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  art_type    text,
  size        text,
  budget      text,
  deadline    text,
  reference   text,
  message     text not null,
  status      text not null default 'new',   -- new | read | replied | archived
  created_at  timestamptz not null default now()
);

create index if not exists commissions_created_at_idx
  on public.commissions (created_at desc);

-- Lock the table down: RLS on, no public policies. Only the server-side
-- service_role key (used by the admin client) can read or write. This keeps
-- visitor submissions private and out of reach of the browser anon key.
alter table public.commissions enable row level security;
