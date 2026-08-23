"use client";

import { useCallback, useRef, useState } from "react";
import { SearchHero } from "@/components/search-hero";
import { ScanningLoader } from "@/components/scanning-loader";
import { ResultsView } from "@/components/results-view";
import { HowItWorks } from "@/components/how-it-works";
import { STORES } from "@/lib/stores";
import type { Offer, StoreProgress } from "@/lib/types";
import searchService from "@/services/search.service";
import { toast } from "./ui/toast";

type Phase = "idle" | "scanning" | "results"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function RastreaApp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");


  //  O Set não aceita valores duplicados
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(STORES.map((s) => s.id)),
  );
  const [progress, setProgress] = useState<StoreProgress[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  // token used to cancel an in-flight scan
  const runToken = useRef(0);

  const toggleStore = useCallback((id: string) => {

    // Aqui ela verifica se a loja selecionada já está na lista
    // Se estiver, ela retira o item da lista e desmarca
    // Se não estiver, ela adiciona o item na lista e marca

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {

    // Aqui ele verifica se o tamanho da lista é igual ao tamanho das lojas registradas
    // Se for ele recria a lista vazia e desmarca todas
    // Se não for ele recria a lista com todas as lojas e as marca

    setSelected((prev) =>
      prev.size === STORES.length ? new Set() : new Set(STORES.map((s) => s.id)),
    );
  }, []);

  const runSearch = useCallback(async () => {
    const typed = query.trim();
    if (!typed || selected.size === 0) return;


    // Aqui retorna todos os IDs selecionados
    const ids = STORES.filter((s) => selected.has(s.id)).map((s) => s.id);

    // Aqui adiciona um registro pro produto que foi digitado na hora
    const token = ++runToken.current;

    setSubmitted(typed);
    setOffers([]);
    setProgress(ids.map((id) => ({ storeId: id, status: "pending", found: 0 })));
    setPhase("scanning");

    await delay(500);

    const collected: Offer[] = [];
    for (const id of ids) {
      if (runToken.current !== token) return;
      setProgress((prev) =>
        prev.map((p) => (p.storeId === id ? { ...p, status: "scanning" } : p)),
      );
      await delay(350 + Math.random() * 550);
      if (runToken.current !== token) return;


      const storeOffers = await searchService.search(typed, id).catch((error) => {
        console.error(`Erro ao buscar ofertas na loja ${id}:`, error);
        toast.add({
          type: "error",
          title: `Erro ao buscar ofertas na loja ${id}`,
          description: error.message || "Ocorreu um erro desconhecido.",
        });
        return [];
      });

      collected.push(...storeOffers);
      setProgress((prev) =>
        prev.map((p) =>
          p.storeId === id ? { ...p, status: "done", found: storeOffers.length } : p,
        ),
      );
    }

    await delay(650);
    if (runToken.current !== token) return;
    setOffers(collected);
    setPhase("results");
  }, [query, selected]);

  const cancel = useCallback(() => {
    runToken.current++;
    setPhase("idle");
  }, []);

  const newSearch = useCallback(() => {
    runToken.current++;
    setPhase("idle");
  }, []);

  return (
    <>
      {phase === "idle" && (
        <>
          <SearchHero
            query={query}
            onQueryChange={setQuery}
            selected={selected}
            onToggleStore={toggleStore}
            onToggleAll={toggleAll}
            onSearch={runSearch}
          />
          <HowItWorks />
        </>
      )}

      {phase === "scanning" && (
        <ScanningLoader query={submitted} progress={progress} onCancel={cancel} />
      )}

      {phase === "results" && (
        <ResultsView query={submitted} offers={offers} onNewSearch={newSearch} />
      )}
    </>
  );
}
