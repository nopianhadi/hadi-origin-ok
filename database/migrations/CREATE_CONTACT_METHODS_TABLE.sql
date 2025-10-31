create table if not exists public.contact_methods (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_id text not null,
  description_en text not null,
  description_id text not null,
  icon text not null,
  color text not null,
  url text not null,
  button_text_en text not null,
  button_text_id text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists contact_methods_is_active_idx on public.contact_methods (is_active);
create index if not exists contact_methods_sort_order_idx on public.contact_methods (sort_order);

alter table public.contact_methods enable row level security;

drop policy if exists "contact_methods_select_active" on public.contact_methods;
create policy "contact_methods_select_active" on public.contact_methods
  for select
  to anon, authenticated
  using (is_active = true);

create or replace function public.set_contact_methods_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end; $$;

drop trigger if exists set_contact_methods_updated_at on public.contact_methods;
create trigger set_contact_methods_updated_at
before update on public.contact_methods
for each row execute function public.set_contact_methods_updated_at();
