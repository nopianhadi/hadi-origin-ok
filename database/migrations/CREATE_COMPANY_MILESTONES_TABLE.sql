create table if not exists public.company_milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title_en text not null,
  title_id text not null,
  description_en text not null,
  description_id text not null,
  achievements_en text[] not null,
  achievements_id text[] not null,
  icon text not null,
  color text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists company_milestones_is_active_idx on public.company_milestones (is_active);
create index if not exists company_milestones_sort_order_idx on public.company_milestones (sort_order);

alter table public.company_milestones enable row level security;

drop policy if exists "company_milestones_select_active" on public.company_milestones;
create policy "company_milestones_select_active" on public.company_milestones
  for select
  to anon, authenticated
  using (is_active = true);

create or replace function public.set_company_milestones_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end; $$;

drop trigger if exists set_company_milestones_updated_at on public.company_milestones;
create trigger set_company_milestones_updated_at
before update on public.company_milestones
for each row execute function public.set_company_milestones_updated_at();
