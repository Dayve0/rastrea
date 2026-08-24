"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const [seconds, setSeconds] = useState(3);
    const router = useRouter();

    useEffect(() => {
        const interval = window.setInterval(() => {
            setSeconds((current) => Math.max(current - 1, 0));
        }, 1000);
        const timeout = window.setTimeout(() => {
            reset();
        }, 3000);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(timeout);
        };
    });

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
                <section className="flex w-full max-w-xl flex-col items-center text-center">
                    <div className="relative mb-8 flex size-24 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
                        <div className="absolute inset-0 animate-pulse-ring rounded-3xl border-2 border-destructive/25" />
                        <AlertTriangle className="size-10" aria-hidden="true" />
                    </div>
                    <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.24em] text-destructive">Erro inesperado</p>
                    <h1 className="font-display text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        O radar encontrou uma interferência
                    </h1>
                    <p className="mt-5 max-w-md text-pretty leading-7 text-muted-foreground">
                        Algo não saiu como esperado. Você pode tentar novamente ou voltar ao início para continuar procurando ofertas.
                    </p>
                    <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
                        Redirecionando para o início em <span className="font-semibold text-foreground">{seconds}s</span>
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button onClick={reset} variant="outline">
                            <RefreshCw data-icon="inline-start" />
                            Tentar novamente
                        </Button>
                        <Button onClick={reset}>
                            <Home data-icon="inline-start" />
                            Ir para o início
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
