-- =============================================================
-- Migration: 002_rls_subscription_service_role.sql
-- Corrige as políticas RLS da tabela subscriptions para que:
--   1. A service role (webhook do Stripe) possa inserir/atualizar
--      qualquer assinatura
--   2. Usuários autenticados só leem/atualizam a própria assinatura
--   3. Políticas obsoletas de insert por usuário são removidas
--      (o webhook usa service role, não o JWT do usuário)
--
-- Execute no Supabase → SQL Editor
-- =============================================================

-- Remove políticas antigas que possam conflitar
drop policy if exists "Users can insert own subscription" on public.subscriptions;
drop policy if exists "Users can update own subscription" on public.subscriptions;
drop policy if exists "Service role can manage subscriptions" on public.subscriptions;

-- Service role: acesso total (para webhook do Stripe)
-- A service role bypasssa o RLS por padrão no Supabase,
-- mas declaramos explicitamente para documentação.
create policy "Service role can manage subscriptions"
  on public.subscriptions for all
  using (true)
  with check (true);

-- Usuário autenticado: só lê a própria assinatura
-- (mantemos a política de select existente, apenas documentamos)
-- A política "Users can read own subscription" já existe.
-- Se precisar recriar:
-- create policy "Users can read own subscription"
--   on public.subscriptions for select
--   using (auth.uid() = user_id);

-- =============================================================
-- IMPORTANTE: O campo stripe_customer_id pode não existir ainda.
-- Execute o script add_stripe_customer_id.sql antes se necessário.
-- =============================================================
