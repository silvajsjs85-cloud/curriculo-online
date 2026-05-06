import { Check, Sparkles, Lock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { STRIPE_PAYMENT_LINK, PLAN_PRICE, PLAN_PERIOD, FREE_TEMPLATES, PREMIUM_TEMPLATES } from "@/lib/subscription";

const FREE_FEATURES = [
  "2 templates gratuitos (Moderno e Primeiro Emprego)",
  "Download em PDF",
  "Compartilhamento de link público",
  "Salvar currículo localmente",
];

const PREMIUM_FEATURES = [
  "Todos os 10 templates (incluindo Clássico, Executivo, Criativo, Técnico e mais)",
  "Acesso a todos os modelos futuros",
  "Download em PDF ilimitado",
  "Compartilhamento de link público",
  "Suporte prioritário por e-mail",
];

const TEMPLATE_NAMES: Record<string, string> = {
  modern: "Moderno",
  classic: "Clássico",
  minimal: "Minimalista",
  executive: "Executivo",
  creative: "Criativo",
  technical: "Técnico",
  first_job: "Primeiro Emprego",
  international: "Internacional",
  institutional: "Institucional",
  compact: "Compacto",
};

export default function Pricing() {
  const { subscribed } = useSubscription();

  const paymentHref = STRIPE_PAYMENT_LINK
    ? `${STRIPE_PAYMENT_LINK}?success_url=${encodeURIComponent(window.location.origin + "/?payment=success")}`
    : "#";

  return (
    <>
      <Helmet>
        <title>Planos e Preços — Currículo Fácil</title>
        <meta name="description" content="Escolha o plano ideal para criar seu currículo profissional. Comece grátis ou assine o Premium para desbloquear todos os templates." />
      </Helmet>

      <main className="min-h-[calc(100vh-4rem)] bg-[#F7F6F3] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-14 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Sparkles className="h-3.5 w-3.5" />
              Planos e preços
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#0F2744] sm:text-5xl">
              Simples e transparente
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Comece grátis. Faça upgrade quando quiser mais templates.
            </p>
          </div>

          {/* Active premium banner */}
          {subscribed && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-teal-800">Você já tem o Premium ativo!</p>
                <p className="text-sm text-teal-700">Todos os templates estão liberados para você.</p>
              </div>
              <Button asChild className="ml-auto rounded-xl bg-teal-600 font-semibold text-white hover:bg-teal-700">
                <Link to="/criar">Criar currículo</Link>
              </Button>
            </div>
          )}

          {/* Plans grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Free plan */}
            <div className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                <h2 className="text-lg font-extrabold text-[#0F2744]">Gratuito</h2>
              </div>
              <div className="mb-6 mt-4">
                <span className="text-4xl font-extrabold text-[#0F2744]">R$ 0</span>
                <span className="ml-2 text-sm text-slate-500">para sempre</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                      <Check className="h-3 w-3 text-slate-500" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="h-11 w-full rounded-xl border-slate-200 font-semibold text-slate-700 hover:bg-slate-50">
                <Link to="/criar">Começar grátis</Link>
              </Button>
            </div>

            {/* Premium plan */}
            <div className="relative flex flex-col rounded-2xl border-2 border-teal-500 bg-white p-8 shadow-[0_8px_32px_rgba(13,148,136,0.18)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D9488] px-4 py-1 text-xs font-bold text-white shadow-md">
                  <Sparkles className="h-3 w-3" />
                  Mais popular
                </span>
              </div>
              <div className="mb-1 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-extrabold text-[#0F2744]">Premium</h2>
              </div>
              <div className="mb-6 mt-4">
                <span className="text-4xl font-extrabold text-[#0F2744]">{PLAN_PRICE}</span>
                <span className="ml-2 text-sm text-slate-500">{PLAN_PERIOD}</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Check className="h-3 w-3 text-teal-700" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {subscribed ? (
                <Button asChild className="h-11 w-full rounded-xl bg-teal-600 font-bold text-white hover:bg-teal-700">
                  <Link to="/criar">Ir para o editor</Link>
                </Button>
              ) : STRIPE_PAYMENT_LINK ? (
                <a
                  href={paymentHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D9488] font-bold text-white shadow-md transition-opacity hover:opacity-90"
                >
                  <Sparkles className="h-4 w-4" />
                  Assinar Premium
                </a>
              ) : (
                <Button
                  disabled
                  className="h-11 w-full rounded-xl bg-[#0D9488] font-bold text-white opacity-60 cursor-not-allowed"
                >
                  Em breve
                </Button>
              )}
              <p className="mt-3 text-center text-xs text-slate-500">
                Pagamento seguro via Stripe · Acesso por 1 ano
              </p>
            </div>
          </div>

          {/* Template comparison */}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-2xl font-extrabold text-[#0F2744]">
              Templates disponíveis
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {FREE_TEMPLATES.map((id) => (
                <div key={id} className="flex flex-col items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-700">
                    Grátis
                  </span>
                  <p className="text-sm font-bold text-[#0F2744]">{TEMPLATE_NAMES[id]}</p>
                </div>
              ))}
              {PREMIUM_TEMPLATES.map((id) => (
                <div key={id} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    <Lock className="h-2.5 w-2.5" />
                    Premium
                  </span>
                  <p className="text-sm font-bold text-[#0F2744]">{TEMPLATE_NAMES[id]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ simple */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="mb-6 text-xl font-extrabold text-[#0F2744]">Dúvidas frequentes</h2>
            <div className="space-y-5 divide-y divide-slate-100">
              {[
                {
                  q: "Posso cancelar a qualquer momento?",
                  a: "O plano Premium é um pagamento único anual, não uma assinatura recorrente. Você terá acesso por 12 meses.",
                },
                {
                  q: "O plano gratuito tem limite de currículos?",
                  a: "Não! Você pode criar quantos currículos quiser no plano gratuito, usando os 2 templates disponíveis.",
                },
                {
                  q: "Como o pagamento é processado?",
                  a: "O pagamento é processado com segurança pela Stripe, aceitando cartão de crédito, débito e PIX.",
                },
                {
                  q: "Após o pagamento, o acesso é imediato?",
                  a: "Sim! Assim que o pagamento for confirmado, você é redirecionado de volta e todos os templates são liberados automaticamente.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="pt-5 first:pt-0">
                  <p className="font-bold text-[#0F2744]">{q}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
