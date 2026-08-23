import { Radar, ListChecks, PiggyBank } from "lucide-react";

const STEPS = [
  {
    icon: Radar,
    title: "Você busca uma vez",
    desc: "Digite o produto e escolha em quais lojas o Rastrea deve procurar.",
  },
  {
    icon: ListChecks,
    title: "A gente vasculha tudo",
    desc: "O robô visita cada loja ao mesmo tempo e reúne todas as ofertas num lugar só.",
  },
  {
    icon: PiggyBank,
    title: "Você economiza",
    desc: "Compare preço, frete e avaliação lado a lado e vá direto na melhor oferta.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:scale-105 hover:-translate-y-2 transition-all ease-in-out"
          >
            <span className="absolute right-5 top-5 font-display text-3xl font-bold text-muted/60">
              {i + 1}
            </span>
            <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <step.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
