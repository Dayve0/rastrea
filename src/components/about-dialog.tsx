"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    ArrowUpRight,
    HeartHandshake,
    Mail,
    Radar,
    Sparkles,
    Target,
} from "lucide-react";

export function AboutDialog() {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    />
                }
            >
                Sobre o Rastrea
            </DialogTrigger>
            <DialogContent className="max-w-lg overflow-hidden p-0">
                <div className="bg-primary px-6 py-7 text-primary-foreground">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/20">
                            <Radar className="size-6" />
                        </span>
                        <div>
                            <p className="font-display text-xl font-bold">Rastrea</p>
                            <p className="text-sm text-primary-foreground/75">Preço bom não precisa ser sorte.</p>
                        </div>
                    </div>
                    <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        Menos abas abertas. Mais economia.
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/80">
                        O Rastrea reúne ofertas de diferentes lojas em um só lugar para você comparar preços, encontrar oportunidades e comprar com mais confiança.
                    </p>
                </div>

                <div className="flex flex-col gap-6 p-6">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Sobre o Rastrea</DialogTitle>
                        <DialogDescription>Informações sobre a aplicação e contato.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <AboutPoint icon={Target} title="Busca ampla" text="Pesquisamos várias lojas ao mesmo tempo." />
                        <AboutPoint icon={Sparkles} title="Clareza" text="Compare preço, frete e condições." />
                        <AboutPoint icon={HeartHandshake} title="Mais confiança" text="Decida com informação, não impulso." />
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-accent/45 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Tem interesse?</p>
                        <h3 className="mt-2 font-display text-lg font-bold text-foreground">Vamos conversar sobre o projeto.</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Entre em contato para conhecer melhor a aplicação, conversar sobre parcerias ou saber como o Rastrea pode ser adaptado para sua necessidade.
                        </p>
                        <a className={buttonVariants({ variant: "default" }) + " flex justify-center items-center mt-4 w-full"} href="mailto:dayversonmirandahotmail.com?subject=Tenho%20interesse%20no%20Rastrea">
                            <Mail data-icon="inline-start" />
                            <p></p> Entrar em contato
                            <ArrowUpRight data-icon="inline-end" />
                        </a>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                        O Rastrea é uma interface de comparação e descoberta de ofertas.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function AboutPoint({
    icon: Icon,
    title,
    text,
}: {
    icon: typeof Target
    title: string
    text: string
}) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border border-border/70 p-3">
            <Icon className="size-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs leading-5 text-muted-foreground">{text}</p>
        </div>
    );
}
