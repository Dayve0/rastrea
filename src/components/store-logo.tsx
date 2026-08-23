import { cn } from "@/lib/utils";
import type { Store } from "@/lib/types";

export function StoreLogo({
  store,
  className,
}: {
  store: Store
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg text-[0.7rem] font-bold tracking-tight text-white shadow-sm",
        className,
      )}
      style={{ backgroundColor: store.color }}
    >
      {store.short}
    </span>
  );
}
