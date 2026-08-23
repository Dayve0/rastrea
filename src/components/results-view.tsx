"use client";

import { OfferCard } from "@/components/offer-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownWideNarrow, ArrowLeft, Percent, Star } from "lucide-react";
import { useMemo, useState } from "react";
// Importe a interface que criamos (ajuste o caminho se necessário)
import type { Offer } from "@/lib/types";
import { ProductDetailSheet } from "./product-details";

type SortKey = "price" | "rating" | "discount"

const SORTS: { key: SortKey; label: string; icon: typeof Star }[] = [
  { key: "price", label: "Menor preço", icon: ArrowDownWideNarrow },
  { key: "rating", label: "Avaliação", icon: Star },
  { key: "discount", label: "Maior desconto", icon: Percent },
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ResultsView({
  query,
  offers,
  onNewSearch,
}: {
  query: string
  offers: Offer[]
  onNewSearch: () => void
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("price");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Encontra o mais barato usando pix_price e salva o source como identificador único
  const cheapestId = useMemo(() => {
    if (offers.length === 0) return null;
    return offers.reduce((min, o) => (o.pix_price < min.pix_price ? o : min), offers[0]).source;
  }, [offers]);

  const mostRated = useMemo(() => {
    if (offers.length === 0) return null;

    // 1. Calcula a Média Global (C) de todas as notas
    // Se o array estiver vazio, assumimos a média 0
    const mediaGlobal = offers.reduce((acc, cv) => acc + (cv.rating || 0), 0) / (offers.length || 1);

    // 2. Define o limite de confiança (m)
    // O valor '50' significa que o peso da Média Global será equivalente a 50 votos.
    // Produtos com menos de 50 votos serão "puxados" fortemente em direção à média.
    const limiteConfianca = 50;

    // 3. Aplica a fórmula para encontrar o melhor
    const melhorAvaliado = offers.reduce((vencedorAtual, produtoSendoAvaliado) => {

      const calcularScore = (produto: Offer) => {
        const votosProduto = produto.ratingCount || 0;
        const notaProduto = produto.rating || 0;

        // Aplica a Estimativa Bayesiana
        return ((votosProduto * notaProduto) + (limiteConfianca * mediaGlobal)) / (votosProduto + limiteConfianca);
      };

      const scoreAtual = calcularScore(vencedorAtual);
      const scoreDesafiante = calcularScore(produtoSendoAvaliado);

      // Se o desafiante for melhor, ele passa a ser o vencedor
      return scoreDesafiante > scoreAtual ? produtoSendoAvaliado : vencedorAtual;
    }, offers[0]);

    return melhorAvaliado.source;
  }, [offers]);

  const highestDiscount = useMemo(() => {
    if (offers.length === 0) return null;
    return offers.reduce((pv, cv) => (cv.discount > pv.discount ? cv : pv), offers[0]).source;
  }, [offers]);

  const sorted = useMemo(() => {
    const copy = [...offers];

    if (sort === "price") {
      copy.sort((a, b) => a.pix_price - b.pix_price);
    }

    if (sort === "rating") {
      // 1. Calculamos as variáveis globais da Estimativa Bayesiana
      const mediaGlobal = copy.reduce((acc, cv) => acc + (cv.rating || 0), 0) / (copy.length || 1);
      const limiteConfianca = 50;

      // 2. Função auxiliar para dar a nota justa de um produto
      const calcularScore = (produto: Offer) => {
        const votos = produto.ratingCount || 0;
        const nota = produto.rating || 0;
        return ((votos * nota) + (limiteConfianca * mediaGlobal)) / (votos + limiteConfianca);
      };

      // 3. O sort() do JavaScript subtrai as pontuações justas para ordenar do maior pro menor
      copy.sort((a, b) => calcularScore(b) - calcularScore(a));
    }

    if (sort === "discount") {
      copy.sort((a, b) => b.discount - a.discount);
    }

    return copy;
  }, [offers, sort]);

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsSheetOpen(true); // Dispara a animação
  };

  // Atualizado para mapear current_price
  const prices = offers.map((o) => o.pix_price < o.current_price ? o.pix_price : o.current_price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={onNewSearch} className="-ml-2 mb-1 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Nova busca
          </Button>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {offers.length} ofertas para “{query}”
          </h2>
          {offers.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              Preços de{" "}
              <span className="font-semibold text-savings-foreground dark:text-savings">{brl.format(min)}</span> a{" "}
              <span className="font-medium text-foreground">{brl.format(max)}</span> — uma economia de até{" "}
              <span className="font-semibold text-savings-foreground dark:text-savings">{brl.format(max - min)}</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Ordenar:</span>
          {SORTS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                sort === key
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            Nenhuma oferta encontrada
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Não achamos resultados para essa busca nas lojas selecionadas. Tente outro termo ou selecione mais lojas.
          </p>
          <Button onClick={onNewSearch} className="mt-5">
            Tentar novamente
          </Button>
        </div>
      ) : (
        // Removido o key={Math.random()} que destrói a performance do React
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map((offer, i) => (
            // O ideal para a prop "key" é uma string única constante, como a URL (source)
            <div key={offer.source} style={{ animationDelay: `${Math.min(i * 45, 400)}ms` }}>
              <OfferCard
                offer={offer}
                isBest={offer.source === cheapestId}
                mostRated={offer.source === mostRated}
                highestDiscount={offer.source === highestDiscount}
                onSelect={() => handleSelectOffer(offer)}
              />
            </div>
          ))}
        </div>
      )}

      <ProductDetailSheet
        offer={selectedOffer}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />




    </section>
  );
}