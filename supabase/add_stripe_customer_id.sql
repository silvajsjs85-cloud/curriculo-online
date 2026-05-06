-- Adiciona coluna stripe_customer_id à tabela subscriptions
-- Execute no Supabase → SQL Editor

alter table public.subscriptions
  add column if not exists stripe_customer_id text;

-- Índice para lookup rápido pelo webhook
create index if not exists subscriptions_stripe_customer_id_idx
  on public.subscriptions (stripe_customer_id);
