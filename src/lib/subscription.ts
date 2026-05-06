import type { ResumeTemplate } from "@/types/resume";
import { supabase } from "@/lib/supabase";

export const FREE_TEMPLATES: ResumeTemplate[] = ["modern", "first_job"];

export const PREMIUM_TEMPLATES: ResumeTemplate[] = [
  "classic",
  "minimal",
  "executive",
  "creative",
  "technical",
  "international",
  "institutional",
  "compact",
];

const STORAGE_KEY = "curriculo_subscription";

interface LocalSubscription {
  status: "premium";
  activatedAt: string;
  expiresAt: string;
}

export function isPremiumTemplate(id: ResumeTemplate | string): boolean {
  return PREMIUM_TEMPLATES.includes(id as ResumeTemplate);
}

// --- LocalStorage helpers (fast, offline-first) ---

export function getLocalSubscription(): LocalSubscription | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const sub = JSON.parse(raw) as LocalSubscription;
    if (new Date(sub.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return sub;
  } catch {
    return null;
  }
}

export function isSubscribed(): boolean {
  return getLocalSubscription() !== null;
}

export function activateSubscription(expiresAt?: string): void {
  const now = new Date();
  const expiry = expiresAt ? new Date(expiresAt) : (() => {
    const d = new Date(now);
    d.setMonth(d.getMonth() + 1);
    return d;
  })();

  const sub: LocalSubscription = {
    status: "premium",
    activatedAt: now.toISOString(),
    expiresAt: expiry.toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  window.dispatchEvent(new Event("subscription-changed"));
}

export function clearLocalSubscription(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("subscription-changed"));
}

// --- Supabase helpers (authoritative, requires auth) ---

export async function fetchSupabaseSubscription(): Promise<LocalSubscription | null> {
  if (!supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("status, activated_at, expires_at")
      .eq("user_id", user.id)
      .eq("status", "premium")
      .single();

    if (error || !data) return null;
    if (new Date(data.expires_at) < new Date()) return null;

    return {
      status: "premium",
      activatedAt: data.activated_at,
      expiresAt: data.expires_at,
    };
  } catch {
    return null;
  }
}

export async function saveSupabaseSubscription(expiresAt: string): Promise<void> {
  if (!supabase) return;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("subscriptions").upsert(
      {
        user_id: user.id,
        status: "premium",
        activated_at: new Date().toISOString(),
        expires_at: expiresAt,
      },
      { onConflict: "user_id" }
    );
  } catch {
    // Silently fail — localStorage is the fallback
  }
}

// --- Config ---

// Configure via VITE_STRIPE_PAYMENT_LINK in .env
export const STRIPE_PAYMENT_LINK =
  import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? "";

export const PLAN_PRICE = import.meta.env.VITE_PLAN_PRICE ?? "R$ 19,90";

export const PLAN_PERIOD = import.meta.env.VITE_PLAN_PERIOD ?? "por mês";

/**
 * Builds the Stripe Payment Link URL.
 * If a userId is provided, attaches client_reference_id so the
 * webhook can identify the user and save the subscription securely.
 */
export function buildPaymentUrl(userId?: string | null): string {
  if (!STRIPE_PAYMENT_LINK) return "#";
  const url = new URL(STRIPE_PAYMENT_LINK);
  if (userId) url.searchParams.set("client_reference_id", userId);
  return url.toString();
}

