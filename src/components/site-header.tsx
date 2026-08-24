import { AboutDialog } from "@/components/about-dialog";
import { STORES } from "@/lib/stores";
import { Radar } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Radar className="size-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Rastrea
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-medium text-muted-foreground md:flex">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
          >
            Buscar
          </a>
          <AboutDialog />
        </nav>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <AboutDialog />
          </div>
          <span className="hidden rounded-full border border-savings/30 bg-savings/10 px-3 py-1 text-xs font-semibold text-savings-foreground sm:inline-flex dark:text-savings">
            {STORES.length} {STORES.length > 1 ? "lojas conectadas" : "loja conectada"}
          </span>
        </div>
      </div>
    </header>
  );
}
