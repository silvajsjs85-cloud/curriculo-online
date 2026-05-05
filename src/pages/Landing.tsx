import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText, Download, Star, Eye, CheckCircle,
  ArrowRight, User, MousePointer, Sparkles, ChevronDown,
  Users, TrendingUp, Shield, Lock, UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/ResumePreview";
import type { ResumeData } from "@/types/resume";

// ─── Preview constants ────────────────────────────────────────────────────────
const PREVIEW_SCALE = 0.335;
const RESUME_WIDTH_PX = 794; // 210mm ≈ 794px at 96 dpi

// ─── Static demo data for all template previews ───────────────────────────────
const ANA_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Ana Carvalho",
    email: "ana@email.com",
    phone: "(11) 99999-9999",
    location: "São Paulo, SP",
    linkedin: "",
    website: "",
    summary:
      "Profissional com experiência em marketing digital, campanhas e análise de desempenho. Focada em resultados mensuráveis e crescimento de marca.",
    photo: "",
  },
  experiences: [
    {
      id: "1",
      position: "Analista de Marketing",
      company: "Empresa X",
      startDate: "Jan 2021",
      endDate: "",
      current: true,
      description:
        "Gestão de campanhas digitais, análise de métricas e coordenação de ações de conteúdo e mídia paga.",
    },
    {
      id: "2",
      position: "Assistente de Marketing",
      company: "Agência Y",
      startDate: "Mar 2019",
      endDate: "Dez 2020",
      current: false,
      description:
        "Apoio na criação de materiais e monitoramento de campanhas em redes sociais.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bacharelado",
      field: "Administração",
      institution: "Universidade Y",
      startDate: "2015",
      endDate: "2019",
      current: false,
    },
  ],
  skills: [
    { id: "1", name: "Marketing Digital", level: "Avançado" },
    { id: "2", name: "Google Ads", level: "Avançado" },
    { id: "3", name: "Excel", level: "Intermediário" },
    { id: "4", name: "Comunicação", level: "Especialista" },
    { id: "5", name: "Gestão de Campanhas", level: "Avançado" },
  ],
  languages: [
    { id: "1", name: "Inglês", level: "Intermediário" },
    { id: "2", name: "Espanhol", level: "Básico" },
  ],
};

// ─── Template card ────────────────────────────────────────────────────────────
function TemplateCard({
  name,
  accent,
  tag,
  layout = "modern",
}: {
  name: string;
  accent: string;
  tag?: string;
  layout?: "modern" | "classic" | "minimal" | "executive";
}) {
  return (
    <div
      className="template-card relative bg-white rounded-2xl cursor-pointer group hover:scale-[1.03] hover:shadow-2xl"
      style={{
        overflow: "hidden",
        maxWidth: "100%",
        boxShadow: "0 2px 16px rgba(15,39,68,0.08), 0 1px 4px rgba(15,39,68,0.04)",
        border: "1px solid rgba(15,39,68,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        WebkitTransform: "translateZ(0)", // force GPU layer on iOS
      }}
    >
      {/* Badge */}
      {tag && (
        <div className="absolute top-3 right-3 z-20">
          <span
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wide ${
              tag === "Popular"
                ? "bg-teal-500 text-white"
                : "bg-amber-400 text-amber-900"
            }`}
            style={{ boxShadow: "0 1px 5px rgba(0,0,0,0.18)" }}
          >
            {tag === "Popular" ? "★ Popular" : "✦ Novo"}
          </span>
        </div>
      )}

      {/* Real resume thumbnail — isolated container so the 794px resume never leaks to page layout */}
      <div className="template-preview-container">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: `${RESUME_WIDTH_PX}px`,
            transform: `translateX(-50%) scale(${PREVIEW_SCALE})`,
            transformOrigin: "top center",
            pointerEvents: "none",
            userSelect: "none",
            willChange: "transform",
          }}
        >
          <ResumePreview data={ANA_RESUME_DATA} template={layout} />
        </div>

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, transparent, white)",
            pointerEvents: "none",
          }}
        />

        {/* Hover overlay with button */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-center pointer-events-none">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200">
            <div className="bg-white text-[#0F2744] font-bold px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
              Usar este modelo <ArrowRight className="h-4 w-4 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(15,39,68,0.07)", backgroundColor: "#fafafa" }}
      >
        <div className="leading-tight min-w-0">
          <span className="text-[13px] sm:text-[15px] font-extrabold block truncate" style={{ color: "#0F2744" }}>
            {name}
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Template profissional</span>
        </div>
        <span
          className="text-[11px] sm:text-[12px] font-bold flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
          style={{
            color: accent,
            backgroundColor: `${accent}15`,
            border: `1px solid ${accent}28`,
          }}
        >
          <span className="sm:hidden">Usar</span>
          <span className="hidden sm:inline">Usar modelo</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white"
      style={{ boxShadow: "0 1px 6px rgba(15,39,68,0.05)" }}
    >
      <span className="text-teal-500 flex-shrink-0">{icon}</span>
      <div className="leading-tight">
        <span className="font-extrabold text-base" style={{ color: "#0F2744" }}>{value}</span>
        <span className="text-sm text-gray-500 ml-1.5">{label}</span>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEMPLATES = [
  { name: "Moderno",     accent: "#0D9488", tag: "Popular", layout: "modern" as const },
  { name: "Clássico",    accent: "#0F2744", tag: undefined,  layout: "classic" as const },
  { name: "Minimalista", accent: "#475569", tag: undefined,  layout: "minimal" as const },
  { name: "Executivo",   accent: "#2DD4BF", tag: "Novo",     layout: "executive" as const },
];

const STEPS = [
  {
    icon: <MousePointer className="h-5 w-5" />,
    step: "01",
    title: "Escolha o modelo",
    desc: "Temos opções para vagas técnicas, administrativas, criativas e executivas.",
  },
  {
    icon: <User className="h-5 w-5" />,
    step: "02",
    title: "Preencha os dados",
    desc: "Experiências, formação, habilidades e idiomas — campos simples e diretos.",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    step: "03",
    title: "Veja o resultado",
    desc: "O currículo monta enquanto você digita. Sem surpresas na hora de baixar.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    step: "04",
    title: "Baixe em PDF",
    desc: "Um clique. PDF de alta resolução, sem marca d'água, pronto para enviar.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana Carvalho",
    role: "Analista de Marketing",
    text: "Usei para montar meu currículo em poucos minutos e consegui enviar para várias vagas no mesmo dia. Muito mais prático do que eu esperava.",
    avatar: "https://i.pravatar.cc/48?img=5",
    location: "São Paulo, SP",
    hired: true,
  },
  {
    name: "Lucas Mendes",
    role: "Desenvolvedor",
    text: "Gostei porque não precisei criar conta. Preenchi meus dados, escolhi o modelo e baixei em PDF. Simples e direto ao ponto.",
    avatar: "https://i.pravatar.cc/48?img=11",
    location: "Porto Alegre, RS",
    hired: false,
  },
  {
    name: "Fernanda Oliveira",
    role: "Assistente Administrativo",
    text: "Os modelos são simples, bonitos e deixam o currículo com aparência mais profissional. Fiquei surpresa com a qualidade do resultado.",
    avatar: "https://i.pravatar.cc/48?img=9",
    location: "Belo Horizonte, MG",
    hired: false,
  },
];

const TIPS = [
  {
    q: "Quantas páginas deve ter meu currículo?",
    a: "Para a maioria das vagas, uma página basta. Se você tem mais de 10 anos de experiência relevante, duas páginas é o máximo. Menos é mais.",
  },
  {
    q: "Devo colocar foto no currículo?",
    a: "No Brasil é opcional. Em cargos de atendimento ou comerciais, uma foto profissional pode ajudar. Nos demais, foque no conteúdo.",
  },
  {
    q: "Como descrever minhas habilidades?",
    a: "Seja específico. 'Google Ads e Meta Ads' convence mais do que 'domínio de marketing digital'. Use os termos exatos da vaga.",
  },
  {
    q: "Por que baixar em PDF e não Word?",
    a: "PDF preserva a formatação em qualquer dispositivo. Word pode desconfigurar tudo ao abrir em versões diferentes — não arrisque.",
  },
];

const COMPANIES = ["Nubank", "iFood", "Mercado Livre", "Ambev", "Gympass", "Totvs"];

const COMPANY_LOGOS = [
  {
    name: "Nubank",
    svg: (
      <svg height="20" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="bold" fontSize="20" letterSpacing="-1">nu</text>
      </svg>
    )
  },
  {
    name: "iFood",
    svg: (
      <svg height="20" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="-1.5">iFood</text>
      </svg>
    )
  },
  {
    name: "Mercado Livre",
    svg: (
      <svg height="20" viewBox="0 0 130 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="bold" fontSize="18" letterSpacing="-0.5">mercado livre</text>
      </svg>
    )
  },
  {
    name: "Rappi",
    svg: (
      <svg height="20" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="-1">Rappi</text>
      </svg>
    )
  }
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  const [activeTip, setActiveTip] = useState<number | null>(null);
  const location = useLocation();

  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50); // 50ms * 100 = 5000ms = 5s loop
    return () => clearInterval(interval);
  }, []);

  const getTypedText = (text: string, startPct: number, endPct: number) => {
    if (demoStep < startPct) return "";
    if (demoStep >= endPct) return text;
    const progress = (demoStep - startPct) / (endPct - startPct);
    const chars = Math.floor(progress * text.length);
    return text.slice(0, chars);
  };

  const isTyping = (startPct: number, endPct: number) => demoStep >= startPct && demoStep < endPct;

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F6F3" }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative px-4 pt-16 pb-20 overflow-hidden"
        style={{ backgroundColor: "#F7F6F3" }}
      >
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #0D948822 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute top-1/2 -left-20 h-64 w-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #2563eb22 0%, transparent 70%)" }} />

        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase">
                <Sparkles className="h-3 w-3" />
                100% gratuito · Sem cadastro · Sem marca d'água
              </div>

              <h1
                className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] mb-6"
                style={{ color: "#0F2744" }}
              >
                O currículo que<br />
                <span style={{ color: "#0D9488" }}>chama atenção</span><br />
                do recrutador
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-[460px]">
                Monte um currículo aprovado nos filtros ATS em menos de 5 minutos — sem cadastro, sem marca d'água.
              </p>

              <ul className="space-y-2.5 mb-10">
                {[
                  "Modelos aprovados por recrutadores de grandes empresas",
                  "Preview ao vivo — veja cada mudança na hora",
                  "PDF sem marca d'água, grátis para sempre",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span
                      className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#0D948820" }}
                    >
                      <CheckCircle className="h-3 w-3 text-teal-600" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-3">
                <div className="flex flex-col items-center sm:items-start">
                  <Button
                    size="lg"
                    asChild
                    className="btn-cta px-10 rounded-2xl font-extrabold"
                    style={{ height: "58px", fontSize: "1.1rem", boxShadow: "0 4px 16px rgba(13,148,136,0.35)" }}
                  >
                    <Link to="/criar" className="flex items-center gap-2">
                      Criar meu currículo grátis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <span className="text-[11px] font-medium text-gray-400 mt-2">
                    Grátis para sempre · Sem cartão de crédito
                  </span>
                </div>
                
                <a href="#modelos" className="group flex items-center gap-2 text-gray-600 font-semibold hover:text-[#0D9488] transition-colors mt-2 sm:mt-0 sm:pt-4">
                  Ver modelos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-8">
                <StatPill icon={<Users className="h-4 w-4" />} value="5.200+" label="currículos criados" />
                <StatPill icon={<Star className="h-4 w-4 fill-current" />} value="4.8★" label="avaliação" />
                <StatPill icon={<TrendingUp className="h-4 w-4" />} value="100%" label="gratuito" />
              </div>

              {/* Social Proof Hero */}
              <div className="pt-6 border-t border-gray-200/70">
                <p className="text-xs text-gray-500 font-semibold mb-4 uppercase tracking-wider">
                  Usuários contratados em:
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                  {COMPANY_LOGOS.map((company) => (
                    <div 
                      key={company.name} 
                      className="text-gray-900 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200 cursor-default"
                      title={company.name}
                    >
                      {company.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Browser mockup */}
            <div className="hidden lg:block animate-slide-up">
              <div
                className="rounded-2xl overflow-hidden border border-gray-200"
                style={{ boxShadow: "0 20px 60px rgba(15,39,68,0.15), 0 4px 16px rgba(15,39,68,0.08)" }}
              >
                {/* Chrome bar */}
                <div className="bg-[#ebebeb] border-b border-gray-200 px-4 py-2.5 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-1.5 border border-gray-200">
                    <span className="h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                    <span className="text-[11px] text-gray-500 font-mono truncate">curriculos.fun/editor</span>
                  </div>
                </div>

                {/* Editor */}
                <div className="flex" style={{ height: "316px" }}>
                  {/* Form panel */}
                  <div className="w-[42%] border-r border-gray-100 bg-gray-50 p-4 flex flex-col gap-2.5 relative">
                    <div className="absolute inset-0 bg-white/40 z-10 opacity-0 pointer-events-none transition-opacity duration-300" style={{ opacity: demoStep < 2 || demoStep > 98 ? 1 : 0 }} />
                    <div className="flex gap-1 mb-1 flex-wrap">
                      {["Pessoal", "Exp.", "Form.", "Hab."].map((t, i) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-1 rounded-lg font-semibold transition-colors duration-500"
                          style={
                            i === 0 || (i === 1 && demoStep > 50) || (i === 3 && demoStep > 80)
                              ? { backgroundColor: "#0D9488", color: "white" }
                              : { backgroundColor: "#e5e7eb", color: "#6b7280" }
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {[
                      ["Nome completo", "Ana Carvalho", 10, 25],
                      ["E-mail", "ana@email.com", 30, 45],
                      ["Telefone", "(11) 98765-4321", 50, 65],
                      ["Cidade", "São Paulo, SP", 70, 85],
                    ].map(([label, val, s, e]) => {
                      const text = getTypedText(val as string, s as number, e as number);
                      const typing = isTyping(s as number, e as number);
                      return (
                        <div key={label as string}>
                          <div className="text-[10px] text-gray-500 mb-0.5 font-semibold">{label as string}</div>
                          <div className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-700 shadow-sm h-[26px] flex items-center">
                            {text}
                            {typing && <span className="inline-block w-[1.5px] h-3 ml-0.5 bg-teal-500 animate-pulse" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Preview panel */}
                  <div className="flex-1 bg-white p-5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/40 z-10 opacity-0 pointer-events-none transition-opacity duration-300" style={{ opacity: demoStep < 2 || demoStep > 98 ? 1 : 0 }} />
                    <div
                      className="flex items-center justify-between pb-2.5 mb-3"
                      style={{ borderBottom: "2px solid #2563eb" }}
                    >
                      <div className="flex-1">
                        <div className="h-3 rounded mb-1.5 transition-all duration-75" style={{ backgroundColor: "#0F2744", width: `${Math.max(5, (getTypedText("Ana Carvalho", 10, 25).length / 12) * 100)}%`, maxWidth: "128px" }} />
                        <div className="flex gap-1.5">
                          <div className="h-1.5 rounded transition-all duration-75" style={{ backgroundColor: "#9ca3af", width: `${Math.max(5, (getTypedText("ana@email.com", 30, 45).length / 13) * 100)}%`, maxWidth: "64px" }} />
                          <div className="h-1.5 rounded transition-all duration-75" style={{ backgroundColor: "#9ca3af", width: `${Math.max(5, (getTypedText("(11) 98765-4321", 50, 65).length / 15) * 100)}%`, maxWidth: "48px" }} />
                        </div>
                      </div>
                      <div
                        className="h-11 w-11 rounded-full flex-shrink-0 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, #99f6e4, #bfdbfe)", opacity: demoStep > 25 ? 1 : 0.1 }}
                      />
                    </div>
                    {[{ lines: [100, 88, 72] }, { lines: [100, 78] }].map((sec, si) => (
                      <div key={si} className="mb-3 transition-opacity duration-500" style={{ opacity: demoStep > 55 ? 1 : 0.1 }}>
                        <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                        <div className="space-y-1">
                          {sec.lines.map((w, li) => (
                            <div key={li} className="h-1.5 rounded bg-gray-100 transition-all duration-700" style={{ width: demoStep > 55 ? `${w}%` : '0%' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-1 flex-wrap transition-opacity duration-500" style={{ opacity: demoStep > 85 ? 1 : 0.1 }}>
                      {["React", "Node.js", "SQL"].map((s) => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full font-medium transition-transform duration-300"
                          style={{ backgroundColor: "#DBEAFE", color: "#2563EB", transform: demoStep > 85 ? 'scale(1)' : 'scale(0.8)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status bar */}
                <div className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-400" />
                    <span className="text-[11px] text-gray-500">Salvo automaticamente</span>
                  </div>
                  <button
                    className="text-[11px] font-bold text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    <Download className="h-3 w-3" /> Baixar PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PRIVACY BLOCK ═══════════════════════════════════════════════════════ */}
      <div className="w-full flex justify-center -mt-6 relative z-10 px-4">
        <div 
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-500 font-medium shadow-sm"
          style={{ backgroundColor: "#F5F5F0", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", border: "1px solid rgba(0,0,0,0.03)" }}
        >
          <div className="flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-gray-400" /> Sem cadastro
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-gray-400" /> PDF sem marca
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-gray-400" /> Dados locais
          </div>
        </div>
      </div>

      {/* ══ SOCIAL PROOF ════════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-[11px] text-gray-400 uppercase tracking-[0.2em] font-semibold mb-7">
            Nossos usuários foram contratados em
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {COMPANIES.map((c) => (
              <span
                key={c}
                className="font-black text-base select-none text-gray-400"
                style={{ letterSpacing: "-0.02em" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POR QUE USAR ════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "#0F2744" }}
            >
              Por que usar o Currículo Fácil?
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: <UserCheck className="h-6 w-6 text-teal-600" />,
                title: "Grátis e sem cadastro",
                desc: "Crie seu currículo sem precisar criar conta.",
              },
              {
                icon: <Download className="h-6 w-6 text-teal-600" />,
                title: "PDF sem marca d'água",
                desc: "Baixe um currículo limpo e pronto para enviar.",
              },
              {
                icon: <FileText className="h-6 w-6 text-teal-600" />,
                title: "Modelos profissionais",
                desc: "Escolha layouts pensados para recrutadores e sistemas ATS.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  boxShadow: "0 2px 16px rgba(15,39,68,0.06)",
                  border: "1px solid rgba(15,39,68,0.06)",
                }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#0D948812" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#0F2744" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEMPLATES ═══════════════════════════════════════════════════════════ */}
      <section id="modelos" className="py-20 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.18em]">
              Templates Profissionais
            </span>
            <h2
              className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight"
              style={{ color: "#0F2744" }}
            >
              Escolha o modelo certo para a sua vaga
            </h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Cada template é estruturado para passar pelos filtros automáticos (ATS)
              e impressionar o recrutador na primeira olhada.
            </p>
          </div>

          <div className="templates-carousel flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-4 sm:gap-5 pb-3 sm:pb-0">
            {TEMPLATES.map((t) => (
              <Link to={`/criar?template=${t.layout}`} key={t.name} className="snap-start flex-none w-[78vw] sm:w-auto h-full">
                <TemplateCard {...t} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 px-8 h-11 font-medium transition-all duration-200"
            >
              <Link to="/modelos" className="flex items-center gap-2">
                Ver todos os modelos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA ═══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-20 px-4 border-t border-gray-200/50" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.18em]">
              Em 4 passos
            </span>
            <h2
              className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight"
              style={{ color: "#0F2744" }}
            >
              Tão simples que parece mágica
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
              Sem cadastro, sem instalação, sem complicação. Só você e o seu novo currículo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-teal-100 transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: "0 2px 16px rgba(15,39,68,0.06)" }}
              >
                <div
                  className="absolute top-5 right-5 text-5xl font-black leading-none select-none pointer-events-none"
                  style={{ color: "#0F274408" }}
                >
                  {s.step}
                </div>

                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-white mb-5"
                  style={{
                    background: "linear-gradient(135deg, #0D9488, #0891b2)",
                    boxShadow: "0 4px 12px rgba(13,148,136,0.3)",
                  }}
                >
                  {s.icon}
                </div>

                <div className="text-[11px] font-bold mb-2 tracking-widest" style={{ color: "#0D9488" }}>
                  PASSO {i + 1}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0F2744" }}>
                  {s.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DESTAQUE ATS ════════════════════════════════════════════════════════ */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div
            className="rounded-3xl overflow-hidden grid lg:grid-cols-5 items-stretch relative"
            style={{ background: "linear-gradient(135deg, #0F2744 0%, #0b1d32 60%, #0a1828 100%)" }}
          >
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute top-8 right-8 h-32 w-32 rounded-full opacity-[0.07]"
              style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }} />

            {/* Text */}
            <div className="lg:col-span-3 p-10 lg:p-14 relative">
              <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/20 text-teal-300 text-[11px] font-bold px-3 py-1.5 rounded-full mb-7 uppercase tracking-wider">
                <Shield className="h-3 w-3" /> Para quem busca emprego de verdade
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 tracking-tight">
                Seu currículo passa pelos<br />
                <span style={{ color: "#2DD4BF" }}>filtros automáticos das empresas</span>
              </h2>

              <p className="text-gray-300 mb-8 leading-relaxed text-[15px] max-w-md">
                Mais de 90% das grandes empresas usam sistemas de triagem automática (ATS)
                antes de um humano ver seu currículo. Nossos modelos são construídos exatamente para isso.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Estrutura legível por qualquer sistema de triagem ATS",
                  "Hierarquia de informação que facilita a leitura do recrutador",
                  "Layout limpo que imprime e digitaliza sem distorções",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300 text-[15px]">
                    <span
                      className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#0D948830", border: "1px solid #0D948860" }}
                    >
                      <CheckCircle className="h-3 w-3 text-teal-400" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                asChild
                className="btn-cta rounded-2xl font-bold"
                style={{ height: "52px", padding: "0 2rem", boxShadow: "0 4px 20px rgba(13,148,136,0.4)" }}
              >
                <Link to="/criar" className="flex items-center gap-2">
                  Criar meu currículo grátis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mockup */}
            <div className="hidden lg:flex lg:col-span-2 items-end justify-end px-6 pt-10 relative">
              <div
                className="absolute bottom-8 right-16 w-48 h-56 rounded-t-xl opacity-20"
                style={{ background: "linear-gradient(180deg, #2563eb44, transparent)", transform: "rotate(3deg)" }}
              />
              <div
                className="relative bg-white rounded-t-2xl overflow-hidden"
                style={{
                  width: "256px",
                  boxShadow: "0 -8px 48px rgba(0,0,0,0.3), 0 -2px 12px rgba(0,0,0,0.2)",
                }}
              >
                <div className="h-1 w-full" style={{ backgroundColor: "#2563eb" }} />
                <div className="p-5">
                  <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: "1.5px solid #2563eb33" }}>
                    <div>
                      <div className="h-2.5 w-24 rounded mb-1.5" style={{ backgroundColor: "#0F2744" }} />
                      <div className="flex gap-1.5">
                        <div className="h-1.5 w-14 rounded bg-gray-300" />
                        <div className="h-1.5 w-10 rounded bg-gray-300" />
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #99f6e4, #bfdbfe)" }} />
                  </div>
                  {[
                    { lines: [100, 84, 68] },
                    { lines: [100, 76] },
                    { lines: [90, 70] },
                  ].map((sec, si) => (
                    <div key={si} className="mb-3.5">
                      <div className="h-1.5 w-16 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                      <div className="space-y-1">
                        {sec.lines.map((w, i) => (
                          <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-1 flex-wrap pt-1">
                    {["React", "TypeScript", "Node"].map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-5 py-2.5 flex items-center justify-between" style={{ backgroundColor: "#0F2744" }}>
                  <span className="text-[10px] text-white/40 font-mono">curriculos.fun</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ DEPOIMENTOS ═════════════════════════════════════════════════════════ */}
      <section id="depoimentos" className="py-20 px-4 border-t border-[#0D9488]/20" style={{ backgroundColor: "#0D1F1A" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-[0.18em]">
              Quem já usou aprovou
            </span>
            <h2 className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight text-white">
              Resultados que falam por si
            </h2>
            <p className="text-gray-300 max-w-sm mx-auto leading-relaxed">
              Veja o que dizem quem já usou o Currículo Fácil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 flex flex-col relative overflow-hidden hover:-translate-y-1 transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Quote watermark */}
                <div
                  className="absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.05)", fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-[15px] leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="h-px bg-white/10 mb-4" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={`Foto de ${t.name}`}
                      className="h-11 w-11 rounded-full object-cover"
                      style={{ border: "2px solid rgba(255,255,255,0.1)" }}
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#0D1F1A", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }}
                    >
                      <CheckCircle className="h-3 w-3 text-teal-400" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-sm leading-tight text-white">
                        {t.name}
                      </div>
                      {t.hired && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-teal-900 bg-teal-400 px-1.5 py-0.5 rounded-sm">
                          Contratada
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {t.role} &middot; <span className="text-gray-500">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST / DADOS ═══════════════════════════════════════════════════════ */}
      <section className="py-12 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-3xl">
          <div
            className="rounded-2xl p-7 sm:p-9 flex flex-col sm:flex-row gap-6 items-start"
            style={{
              background: "linear-gradient(135deg, #0F274408 0%, #0D948808 100%)",
              border: "1px solid rgba(13,148,136,0.14)",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#0D948818", border: "1px solid rgba(13,148,136,0.2)" }}
            >
              <Lock className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h2
                className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2"
                style={{ color: "#0F2744" }}
              >
                Seus dados ficam no seu dispositivo
              </h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
                O Currículo Fácil foi criado para ser simples e direto. Você monta seu
                currículo sem cadastro obrigatório, visualiza em tempo real e baixa em
                PDF. As informações preenchidas são usadas apenas para gerar o currículo.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Sem cadastro obrigatório",
                  "PDF sem marca d'água",
                  "Dados usados apenas para montar o currículo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span
                      className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#0D948820" }}
                    >
                      <CheckCircle className="h-3 w-3 text-teal-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════════════ */}
      <section id="dicas" className="py-20 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.18em]">
              Dúvidas frequentes
            </span>
            <h2
              className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight"
              style={{ color: "#0F2744" }}
            >
              Tudo que você precisa saber
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Respostas rápidas para não perder tempo e criar um currículo que funciona.
            </p>
          </div>

          <div className="space-y-2.5 mb-14">
            {TIPS.map((tip, i) => {
              const open = activeTip === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    boxShadow: open
                      ? "0 4px 24px rgba(15,39,68,0.10), 0 0 0 1.5px rgba(13,148,136,0.25)"
                      : "0 1px 8px rgba(15,39,68,0.06), 0 0 0 1px rgba(15,39,68,0.04)",
                  }}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                    onClick={() => setActiveTip(open ? null : i)}
                  >
                    <span
                      className="font-semibold text-[15px] pr-4 leading-snug"
                      style={{ color: open ? "#0D9488" : "#0F2744" }}
                    >
                      {tip.q}
                    </span>
                    <span
                      className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        backgroundColor: open ? "#0D948815" : "#f1f5f9",
                        border: open ? "1px solid #0D948840" : "1px solid #e2e8f0",
                      }}
                    >
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200"
                        style={{
                          color: open ? "#0D9488" : "#94a3b8",
                          transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </button>

                  {/* CSS Grid accordion */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: open ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.25s ease",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 pt-0">
                        <div className="h-px bg-gray-100 mb-4" />
                        <p className="text-gray-600 text-[15px] leading-relaxed">{tip.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="btn-cta rounded-2xl font-bold"
              style={{ height: "52px", padding: "0 2rem", boxShadow: "0 4px 16px rgba(13,148,136,0.3)" }}
            >
              <Link to="/criar" className="flex items-center gap-2">
                Criar meu currículo grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-3 text-sm text-gray-500">Grátis · Sem cadastro · Seus dados ficam no seu dispositivo</p>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#0a1828" }}>
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #0D9488, transparent)" }} />

        <div className="container mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 mb-10">

            {/* Brand */}
            <div className="min-w-0">
              <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold text-white text-lg mb-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0D9488" }}>
                  <FileText style={{ height: "18px", width: "18px", color: "white" }} />
                </div>
                Currículo Fácil
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                A ferramenta simples e gratuita para criar um currículo profissional em poucos minutos.
              </p>
              <p className="mt-4 text-sm font-semibold text-teal-300">
                curriculos.fun
              </p>
            </div>

            {/* Product */}
            <div className="min-w-0">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Produto</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Modelos de currículo", to: "/modelos" },
                  { label: "Como funciona", to: "/#como-funciona" },
                  { label: "Depoimentos", to: "/#depoimentos" },
                  { label: "Dicas de carreira", to: "/#dicas" },
                  { label: "Criar currículo", to: "/criar" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal and support */}
            <div className="min-w-0">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal e Suporte</h4>
              <ul className="space-y-2.5 break-words">
                <li>
                  <Link to="/termos-de-uso" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Ajuda
                  </Link>
                </li>
                <li className="pt-2 text-sm text-gray-400">
                  Responsável: Jose Aparecido da Silva
                </li>
                <li>
                  <a
                    href="mailto:silva.js.js1000@gmail.com"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    E-mail: silva.js.js1000@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5569981336994"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    WhatsApp: (69) 98133-6994
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/joseap096"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    Instagram: @joseap096
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs text-gray-500">
              © 2026 Currículo Fácil · curriculos.fun · Todos os direitos reservados
            </p>
            <p className="text-xs text-gray-500">
              Feito para ajudar pessoas a criarem currículos melhores e conquistarem novas oportunidades.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
