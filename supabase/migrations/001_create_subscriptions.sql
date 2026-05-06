-- Migration: create subscriptions table
-- Run this in: https://supabase.com/dashboard/project/bpnphbcdxjkdgsufclhj/sql/new

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status        TEXT        NOT NULL DEFAULT 'premium'
                            CHECK (status IN ('premium', 'cancelled', 'expired')),
  stripe_session_id TEXT,
  activated_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id)
);

-- Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read only their own subscription
CREATE POLICY "users_read_own"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Authenticated users can insert their own subscription (MVP — no server-side verification)
-- In production: remove this policy and use only the service_role via Stripe webhook Edge Function
CREATE POLICY "users_insert_own"
  ON public.subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Authenticated users can update their own subscription (for renewals)
CREATE POLICY "users_update_own"
  ON public.subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Service role has unrestricted access (for Stripe webhook Edge Function)
CREATE POLICY "service_role_all"
  ON public.subscriptions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
