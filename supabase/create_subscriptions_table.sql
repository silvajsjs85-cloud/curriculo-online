-- =============================================================
-- Tabela: subscriptions
-- Executa no Supabase → SQL Editor
-- =============================================================

create table if not exists public.subscriptions (
  user_id       uuid        primary key references auth.users(id) on delete cascade,
  status        text        not null default 'premium',
  activated_at  timestamptz not null default now(),
  expires_at    timestamptz not null
);

-- Habilita Row Level Security
alter table public.subscriptions enable row level security;

-- Usuário só lê a própria assinatura
create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Usuário pode inserir a própria assinatura
create policy "Users can insert own subscription"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

-- Usuário pode atualizar a própria assinatura
create policy "Users can update own subscription"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- =============================================================
-- Como usar:
-- 1. Acesse: https://supabase.com/dashboard/project/bpnphbcdxjkdgsufclhj/sql/new
-- 2. Cole todo o SQL acima e clique em "Run"
-- =============================================================
