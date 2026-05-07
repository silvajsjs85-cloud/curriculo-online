import { Check, Sparkles, Lock, FileText, ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { PLAN_PRICE, PLAN_PERIOD } from "@/lib/subscription";

const FREE_FEATURES = [
  "2 templates profissionais",
  "Download em PDF ilimitado",
  "Editor em tempo real",
  "Sem marca d'água",
];

const PREMIUM_FEATURES = [
  "Todos os 10 templates exclusivos",
  "Destaque em sistemas ATS",
  "Suporte prioritário 24/7",
  "Acesso a novos modelos",
  "Remoção de qualquer limitação",
];

export default function Pricing() {
  const { subscribed, paymentUrl } = useSubscription();

  return (
    <>
      <Helmet>
        <title>Planos e Preços — Currículo Fácil</title>
        <meta name="description" content="Escolha o plano ideal para sua carreira. Grátis ou Premium." />
      </Helmet>

      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="section-label mx-auto">Nossos Planos</div>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0F2744] mb-6 tracking-normal">
              O investimento certo para o seu <br />
              <span className="text-[#0D9488]">próximo emprego</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
              Seja você um estudante ou um executivo, temos o plano ideal para destacar seu perfil.
            </p>
          </div>

          {/* Active premium banner */}
          {subscribed && (
            <div className="mb-12 p-6 rounded-[2rem] bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in shadow-lg shadow-teal-500/5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F2744]">Você é Premium!</h3>
                  <p className="text-teal-700 font-medium">Acesso total liberado em todos os dispositivos.</p>
                </div>
              </div>
              <Button asChild className="rounded-full bg-[#0D9488] hover:bg-[#0f766e] h-12 px-8 font-bold">
                <Link to="/criar">Ir para o Editor</Link>
              </Button>
            </div>
          )}

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Free Plan */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-up">
              <div className="mb-8">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F2744] mb-2">Plano Grátis</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#0F2744]">R$ 0</span>
                  <span className="text-slate-400 font-bold">/sempre</span>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 mb-8" />
              
              <ul className="space-y-4 mb-12 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-slate-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="w-full h-14 rounded-full border-slate-200 text-slate-600 font-bold text-lg hover:bg-slate-50">
                <Link to="/criar">Começar Agora</Link>
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#0F2744] p-10 rounded-[3rem] text-white flex flex-col relative overflow-hidden shadow-2xl shadow-blue-900/20 group hover:-translate-y-2 transition-all duration-300 animate-fade-up animate-delay-100">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="h-32 w-32" />
              </div>
              <div className="mb-8 relative z-10">
                <div className="inline-block bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-normal mb-6">
                  MAIS POPULAR
                </div>
                <h2 className="text-2xl font-bold mb-2">Plano Premium</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{PLAN_PRICE}</span>
                  <span className="text-slate-400 font-bold">{PLAN_PERIOD}</span>
                </div>
              </div>

              <div className="h-px bg-white/10 mb-8 relative z-10" />

              <ul className="space-y-4 mb-12 flex-1 relative z-10">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-100 font-bold">
                    <div className="h-5 w-5 rounded-full bg-[#0D9488] flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {subscribed ? (
                <Button asChild className="w-full h-14 rounded-full bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-lg relative z-10">
                  <Link to="/criar">Voltar ao Editor</Link>
                </Button>
              ) : (
                <a
                  href={paymentUrl !== "#" ? paymentUrl : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-full bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-teal-500/30 transition-all relative z-10"
                >
                  <Zap className="h-5 w-5 fill-white" />
                  Assinar Premium
                </a>
              )}
              <p className="text-center text-[10px] text-slate-400 font-bold mt-4 tracking-normalst uppercase relative z-10">
                Pagamento Seguro via Stripe
              </p>
            </div>
          </div>

          {/* FAQ or Comparison Footer */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
             <div className="text-center p-6 animate-fade-up">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                   <Shield className="h-6 w-6 text-[#0D9488]" />
                </div>
                <h4 className="font-bold text-[#0F2744] mb-2">Cancelamento fácil</h4>
                <p className="text-xs text-slate-500 font-medium">Cancele sua assinatura a qualquer momento com um clique.</p>
             </div>
             <div className="text-center p-6 animate-fade-up animate-delay-100">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                   <CheckCircle className="h-6 w-6 text-[#0D9488]" />
                </div>
                <h4 className="font-bold text-[#0F2744] mb-2">Satisfação garantida</h4>
                <p className="text-xs text-slate-500 font-medium">Milhares de usuários satisfeitos e contratados.</p>
             </div>
             <div className="text-center p-6 animate-fade-up animate-delay-200">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                   <Zap className="h-6 w-6 text-[#0D9488]" />
                </div>
                <h4 className="font-bold text-[#0F2744] mb-2">Acesso imediato</h4>
                <p className="text-xs text-slate-500 font-medium">Liberação instantânea após a confirmação do pagamento.</p>
             </div>
          </div>
        </div>
      </main>
    </>
  );
}
