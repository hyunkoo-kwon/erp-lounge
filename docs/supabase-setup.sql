-- ERP 라운지 게시판 테이블 (Supabase → SQL Editor 에 붙여넣고 Run)
-- 공지 글은 관리자 이메일 계정만 쓸 수 있습니다. 아래 'admin@example.com' 을 본인 이메일로 바꾸세요.

create table if not exists public.posts (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  author      text not null check (char_length(author) between 1 and 40),
  category    text not null check (category in ('공지','모집','Q&A','자유')),
  title       text not null check (char_length(title) between 1 and 120),
  body        text not null check (char_length(body) between 1 and 5000)
);

create table if not exists public.comments (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  post_id     bigint not null references public.posts on delete cascade,
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  author      text not null check (char_length(author) between 1 and 40),
  body        text not null check (char_length(body) between 1 and 2000)
);

alter table public.posts    enable row level security;
alter table public.comments enable row level security;

-- 읽기: 누구나
create policy "posts read"    on public.posts    for select using (true);
create policy "comments read" on public.comments for select using (true);

-- 쓰기: 로그인한 회원 본인 이름으로만. 공지는 관리자만
create policy "posts insert" on public.posts for insert to authenticated
  with check (auth.uid() = user_id and (category <> '공지' or auth.jwt() ->> 'email' = 'admin@example.com'));
create policy "comments insert" on public.comments for insert to authenticated
  with check (auth.uid() = user_id);

-- 수정·삭제: 본인 글만 (관리자는 모든 글 삭제 가능)
create policy "posts update" on public.posts for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "posts delete" on public.posts for delete to authenticated
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = 'admin@example.com');
create policy "comments delete" on public.comments for delete to authenticated
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = 'admin@example.com');

create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists comments_post_idx on public.comments (post_id, created_at);

-- ===== 회원 정보 테이블 (회원가입 시 자동 저장) =====
-- 가입 화면의 이름·현재 상황·관심 분야를 profiles 테이블에 복사합니다.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  role text,
  interests text[],
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, role, interests)
  values (
    new.id, new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'role',
    coalesce(array(select jsonb_array_elements_text(new.raw_user_meta_data->'interests')), '{}')
  );
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
