import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  isSubscribed,
  activateSubscription,
  fetchSupabaseSubscription,
  saveSupabaseSubscription,
} from "@/lib/subscription";

export function useSubscription() {
  const [subscribed, setSubscribed] = useState(() => isSubscribed());
  const [searchParams, setSearchParams] = useSearchParams();

  const refresh = useCallback(() => {
    setSubscribed(isSubscribed());
  }, []);

  // On mount: sync from Supabase (authoritative source for logged-in users)
  useEffect(() => {
    fetchSupabaseSubscription().then((sub) => {
      if (sub) {
        activateSubscription(sub.expiresAt); // sync to localStorage
        setSubscribed(true);
      }
    });
  }, []);

  // Handle Stripe redirect: ?payment=success
  useEffect(() => {
    if (searchParams.get("payment") !== "success") return;

    const expiresAt = (() => {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      return d.toISOString();
    })();

    activateSubscription(expiresAt); // fast local activation
    setSubscribed(true);
    saveSupabaseSubscription(expiresAt); // async Supabase save (best-effort)

    const next = new URLSearchParams(searchParams.toString());
    next.delete("payment");
    setSearchParams(next, { replace: true });
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

  return { subscribed };
}
