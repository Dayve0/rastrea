import { SiteHeader } from "@/components/site-header";
import { RastreaApp } from "@/components/rastrea-app";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <RastreaApp />
      </main>
      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          <b>Rastrea </b> — comparador de preços. Os resultados exibidos são simulados para demonstração da interface.
        </div>
      </footer>
    </div>
  );
}
