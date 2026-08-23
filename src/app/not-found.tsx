"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const [seconds, setSeconds] = useState(50);
    const router = useRouter();

    useEffect(() => {
        const interval = window.setInterval(() => {
            setSeconds((current) => Math.max(current - 1, 0));
        }, 1000);
        const timeout = window.setTimeout(() => {
            router.push("/");
        }, 50000);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(timeout);
        };
    });

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
                <section className="flex w-full max-w-xl flex-col items-center text-center">
                    <div className="relative mb-8 flex size-24 items-center justify-center rounded-3xl bg-accent text-primary">
                        <div className="absolute inset-0 animate-pulse-ring rounded-3xl border-2 border-primary/30" />
                        <SearchX className="size-10" aria-hidden="true" />
                    </div>
                    <p className="mb-3 font-mono text-2xl font-semibold uppercase tracking-[0.24em] text-primary">Erro 404</p>
                    <h1 className="font-display text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Essa oferta saiu do radar
                    </h1>
                    <p className="mt-5 max-w-md text-pretty leading-7 text-muted-foreground">
                        A página que você tentou acessar não existe ou foi movida. Vamos levar você de volta para uma nova busca.
                    </p>
                    <p className="mt-6 text-base text-muted-foreground" aria-live="polite">
                        Redirecionando para o início em <span className="font-semibold text-foreground">{seconds}s</span>
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button onClick={() => router.push("/")}>
                            <Home data-icon="inline-start" />
                            Ir para o início
                        </Button>
                        <Button variant="outline" onClick={() => window.history.back()}>
                            <ArrowLeft data-icon="inline-start" />
                            Voltar
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
