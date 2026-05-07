import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText, Download, Star, CheckCircle,
  ArrowRight, User, MousePointer, Sparkles,
  Users, TrendingUp, Shield, Lock, UserCheck, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/ResumePreview";
import { useSubscription } from "@/hooks/useSubscription";
import { isPremiumTemplate } from "@/lib/templateAccess";
import type { ResumeData } from "@/types/resume";

const PREVIEW_SCALE = 0.335;
const RESUME_WIDTH_PX = 794;

const DEMO_DATA: ResumeData = {
  personalInfo: {
    name: "Ana Carvalho",
    email: "ana@email.com",
    phone: "(11) 99999-9999",
    location: "São Paulo, SP",
    linkedin: "",
    website: "",
    summary: "Profissional com experiência em marketing digital, campanhas e análise de desempenho. Focada em resultados mensuráveis e crescimento de marca.",
    photo: "",
  },
  experiences: [
    { id: "1", position: "Analista de Marketing", company: "Empresa X", startDate: "Jan 2021", endDate: "", current: true, description: "Gestão de campanhas digitais, análise de métricas e coordenação de ações de conteúdo e mídia paga." },
  ],
  education: [
    { id: "1", degree: "Bacharelado", field: "Administração", institution: "Universidade Y", startDate: "2015", endDate: "2019", current: false },
  ],
  skills: [{ id: "1", name: "Marketing Digital", level: "Avançado" }, { id: "2", name: "Google Ads", level: "Avançado" }],
  languages: [{ id: "1", name: "Inglês", level: "Intermediário" }],
};

const TEMPLATES = [
  { name: "Moderno", layout: "modern" as const, desc: "Design contemporâneo e limpo.", tag: "Popular" },
  { name: "Clássico", layout: "classic" as const, desc: "Tradicional e elegante.", tag: "ATS" },
  { name: "Executivo", layout: "executive" as const, desc: "Foco em liderança.", tag: "Premium" },
  { name: "Criativo", layout: "creative" as const, desc: "Visual moderno e sidebar.", tag: "Novo" },
];

const STEPS = [
  { icon: <MousePointer />, title: "Escolha o modelo", desc: "Selecione entre diversos designs profissionais aprovados por recrutadores." },
  { icon: <User />, title: "Preencha seus dados", desc: "Insira suas experiências, formação e habilidades em um formulário intuitivo." },
  { icon: <Download />, title: "Baixe em PDF", desc: "Obtenha seu currículo pronto em alta resolução, sem marca d'água." },
];

const BENEFITS = [
  { icon: <Shield />, title: "Compatível com ATS", desc: "Estruturas otimizadas para leitura automática de sistemas de RH." },
  { icon: <TrendingUp />, title: "Sem marca d'água", desc: "Seu currículo é seu. Baixe arquivos limpos e profissionais gratuitamente." },
  { icon: <UserCheck />, title: "Privacidade total", desc: "Seus dados não são vendidos. Tudo é processado com segurança local." },
];

export default function Landing() {
  const { subscribed } = useSubscription();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.slice(1);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0F2744]/[0.02] -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="section-label animate-fade-in">O melhor criador de currículos do Brasil</div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#0F2744] leading-[1.1] mb-6 tracking-normal">
                Crie um currículo <br />
                <span className="text-[#0D9488]">profissional</span> em poucos minutos
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Escolha um modelo, preencha seus dados e baixe em PDF. Aprovado em filtros ATS e 100% gratuito para começar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="btn-cta h-14 px-10 rounded-full font-bold text-lg">
                  <Link to="/criar" className="flex items-center gap-2">
                    Criar meu currículo grátis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-full font-bold text-lg border-slate-200 text-slate-700 hover:bg-white hover:border-[#0D9488]">
                  <a href="#modelos">Ver modelos</a>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#0D9488]" /> Sem marca d'água</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#0D9488]" /> Sem cadastro obrigatório</div>
              </div>
            </div>

            <div className="relative animate-slide-right hidden lg:block">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-slate-100 px-4 py-2 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-4 flex-1 bg-white rounded-md h-6" />
                </div>
                <div className="h-[480px] bg-white overflow-hidden">
                   <div className="scale-[0.6] origin-top transform translate-x-[15%]">
                     <ResumePreview data={DEMO_DATA} template="modern" />
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-fade-in animate-delay-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F2744]">Taxa de aprovação</div>
                    <div className="text-2xl font-black text-[#0D9488]">98.4%</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-400">Baseado em feedback de RHs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof ─── */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-normal text-slate-400 mb-8">
            Usuários contratados em empresas globais
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale transition-all">
             <span className="text-2xl font-black text-slate-900">NUBANK</span>
             <span className="text-2xl font-black text-slate-900">IFOOD</span>
             <span className="text-2xl font-black text-slate-900">GOOGLE</span>
             <span className="text-2xl font-black text-slate-900">AMAZON</span>
             <span className="text-2xl font-black text-slate-900">ITAÚ</span>
          </div>
        </div>
      </section>

      {/* ─── How it Works ─── */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fade-up">
            <div className="section-label mx-auto">Processo Simples</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F2744] mb-4 tracking-normal">Como funciona?</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Três passos rápidos para sair do zero ao currículo perfeito.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
            {STEPS.map((s, i) => (
              <div key={i} className="relative z-10 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group animate-fade-up animate-delay-100">
                <div className="h-16 w-16 rounded-2xl bg-[#0F2744] text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
                  {s.icon}
                </div>
                <div className="text-xs font-black text-[#0D9488] mb-2">PASSO 0{i+1}</div>
                <h3 className="text-xl font-bold text-[#0F2744] mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Templates Gallery ─── */}
      <section id="modelos" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="animate-fade-up">
              <div className="section-label">Nossos Modelos</div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F2744] mb-4 tracking-normal">Escolha o seu design</h2>
              <p className="text-slate-500 max-w-md font-medium">Layouts modernos testados para garantir que sua experiência brilhe.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full font-bold h-12 border-slate-200">
              <Link to="/modelos">Ver todos os modelos</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.map((t) => {
              const isPremium = isPremiumTemplate(t.layout);
              return (
                <div key={t.name} className="template-card bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group transition-all animate-fade-up">
                  <div className="template-preview-container bg-slate-100 relative">
                    <div className="scale-[0.4] origin-top transform translate-x-[15%] pt-6">
                      <ResumePreview data={DEMO_DATA} template={t.layout} />
                    </div>
                    {isPremium && !subscribed && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-white p-3 rounded-full shadow-lg">
                           <Lock className="h-6 w-6 text-[#0F2744]" />
                         </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="font-bold text-[#0F2744]">{t.name}</h3>
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-normalr ${t.tag === 'Popular' ? 'bg-teal-100 text-[#0D9488]' : 'bg-amber-100 text-amber-700'}`}>
                         {t.tag}
                       </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-6">{t.desc}</p>
                    {isPremium && !subscribed ? (
                      <Button asChild className="w-full rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-xs h-10 shadow-lg shadow-amber-500/20">
                        <Link to="/precos">Desbloquear Premium</Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full rounded-full bg-[#0D9488] hover:bg-[#0f766e] font-bold text-xs h-10 shadow-lg shadow-teal-500/20">
                        <Link to={`/criar?template=${t.layout}`}>Usar este modelo</Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="aspect-square bg-teal-50 rounded-[4rem] flex items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-64 w-64 bg-teal-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                  <FileText className="h-64 w-64 text-[#0D9488] opacity-20 relative z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6 max-w-sm">
                        <div className="h-16 w-16 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg">
                           <Download className="h-8 w-8" />
                        </div>
                        <div>
                           <div className="font-black text-[#0F2744] text-xl">PDF Export</div>
                           <div className="text-slate-500 font-bold text-sm uppercase tracking-normalst">Pixel Perfect</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2 animate-fade-up">
              <div className="section-label">Por que nós?</div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F2744] mb-8 tracking-normal">O site mais confiável para sua carreira</h2>
              <div className="space-y-8">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 text-[#0D9488] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0F2744] mb-2">{b.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-medium">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Table ─── */}
      <section id="precos" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.1),transparent)]" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-normalst">
              Planos e Preços
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-normal">Escolha o seu plano</h2>
            <p className="text-slate-400 font-medium max-w-lg mx-auto">Comece gratuitamente e faça upgrade para desbloquear o poder total.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Free Plan */}
             <div className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-700 transition-all hover:border-slate-500 animate-fade-up">
                <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
                <div className="text-5xl font-black mb-6">R$ 0</div>
                <div className="h-px bg-slate-700 mb-8" />
                <ul className="space-y-4 mb-10">
                   {["2 Templates Gratuitos", "Exportação em PDF", "Editor em Tempo Real", "Sem cadastro"].map(f => (
                     <li key={f} className="flex items-center gap-3 text-slate-300 font-medium">
                       <Check className="h-5 w-5 text-teal-400" /> {f}
                     </li>
                   ))}
                </ul>
                <Button asChild variant="outline" className="w-full h-14 rounded-full border-slate-600 bg-transparent hover:bg-slate-700 text-white font-bold text-lg">
                   <Link to="/criar">Começar Grátis</Link>
                </Button>
             </div>

             {/* Premium Plan */}
             <div className="bg-white p-10 rounded-[2.5rem] text-[#0F2744] shadow-2xl shadow-teal-500/10 relative animate-fade-up animate-delay-100">
                <div className="absolute -top-4 right-8 bg-[#0D9488] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-normalst">
                   RECOMENDADO
                </div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-5xl font-black mb-6">R$ 27,90 <span className="text-lg text-slate-400">/mês</span></div>
                <div className="h-px bg-slate-100 mb-8" />
                <ul className="space-y-4 mb-10">
                   {["Todos os 10 Templates", "Acesso Ilimitado", "Suporte Prioritário", "Modelos Premium EXCLUSIVOS"].map(f => (
                     <li key={f} className="flex items-center gap-3 font-bold text-[#0F2744]">
                       <Check className="h-5 w-5 text-[#0D9488]" /> {f}
                     </li>
                   ))}
                </ul>
                <Button asChild className="w-full h-14 rounded-full bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-lg shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1">
                   <Link to="/precos">Assinar Premium</Link>
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="depoimentos" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fade-up">
            <div className="section-label mx-auto">Depoimentos</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F2744] mb-4 tracking-normal">O que dizem nossos usuários</h2>
            <p className="text-slate-500 font-medium">Histórias de sucesso que começaram aqui.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Rocha", role: "Engenheiro", text: "Consegui minha vaga no Nubank usando o modelo técnico. O layout é limpo e foca no que importa." },
              { name: "Júlia Santos", role: "Designer", text: "O modelo criativo me ajudou a destacar meu portfólio. Simples de usar e o PDF sai perfeito." },
              { name: "Marcos Lima", role: "Vendas", text: "Sem enrolação. Em 5 minutos meu currículo estava pronto. Recomendo para todo mundo." },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 card-hover animate-fade-up animate-delay-100">
                <div className="flex gap-1 mb-6">
                   {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[#0F2744] font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-slate-200" />
                   <div>
                      <div className="font-bold text-[#0F2744]">{t.name}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-normalst">{t.role}</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[#0F2744] text-white pt-20 pb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2.5 font-extrabold text-2xl mb-6">
                <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Currículo Fácil
              </Link>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8 font-medium">
                A ferramenta mais moderna e simples para criar currículos profissionais no Brasil. Democratizando o acesso a um design de alto nível.
              </p>
              <div className="flex gap-4">
                 <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0D9488] transition-colors cursor-pointer"><Users className="h-5 w-5" /></div>
                 <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0D9488] transition-colors cursor-pointer"><TrendingUp className="h-5 w-5" /></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-normalst text-teal-400 mb-6">Navegação</h4>
              <ul className="space-y-4 font-medium text-slate-300">
                <li><Link to="/modelos" className="hover:text-white transition-colors">Modelos</Link></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><Link to="/precos" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-normalst text-teal-400 mb-6">Legal</h4>
              <ul className="space-y-4 font-medium text-slate-300">
                <li><Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-slate-500 text-sm font-medium">
            © 2026 Currículo Fácil. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
