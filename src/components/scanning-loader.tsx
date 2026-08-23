"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Radar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreLogo } from "@/components/store-logo";
import { STORE_MAP } from "@/lib/stores";
import { cn } from "@/lib/utils";
import type { StoreProgress } from "@/lib/types";

const MESSAGES = [
  "Abrindo as vitrines virtuais...",
  "Comparando preços centavo por centavo...",
  "Fugindo dos fretes abusivos...",
  "Farejando cupons escondidos...",
  "Conferindo as promoções relâmpago...",
  "Organizando tudo pra você decidir fácil...",
];

export function ScanningLoader({
  query,
  progress,
  onCancel,
}: {
  query: string
  progress: StoreProgress[]
  onCancel: () => void
}) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const done = progress.filter((p) => p.status === "done").length;
  const total = progress.length;
  const found = progress.reduce((acc, p) => acc + p.found, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <section className="mx-auto max-w-2xl px-4 pt-12 pb-16 sm:px-6">
      {/* Radar */}
      <div className="flex flex-col items-center">
        <div className="relative grid size-44 place-items-center">
          {/* concentric rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-[18%] rounded-full border border-primary/20" />
          <div className="absolute inset-[38%] rounded-full border border-primary/20" />
          {/* rotating sweep */}
          <div
            className="animate-radar absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, color-mix(in oklch, var(--primary) 40%, transparent) 360deg)",
            }}
          />
          {/* pulse rings */}
          <div className="animate-pulse-ring absolute size-16 rounded-full bg-primary/20" />
          {/* center */}
          <div className="relative grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
            <Radar className="size-7" />
          </div>
        </div>

        <h2 className="mt-6 text-balance text-center font-display text-2xl font-bold tracking-tight text-foreground">
          Rastreando “{query}”
        </h2>
        <p
          key={messageIndex}
          className="animate-float-up mt-2 h-6 text-center text-sm text-muted-foreground"
        >
          {MESSAGES[messageIndex]}
        </p>
      </div>

      {/* Overall progress */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="font-medium text-foreground">
            {done} de {total} lojas
          </span>
          <span className="tabular-nums text-muted-foreground">
            <span className="font-semibold text-savings-foreground dark:text-savings">{found}</span> ofertas encontradas
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Per-store status */}
        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {progress.map((p) => {
            const store = STORE_MAP[p.storeId];
            return (
              <li
                key={p.storeId}
                className={cn(
                  "relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 transition-colors",
                  p.status === "done"
                    ? "border-savings/30 bg-savings/5"
                    : p.status === "scanning"
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-background",
                )}
              >
                {p.status === "scanning" && (
                  <span
                    aria-hidden="true"
                    className="animate-shimmer pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 12%, transparent), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                )}
                <StoreLogo store={store} className="size-7" />
                <span className="flex-1 truncate text-sm font-medium text-foreground">
                  {store.name}
                </span>
                {p.status === "done" ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-savings-foreground dark:text-savings">
                    <Check className="size-3.5" strokeWidth={3} />
                    {p.found}
                  </span>
                ) : p.status === "scanning" ? (
                  <Loader2 className="size-4 animate-spin text-primary" />
                ) : (
                  <span className="animate-blink size-2 rounded-full bg-muted-foreground/40" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="ghost" size="lg" onClick={onCancel} className="text-muted-foreground">
          <X className="size-4" />
          Cancelar busca
        </Button>
      </div>
    </section>
  );
}
