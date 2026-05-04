import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Download, Star, Eye, CheckCircle,
  ArrowRight, User, MousePointer, Sparkles, ChevronDown,
  Users, TrendingUp, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Template card ────────────────────────────────────────────────────────────
function TemplateCard({
  name,
  accent,
  tag,
  layout = "default",
}: {
  name: string;
  accent: string;
  tag?: string;
  layout?: "default" | "sidebar";
}) {
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{
        boxShadow: "0 4px 24px rgba(15,39,68,0.08), 0 1px 4px rgba(15,39,68,0.04)",
      }}
    >
      {tag && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${
              tag === "Popular"
                ? "bg-teal-50 text-teal-700 border border-teal-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}
          >
            {tag}
          </span>
        </div>
      )}

      {/* Accent strip */}
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />

      {/* Document body */}
      <div className="p-5 flex flex-col" style={{ minHeight: "12.5rem" }}>
        {layout === "sidebar" ? (
          <div className="flex gap-3 h-full">
            <div className="w-1/3 flex flex-col gap-2 pr-2" style={{ borderRight: `2px solid ${accent}22` }}>
              <div className="h-8 w-8 rounded-full self-center mb-1" style={{ background: `linear-gradient(135deg, ${accent}33, ${accent}55)` }} />
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: accent }} />
              <div className="h-1 w-5/6 rounded bg-gray-200" />
              <div className="h-1 w-4/6 rounded bg-gray-200" />
              <div className="mt-2 h-1.5 w-full rounded" style={{ backgroundColor: `${accent}66` }} />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-5/6 rounded bg-gray-100" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-2.5 w-4/5 rounded" style={{ backgroundColor: "#1e293b" }} />
              <div className="h-1.5 w-3/5 rounded bg-gray-300 mb-2" />
              <div className="h-1.5 w-full rounded bg-gray-100" />
              <div className="h-1.5 w-5/6 rounded bg-gray-100" />
              <div className="h-1.5 w-3/4 rounded bg-gray-100" />
              <div className="mt-2 h-1.5 w-2/3 rounded" style={{ backgroundColor: `${accent}88` }} />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-4/5 rounded bg-gray-100" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="h-2.5 w-28 rounded mb-1.5" style={{ backgroundColor: "#1e293b" }} />
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-16 rounded bg-gray-300" />
                  <div className="h-1.5 w-12 rounded bg-gray-300" />
                </div>
              </div>
              <div
                className="h-9 w-9 rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${accent}44, ${accent}88)` }}
              />
            </div>
            <div className="h-px mb-3" style={{ backgroundColor: `${accent}44` }} />
            <div className="h-1.5 w-20 rounded mb-1.5" style={{ backgroundColor: accent }} />
            <div className="space-y-1 mb-3">
              <div className="h-1.5 w-full rounded bg-gray-100" />
              <div className="h-1.5 w-5/6 rounded bg-gray-100" />
              <div className="h-1.5 w-4/6 rounded bg-gray-100" />
            </div>
            <div className="h-1.5 w-24 rounded mb-1.5" style={{ backgroundColor: accent }} />
            <div className="space-y-1 mb-3">
              <div className="h-1.5 w-full rounded bg-gray-100" />
              <div className="h-1.5 w-3/4 rounded bg-gray-100" />
            </div>
            <div className="flex gap-1 flex-wrap mt-auto">
              {[48, 52, 40].map((w, i) => (
                <div key={i} className="h-4 rounded-full" style={{ width: w, backgroundColor: `${accent}1a`, border: `1px solid ${accent}33` }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3.5 flex items-center justify-between border-t"
        style={{ backgroundColor: "#fafafa", borderColor: "#f1f1f1" }}
      >
        <span className="text-base font-bold" style={{ color: "#0F2744" }}>
          {name}
        </span>
        <span
          className="text-sm font-bold flex items-center gap-1.5 transition-opacity group-hover:opacity-100 opacity-70"
          style={{ color: accent }}
        >
          Usar <ArrowRight className="h-3.5 w-3.5" />
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
  { name: "Moderno",     accent: "#2563eb", tag: "Popular", layout: "default" as const },
  { name: "Clássico",    accent: "#7c3aed", tag: undefined,  layout: "default" as const },
  { name: "Minimalista", accent: "#475569", tag: undefined,  layout: "sidebar" as const },
  { name: "Executivo",   accent: "#0F766E", tag: "Novo",     layout: "default" as const },
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
    text: "Fiz em 20 minutos e já fui chamada para entrevista dois dias depois. A qualidade do PDF impressionou até o próprio RH.",
    initials: "AC",
    avatarColor: "#0D9488",
    company: "Contratada na Magazord",
  },
  {
    name: "Lucas Mendes",
    role: "Desenvolvedor Júnior",
    text: "Eu mandava currículo e não recebia nem resposta. Depois de usar esse template, tive 3 chamadas em uma semana.",
    initials: "LM",
    avatarColor: "#2563eb",
    company: "Contratado na Stefanini",
  },
  {
    name: "Fernanda Oliveira",
    role: "Assistente Administrativo",
    text: "Usei o modelo clássico, mandei para 5 vagas e já tenho 2 entrevistas marcadas. Simples, rápido e sem precisar criar conta.",
    initials: "FO",
    avatarColor: "#7c3aed",
    company: "Contratada na Unimed",
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  const [activeTip, setActiveTip] = useState<number | null>(null);

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

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-[420px]">
                Monte um currículo profissional em minutos — sem cadastro obrigatório.
                Edite, visualize ao vivo e baixe em PDF direto no navegador.
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

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  asChild
                  className="btn-cta text-base px-8 rounded-2xl font-bold"
                  style={{ height: "52px", boxShadow: "0 4px 16px rgba(13,148,136,0.35)" }}
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Criar meu currículo grátis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-base px-8 rounded-2xl border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 font-medium transition-all duration-200"
                  style={{ height: "52px" }}
                >
                  <a href="#modelos">Ver modelos</a>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                <StatPill icon={<Users className="h-4 w-4" />} value="5.200+" label="currículos criados" />
                <StatPill icon={<Star className="h-4 w-4 fill-current" />} value="4.8★" label="avaliação" />
                <StatPill icon={<TrendingUp className="h-4 w-4" />} value="100%" label="gratuito" />
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
                  <div className="w-[42%] border-r border-gray-100 bg-gray-50 p-4 flex flex-col gap-2.5">
                    <div className="flex gap-1 mb-1 flex-wrap">
                      {["Pessoal", "Exp.", "Form.", "Hab."].map((t, i) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-1 rounded-lg font-semibold"
                          style={
                            i === 0
                              ? { backgroundColor: "#0D9488", color: "white" }
                              : { backgroundColor: "#e5e7eb", color: "#6b7280" }
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {[
                      ["Nome completo", "Ana Carvalho"],
                      ["E-mail", "ana@email.com"],
                      ["Telefone", "(11) 98765-4321"],
                      ["Cidade", "São Paulo, SP"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div className="text-[10px] text-gray-500 mb-0.5 font-semibold">{label}</div>
                        <div className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-700 shadow-sm">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preview panel */}
                  <div className="flex-1 bg-white p-5 overflow-hidden">
                    <div
                      className="flex items-center justify-between pb-2.5 mb-3"
                      style={{ borderBottom: "2px solid #2563eb" }}
                    >
                      <div>
                        <div className="h-3 w-32 rounded mb-1.5" style={{ backgroundColor: "#0F2744" }} />
                        <div className="flex gap-1.5">
                          <div className="h-1.5 w-16 rounded bg-gray-300" />
                          <div className="h-1.5 w-12 rounded bg-gray-300" />
                        </div>
                      </div>
                      <div
                        className="h-11 w-11 rounded-full flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #99f6e4, #bfdbfe)" }}
                      />
                    </div>
                    {[{ lines: [100, 88, 72] }, { lines: [100, 78] }].map((sec, si) => (
                      <div key={si} className="mb-3">
                        <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                        <div className="space-y-1">
                          {sec.lines.map((w, li) => (
                            <div key={li} className="h-1.5 rounded bg-gray-100" style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-1 flex-wrap">
                      {["React", "Node.js", "SQL"].map((s) => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TEMPLATES.map((t) => (
              <Link to="/dashboard" key={t.name}>
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
              <Link to="/dashboard" className="flex items-center gap-2">
                Ver todos os modelos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA ═══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-20 px-4 bg-white">
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
                <Link to="/dashboard" className="flex items-center gap-2">
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
      <section id="depoimentos" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.18em]">
              Quem já usou aprovou
            </span>
            <h2
              className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight"
              style={{ color: "#0F2744" }}
            >
              Resultados que falam por si
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
              Veja o que dizem quem já criou o currículo e conseguiu a vaga.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 bg-white flex flex-col relative overflow-hidden hover:-translate-y-1 transition-all duration-200"
                style={{
                  boxShadow: "0 2px 20px rgba(15,39,68,0.08), 0 0 0 1px rgba(15,39,68,0.05)",
                }}
              >
                {/* Quote watermark */}
                <div
                  className="absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{ color: `${t.avatarColor}12`, fontFamily: "Georgia, serif" }}
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
                <p className="text-gray-700 text-[15px] leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="h-px bg-gray-100 mb-4" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div
                      className="h-11 w-11 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                      style={{ backgroundColor: t.avatarColor }}
                    >
                      {t.initials}
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-white flex items-center justify-center"
                      style={{ boxShadow: "0 0 0 1px #e5e7eb" }}
                    >
                      <CheckCircle className="h-3 w-3" style={{ color: t.avatarColor }} />
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight" style={{ color: "#0F2744" }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: t.avatarColor }}>
                      {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              <Link to="/dashboard" className="flex items-center gap-2">
                Criar meu currículo agora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-3 text-sm text-gray-500">Grátis · Sem cadastro · Seus dados ficam só no seu dispositivo</p>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#0a1828" }}>
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #0D9488, transparent)" }} />

        <div className="container mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold text-white text-lg mb-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0D9488" }}>
                  <FileText style={{ height: "18px", width: "18px", color: "white" }} />
                </div>
                Currículo Fácil
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                A ferramenta mais direta para criar um currículo profissional
                e conquistar a próxima oportunidade — sem complicação.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Produto</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Modelos de currículo", href: "#modelos" },
                  { label: "Como funciona", href: "#como-funciona" },
                  { label: "Depoimentos", href: "#depoimentos" },
                  { label: "Dicas de carreira", href: "#dicas" },
                  { label: "Criar currículo", href: "/dashboard" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Termos de Uso", href: "#" },
                  { label: "Política de Privacidade", href: "#" },
                  { label: "Contato", href: "#" },
                  { label: "Ajuda", href: "#" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                      {l.label}
                    </a>
                  </li>
                ))}
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
              Feito com dedicação para quem quer crescer na carreira 🇧🇷
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
