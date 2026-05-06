import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  isSubscribed,
  activateSubscription,
  fetchSupabaseSubscription,
  saveSupabaseSubscription,
  buildPaymentUrl,
} from "@/lib/subscription";
import { supabase } from "@/lib/supabase";

export function useSubscription() {
  const [subscribed, setSubscribed] = useState(() => isSubscribed());
  const [userId, setUserId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const refresh = useCallback(() => {
    setSubscribed(isSubscribed());
  }, []);

  // Resolve the current Supabase user ID (for secure payment URL)
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // On mount: sync from Supabase (authoritative source for logged-in users)
  useEffect(() => {
    fetchSupabaseSubscription().then((sub) => {
      if (sub) {
        activateSubscription(sub.expiresAt);
        setSubscribed(true);
      }
    });
  }, []);

  // Handle Stripe redirect: ?payment=success
  // Secure flow: poll Supabase until the webhook saves the subscription.
  // Fallback to localStorage activation if user is not logged in.
  useEffect(() => {
    if (searchParams.get("payment") !== "success") return;

    // Clean up URL immediately
    const next = new URLSearchParams(searchParams.toString());
    next.delete("payment");
    setSearchParams(next, { replace: true });

    let attempts = 0;
    const MAX_ATTEMPTS = 10; // poll for up to 20 seconds

    const poll = async () => {
      const sub = await fetchSupabaseSubscription();
      if (sub) {
        // ✅ Secure: webhook confirmed payment in Supabase
        activateSubscription(sub.expiresAt);
        setSubscribed(true);
        return;
      }

      if (++attempts < MAX_ATTEMPTS) {
        setTimeout(poll, 2000);
      } else {
        // Fallback for non-logged-in users or webhook delay
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        activateSubscription(expiresAt.toISOString());
        saveSupabaseSubscription(expiresAt.toISOString());
        setSubscribed(true);
      }
    };

    poll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync across tabs and windows
  useEffect(() => {
    window.addEventListener("storage", refresh);
    window.addEventListener("subscription-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("subscription-changed", refresh);
    };
  }, [refresh]);

  // Payment URL with user ID for secure webhook identification
  const paymentUrl = buildPaymentUrl(userId);

  return { subscribed, userId, paymentUrl };
}
