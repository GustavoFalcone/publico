import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface PurchaseContextValue {
  /** Timestamp (ms) em que o usuário "comprou" / criou a conta. */
  purchasedAt: number;
  /** Reinicia o relógio para o agora. */
  resetPurchase: () => void;
  /** Avança o relógio (dev). */
  travelDays: (days: number) => void;
  /** Para fins de teste rápido. */
  setPurchasedAt: (ts: number) => void;
  /** Tempo atual reativo (atualiza a cada 1s). */
  now: number;
}

const KEY = "bafo_purchased_at_v1";

const PurchaseContext = createContext<PurchaseContextValue | null>(null);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [purchasedAt, setPurchasedAtState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) return Number(stored);
    } catch {}
    const now = Date.now();
    try {
      localStorage.setItem(KEY, String(now));
    } catch {}
    return now;
  });

  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const value = useMemo<PurchaseContextValue>(
    () => ({
      purchasedAt,
      now,
      setPurchasedAt: (ts: number) => {
        setPurchasedAtState(ts);
        try {
          localStorage.setItem(KEY, String(ts));
        } catch {}
      },
      resetPurchase: () => {
        const t = Date.now();
        setPurchasedAtState(t);
        try {
          localStorage.setItem(KEY, String(t));
        } catch {}
      },
      travelDays: (days: number) => {
        const t = purchasedAt - days * 24 * 60 * 60 * 1000;
        setPurchasedAtState(t);
        try {
          localStorage.setItem(KEY, String(t));
        } catch {}
      },
    }),
    [purchasedAt, now]
  );

  return <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>;
}

export function usePurchase() {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("usePurchase deve ser usado dentro de PurchaseProvider");
  return ctx;
}

/** Calcula o tempo restante (em ms) para o módulo ser liberado. */
export function getUnlockState(purchasedAt: number, now: number, unlockAfterDays: number) {
  const unlockAt = purchasedAt + unlockAfterDays * 24 * 60 * 60 * 1000;
  const remainingMs = unlockAt - now;
  const unlocked = remainingMs <= 0;
  const days = Math.max(0, Math.floor(remainingMs / (24 * 60 * 60 * 1000)));
  const hours = Math.max(0, Math.floor((remainingMs / (60 * 60 * 1000)) % 24));
  const minutes = Math.max(0, Math.floor((remainingMs / (60 * 1000)) % 60));
  const seconds = Math.max(0, Math.floor((remainingMs / 1000) % 60));
  return { unlocked, remainingMs, days, hours, minutes, seconds, unlockAt };
}
