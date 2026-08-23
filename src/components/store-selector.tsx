"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORES } from "@/lib/stores";

export function StoreSelector({
  selected,
  onToggle,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {STORES.map((store) => {
        const active = selected.has(store.id);
        return (
          <button
            key={store.id}
            type="button"
            onClick={() => onToggle(store.id)}
            aria-pressed={active}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
              active
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-4 place-items-center rounded-full text-[9px] text-white transition-transform",
                active ? "scale-100" : "scale-90 opacity-70",
              )}
              style={{ backgroundColor: store.color }}
            >
              {active && <Check className="size-3" strokeWidth={3} />}
            </span>
            {store.name}
          </button>
        );
      })}
    </div>
  );
}
