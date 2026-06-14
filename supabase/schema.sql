-- ============================================================
-- Discrete Shadow — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1) Artworks table -----------------------------------------
create table if not exists public.artworks (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text not null
              check (category in ('Painting','Calligraphy','Digital','Sketch')),
  note        text default '',
  medium      text default '',
  size        text default '',
  year        text default '',
  description text default '',
  quote       text,
  available   boolean not null default true,
  featured    boolean not null default false,
  is_print    boolean not null default false,
  video       text,
  images      text[] not null default '{}',   -- first item = cover
  socials     jsonb not null default '{}',    -- {instagram, facebook, ...}
  accent_color text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- additive upgrades (safe to re-run on an existing table)
alter table public.artworks add column if not exists featured     boolean not null default false;
alter table public.artworks add column if not exists is_print     boolean not null default false;
alter table public.artworks add column if not exists socials      jsonb   not null default '{}';
alter table public.artworks add column if not exists accent_color text;

create index if not exists artworks_category_idx on public.artworks (category);
create index if not exists artworks_sort_idx     on public.artworks (sort_order);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists artworks_set_updated_at on public.artworks;
create trigger artworks_set_updated_at
  before update on public.artworks
  for each row execute function public.set_updated_at();

-- 2) Row Level Security -------------------------------------
alter table public.artworks enable row level security;

drop policy if exists "Public can read artworks" on public.artworks;
create policy "Public can read artworks"
  on public.artworks for select
  using (true);

drop policy if exists "Admin can insert artworks" on public.artworks;
create policy "Admin can insert artworks"
  on public.artworks for insert to authenticated
  with check (true);

drop policy if exists "Admin can update artworks" on public.artworks;
create policy "Admin can update artworks"
  on public.artworks for update to authenticated
  using (true) with check (true);

drop policy if exists "Admin can delete artworks" on public.artworks;
create policy "Admin can delete artworks"
  on public.artworks for delete to authenticated
  using (true);

-- 3) Storage bucket for images ------------------------------
insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', true)
on conflict (id) do nothing;

drop policy if exists "Public read artwork images" on storage.objects;
create policy "Public read artwork images"
  on storage.objects for select
  using (bucket_id = 'artworks');

drop policy if exists "Admin upload artwork images" on storage.objects;
create policy "Admin upload artwork images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'artworks');

drop policy if exists "Admin update artwork images" on storage.objects;
create policy "Admin update artwork images"
  on storage.objects for update to authenticated
  using (bucket_id = 'artworks');

drop policy if exists "Admin delete artwork images" on storage.objects;
create policy "Admin delete artwork images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'artworks');
