"use client";

import { Copy, ExternalLink, Package, Store, Star, Tag, Truck, Banknote, Laptop, BanknoteArrowDown, Users2, CreditCard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";
import { STORE_MAP } from "@/lib/stores";
import type { Offer } from "@/lib/types";
import { toast } from "./ui/toast";
import Image from "next/image";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ProductDetailSheet({
    offer,
    open,
    onOpenChange,
}: {
    offer: Offer | null
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    if (!offer) return null;
    const store = STORE_MAP[offer.storeId];
    const discount = offer.old_price ? Math.round(((offer.old_price - offer.current_price) / offer.old_price) * 100) : 0;


    function handleCopy(offer: Offer) {

        navigator.clipboard?.writeText(offer.cupoum || "");

        toast.add({
            type: "success",
            title: "Cupom copiado!",
            description: "O cupom foi copiado para a área de transferência.",
        });
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg px-3">

                {offer && store && (
                    <div className="flex flex-col gap-4 py-6">
                        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-transparent">
                            <Image src={offer.img_link || "/placeholder.svg"} alt={offer.title} className="aspect-square w-3/5 object-cover " />
                            {discount > 0 && (
                                <span className="absolute right-4 top-4 rounded-lg bg-destructive px-2.5 py-1 text-xs font-bold text-primary-foreground">-{discount}% OFF</span>
                            )}
                        </div>

                        <h2 className="font-display text-xl  font-bold leading-tight text-foreground">{offer.title}</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <InfoItem icon={Banknote} label="Preço original" value={offer.old_price ? brl.format(offer.old_price) : "Não informado"} />
                            <InfoItem icon={BanknoteArrowDown} label="Preço atual" value={offer.current_price ? brl.format(offer.current_price) : "Não informado"} />
                            <InfoItem icon={BanknoteArrowDown} label="Preço PIX" value={offer.pix_price ? brl.format(offer.pix_price) : "Não informado"} />
                            <InfoItem icon={CreditCard} label="Parcelas" value={offer.max_parcels ? `${offer.max_parcels}` : "Não informado"} />
                            <InfoItem icon={Star} label="Nota" value={offer.rating ? offer.rating.toFixed(1) : "Nenhuma"} />
                            <InfoItem icon={Users2} label="Avaliações" value={offer.ratingCount ? `${offer.ratingCount}` : "Nenhuma"} />
                            <InfoItem icon={Package} label="Fabricante" value={offer.manufacturer || "Não informado"} />
                            <InfoItem icon={Store} label="Vendedora" value={offer.seller || store.name} />
                            <InfoItem icon={Laptop} label="Site encontrado" value={store.name} />
                            <InfoItem icon={Truck} label="Entrega" value={offer.free_shipping ? "Frete grátis" : "Frete calculado"} />
                        </div>

                        {offer.cupoum && (
                            <div className="flex items-center justify-between gap-1 rounded-xl border border-dashed border-primary/40 bg-primary/5 py-2 px-4">
                                <div className="flex items-center gap-3">
                                    <Tag className="size-5 text-primary" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground">Cupom necessário</p>
                                        <p className="font-mono text-sm font-bold text-foreground">{offer.cupoum}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="icon" aria-label="Copiar cupom" onClick={() => handleCopy(offer)}>
                                    <Copy />
                                </Button>
                            </div>
                        )}
                        <div className={`flex flex-col gap-2 ${!offer.cupoum ? "absolute bottom-8" : "relative"}`}>
                            <a
                                href={offer.source} target="_blank" rel="noreferrer"
                                className={buttonVariants({ size: "lg" }) + " w-full bg-primary text-primary-foreground"}
                            >
                                Ir para o produto <ExternalLink data-icon="inline-end" />
                            </a>
                            <p className="text-center text-xs text-muted-foreground ">A oferta foi encontrada em {store.name}. Os preços podem mudar no site da vendedora.</p>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
    return (
        <div className="flex min-w-0 items-start gap-2 rounded-xl bg-muted/60 p-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-semibold text-foreground">{value}</p>
            </div>
        </div>
    );
}
