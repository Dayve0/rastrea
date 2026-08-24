"use client";

import { StoreLogo } from "@/components/store-logo";
import { STORE_MAP } from "@/lib/stores";
import type { Offer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CircleAlert, ExternalLink, Star, Trophy, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// 1. O Componente Skeleton
function OfferCardSkeleton() {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm border-border animate-pulse">
      {/* Imagem Placeholder */}
      <div className="relative aspect-square overflow-hidden bg-muted" />

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Header da Loja e Estrelas */}
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-muted" />
          <div className="h-3 w-16 rounded-md bg-muted" />
          <div className="ml-auto h-3 w-12 rounded-md bg-muted" />
        </div>

        {/* Título do Produto (2 linhas) */}
        <div className="space-y-2 mt-1">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-4/5 rounded-md bg-muted" />
        </div>

        {/* Bloco de Preço */}
        <div className="mt-auto space-y-2 pt-4">
          <div className="h-3 w-16 rounded-md bg-muted" />
          <div className="h-7 w-32 rounded-md bg-muted" />
          <div className="h-3 w-24 rounded-md bg-muted" />
        </div>

        {/* Botão */}
        <div className="mt-2 h-9 w-full rounded-lg bg-muted" />
      </div>
    </article>
  );
}

// 2. O Card Principal Atualizado
export function OfferCard({
  offer,
  isBest,
  mostRated,
  highestDiscount,
  onSelect
}: {
  offer: Offer,
  isBest?: boolean,
  mostRated?: boolean,
  highestDiscount?: boolean,
  onSelect?: (offer: Offer) => void
}) {
  // Estado para controlar a simulação de carregamento
  const [isLoading, setIsLoading] = useState(true);

  // Dispara o temporizador de 1.5s assim que o componente nasce na tela
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Limpeza de memória caso o componente seja destruído antes do tempo
    return () => clearTimeout(timer);
  }, []);

  // Se estiver carregando, devolve o Skeleton em vez do Card real
  if (isLoading) {
    return <OfferCardSkeleton />;
  }

  const store = offer.storeId ? STORE_MAP[offer.storeId] : { name: offer.seller, id: "unknown" };

  const discount = offer.old_price && offer.old_price > offer.current_price
    ? Math.round(((offer.old_price - offer.current_price) / offer.old_price) * 100)
    : Math.round(offer.discount || 0);

  return (
    <article
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(offer)}
      onKeyDown={(event) => {
        if (onSelect && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect(offer);
        }
      }}
      className={cn(
        "group animate-float-up relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
        isBest ? "border-savings/50 ring-2 ring-savings/30" : "border-border",
      )}
    >
      {isBest && (
        <div className="absolute left-0 top-3 z-10 inline-flex items-center gap-1 rounded-r-full bg-savings px-2.5 py-1 text-xs font-bold text-savings-foreground shadow-sm">
          <Trophy className="size-3.5" />
          Menor preço
        </div>
      )}

      {mostRated && (
        <div className="absolute left-0 top-3 z-10 inline-flex items-center gap-1 rounded-r-full bg-orange-400 px-2.5 py-1 text-xs font-bold text-savings-foreground shadow-sm">
          <Trophy className="size-3.5" />
          Melhor avaliado
        </div>
      )}

      {highestDiscount && (
        <div className="absolute left-0 top-3 z-10 inline-flex items-center gap-1 rounded-r-full bg-red-400 px-2.5 py-1 text-xs font-bold text-savings-foreground shadow-sm">
          <Trophy className="size-3.5" />
          Maior desconto
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          width={500}
          height={300}
          quality={100}
          src={offer.img_link || "/placeholder.svg"}
          alt={offer.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-lg bg-destructive px-2 py-0.5 text-xs font-bold text-white">
            -{discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center gap-2">
          {store.id !== "unknown" && <StoreLogo store={store as any} className="size-6" />}
          <span className="text-xs font-medium text-muted-foreground">{store.name}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{offer.rating?.toFixed(1) || "0.0"}</span>
            <span>({offer.ratingCount || 0})</span>
          </span>
        </div>

        <h3 className="line-clamp-2 text-pretty text-sm font-medium leading-snug text-foreground">
          {offer.title}
        </h3>

        <div className="mt-auto">
          {offer.old_price && offer.old_price > offer.current_price && (
            <span className="text-xs text-muted-foreground line-through">
              {brl.format(offer.old_price)}
            </span>
          )}

          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground flex justify-center items-center gap-2">
              {brl.format(offer.pix_price < offer.current_price ? offer.pix_price : offer.current_price)} <p className='text-sm'>à vista no <b className='text-green-600'>PIX</b></p>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {offer.pix_price < offer.current_price ? `Ou ${brl.format(offer.current_price)}` : `Ou ${brl.format(offer.pix_price)}`} em até {offer.max_parcels} no cartão
          </p>
        </div>

        {offer.free_shipping && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-savings/40 px-2 py-0.5 text-xs font-semibold text-savings-foreground dark:text-savings">
            <Truck className="size-3.5" />
            Frete grátis
          </span>
        )}

        {offer.stock < 10 && offer.stock > 0 && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-400/40 px-2 py-0.5 text-xs font-semibold text-savings-foreground dark:text-savings">
            <CircleAlert className="size-3.5" />
            Poucas unidades
          </span>
        )}

        <a
          href={offer.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver oferta
          <ExternalLink className="size-4" />
        </a>
      </div>
    </article>
  );
}