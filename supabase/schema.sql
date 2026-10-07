-- EqualSpace production database schema
-- This structure is intended for Supabase and supports auth, education content, polls, stories, and user progress.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  category text not null,
  difficulty text not null default 'Beginner',
  read_time text,
  excerpt text,
  source text,
  content jsonb not null default '[]'::jsonb,
  facts jsonb not null default '[]'::jsonb,
  related jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  options jsonb not null default '[]'::jsonb,
  answer text not null,
  explanation text,
  source text,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  score integer not null default 0,
  total integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.poll_responses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  choice text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text not null,
  category text not null,
  author text not null default 'Anonymous',
  status text not null default 'Pending' check (status in ('Approved', 'Pending', 'Rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.laws (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  explanation text not null,
  category text not null,
  year text,
  source text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_slug text,
  completed boolean not null default false,
  quiz_score integer,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_slug)
);

create index if not exists idx_lessons_category on public.lessons(category);
create index if not exists idx_quiz_questions_category on public.quiz_questions(category);
create index if not exists idx_stories_status on public.stories(status);
create index if not exists idx_user_progress_user on public.user_progress(user_id);

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.poll_responses enable row level security;
alter table public.stories enable row level security;
alter table public.laws enable row level security;
alter table public.user_progress enable row level security;

drop policy if exists "Profiles are viewable by their owner or admin" on public.profiles;
drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Profiles can be updated by their owner" on public.profiles;
create policy "Profiles can be updated by their owner"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- Role changes must only be made by trusted database administration, never by a profile form.
revoke update on public.profiles from anon, authenticated;
grant update (full_name, avatar_url, bio) on public.profiles to authenticated;

create policy "Public lessons readable"
on public.lessons for select using (true);
create policy "Public quiz questions readable"
on public.quiz_questions for select using (true);
create policy "Public laws readable"
on public.laws for select using (true);
create policy "Approved stories readable"
on public.stories for select using (status = 'Approved');

create policy "Users can insert their own quiz attempts"
on public.quiz_attempts for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Users can read their own quiz attempts" on public.quiz_attempts;
create policy "Users can read their own quiz attempts"
on public.quiz_attempts for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own poll responses"
on public.poll_responses for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Users can insert their own story submissions" on public.stories;
create policy "Users can submit stories for moderation"
on public.stories for insert to anon, authenticated
with check (
  status = 'Pending'
  and length(trim(body)) > 0
  and length(title) <= 80
  and length(author) <= 80
);

create policy "Users manage their progress"
on public.user_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'member')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute procedure public.update_updated_at();

create trigger lessons_updated_at
before update on public.lessons
for each row execute procedure public.update_updated_at();
