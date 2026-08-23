"use client";

import type React from "react";
import { Search, Sparkles, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreSelector } from "@/components/store-selector";
import { STORES } from "@/lib/stores";

const SUGGESTIONS = ["iPhone 15", "Fone Bluetooth", "Notebook Gamer", "Air Fryer", "Smart TV 50\""];

export function SearchHero({
  query,
  onQueryChange,
  selected,
  onToggleStore,
  onToggleAll,
  onSearch,
}: {
  query: string
  onQueryChange: (v: string) => void
  selected: Set<string>
  onToggleStore: (id: string) => void
  onToggleAll: () => void
  onSearch: () => void
}) {
  const allSelected = selected.size === STORES.length;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      onSearch();
    }
  }

  return (
    <section id="buscar" className="mx-auto max-w-3xl px-4 pt-14 pb-6 text-center sm:px-6 sm:pt-20">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        <Sparkles className="size-3.5 text-primary" />
        Compare preços de {STORES.length} {STORES.length === 1 ? "loja" : "lojas"} de uma vez só
      </span>

      <h1 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Ache o <span className="text-primary">menor preço</span> sem abrir mil abas
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
        Digite o produto que você quer, escolha as lojas e deixe o Rastrea vasculhar tudo por você em segundos.
      </p>

      <div className="mt-8">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-primary/5 transition-shadow focus-within:border-primary/40 focus-within:shadow-primary/10">
          <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="O que você está procurando?"
            aria-label="Buscar produto"
            className="h-11 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <Button
            size="lg"
            onClick={onSearch}
            disabled={!query.trim() || selected.size === 0}
            className="h-11 shrink-0 px-5 text-sm cursor-pointer"
          >
            <TrendingDown className="size-4" />
            Comparar
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Populares:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onQueryChange(s)}
              className="rounded-full cursor-pointer border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div id="lojas" className="mt-10">
        <div className="mb-3 flex items-center justify-center gap-2 text-sm">
          <span className="font-medium text-foreground">
            Buscar em {selected.size} {selected.size === 1 ? "loja" : "lojas"}
          </span>
          <button
            type="button"
            onClick={onToggleAll}
            className="font-semibold text-primary underline-offset-4 hover:underline cursor-pointer"
          >
            {allSelected ? "Limpar" : "Selecionar todas"}
          </button>
        </div>
        <StoreSelector selected={selected} onToggle={onToggleStore} />
      </div>
    </section>
  );
}
