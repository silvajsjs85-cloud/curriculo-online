import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Download, Star, Eye, CheckCircle,
  ArrowRight, User, MousePointer, Sparkles, Plus, Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Mini document card ───────────────────────────────────────────────────────
function TemplateCard({
  name,
  color,
  tag,
}: {
  name: string;
  color: string;
  tag?: string;
}) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      {tag && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              tag === "Popular"
                ? "bg-teal-100 text-teal-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {tag}
          </span>
        </div>
      )}
      <div className="p-5 h-56 flex flex-col gap-2 bg-white">
        <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: color }} />
        <div className="h-3 w-2/3 rounded bg-gray-800 mb-1" />
        <div className="flex gap-2 mb-3">
          <div className="h-2 w-20 rounded bg-gray-300" />
          <div className="h-2 w-14 rounded bg-gray-300" />
        </div>
        <div className="h-2 w-16 rounded mb-1" style={{ backgroundColor: color }} />
        <div className="space-y-1 mb-3">
          <div className="h-1.5 w-full rounded bg-gray-100" />
          <div className="h-1.5 w-5/6 rounded bg-gray-100" />
          <div className="h-1.5 w-4/6 rounded bg-gray-100" />
        </div>
        <div className="h-2 w-20 rounded mb-1" style={{ backgroundColor: color }} />
        <div className="space-y-1 mb-3">
          <div className="h-1.5 w-full rounded bg-gray-100" />
          <div className="h-1.5 w-3/4 rounded bg-gray-100" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {[12, 14, 10].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded"
              style={{ width: `${w * 4}px`, backgroundColor: `${color}33` }}
            />
          ))}
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{name}</span>
        <span className="text-xs font-semibold text-teal-600 group-hover:underline">
          Usar →
        </span>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEMPLATES = [
  { name: "Moderno", color: "#2563eb", tag: "Popular" },
  { name: "Clássico", color: "#92400e" },
  { name: "Minimalista", color: "#374151" },
  { name: "Executivo", color: "#0F766E", tag: "Novo" },
];

const STEPS = [
  {
    icon: <MousePointer className="h-5 w-5" />,
    step: "01",
    title: "Escolha um modelo",
    desc: "Selecione o template que combina com você e com a vaga desejada.",
  },
  {
    icon: <User className="h-5 w-5" />,
    step: "02",
    title: "Preencha seus dados",
    desc: "Informe experiências, formação, habilidades e idiomas de forma simples.",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    step: "03",
    title: "Veja o resultado",
    desc: "O preview atualiza em tempo real enquanto você edita. O que vê é o que baixa.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    step: "04",
    title: "Baixe em PDF",
    desc: "Exporte em PDF de alta qualidade, pronto para enviar a recrutadores.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana Carvalho",
    role: "Analista de Marketing",
    text: "Criei meu currículo em menos de 15 minutos. O resultado ficou tão profissional que recebi elogios dos próprios recrutadores!",
    avatar: "AC",
    company: "Contratada na Magazord",
  },
  {
    name: "Lucas Mendes",
    role: "Desenvolvedor Júnior",
    text: "Fácil de usar e visual impecável. Consegui meu primeiro emprego na área de TI logo depois de atualizar meu currículo aqui.",
    avatar: "LM",
    company: "Contratado na Stefanini",
  },
  {
    name: "Fernanda Oliveira",
    role: "Assistente Administrativo",
    text: "Nunca imaginei que fazer um currículo seria tão simples. O template clássico me deu exatamente o visual formal que eu precisava.",
    avatar: "FO",
    company: "Contratada na Unimed",
  },
];

const TIPS = [
  {
    q: "Quantas páginas deve ter meu currículo?",
    a: "Para profissionais com até 10 anos de experiência, uma página é o ideal. Seja objetivo e destaque apenas o mais relevante para a vaga.",
  },
  {
    q: "Devo incluir foto no currículo?",
    a: "No Brasil, incluir foto é opcional, mas pode ser positivo para cargos que envolvem atendimento ao público. Opte por foto profissional e fundo neutro.",
  },
  {
    q: "Como listar habilidades de forma eficaz?",
    a: "Priorize habilidades técnicas exigidas pela vaga. Evite listas genéricas e use termos específicos do setor em que está se candidatando.",
  },
  {
    q: "Qual o melhor formato para enviar o currículo?",
    a: "PDF é o formato mais indicado — mantém a formatação intacta em qualquer dispositivo e demonstra atenção ao detalhe.",
  },
];

const COMPANIES = ["Nubank", "iFood", "Mercado Livre", "Loft", "Gympass", "Totvs"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  const [activeTip, setActiveTip] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F6F3" }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="px-4 pt-16 pb-24" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-7">
                <Sparkles className="h-3.5 w-3.5" />
                100% gratuito · Sem limite de downloads
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
                style={{ color: "#0F2744" }}
              >
                Seu currículo<br />
                <span style={{ color: "#0D9488" }}>profissional</span><br />
                em minutos
              </h1>

              <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
                Crie, personalize e baixe seu currículo com modelos modernos,
                preview em tempo real e exportação em PDF de alta qualidade.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Modelos validados por recrutadores",
                  "Preview instantâneo enquanto você digita",
                  "Download em PDF sem marca d'água",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-teal-600" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  asChild
                  className="text-base px-8 rounded-2xl h-12 shadow-md font-semibold"
                  style={{ backgroundColor: "#0D9488", color: "white" }}
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
                  className="text-base px-8 rounded-2xl h-12 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <a href="#modelos">Ver modelos</a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Sem cadastro obrigatório · Seus dados ficam no seu dispositivo
              </p>
            </div>

            {/* Browser mockup */}
            <div className="hidden lg:block animate-slide-up">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                {/* Chrome bar */}
                <div className="bg-gray-100 border-b px-4 py-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono border">
                    curriculos.fun/editor
                  </span>
                </div>
                {/* Editor layout */}
                <div className="flex h-72">
                  {/* Form panel */}
                  <div className="w-2/5 border-r bg-gray-50 p-4 space-y-3">
                    <div className="flex gap-1 mb-3 flex-wrap">
                      {["Pessoal", "Exp.", "Form.", "Hab."].map((t, i) => (
                        <span
                          key={t}
                          className={`text-xs px-2 py-1 rounded-lg font-medium ${
                            i === 0 ? "text-white" : "bg-gray-200 text-gray-500"
                          }`}
                          style={i === 0 ? { backgroundColor: "#0D9488" } : {}}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {[
                      ["Nome", "Ana Carvalho"],
                      ["E-mail", "ana@email.com"],
                      ["Telefone", "(11) 98765-4321"],
                      ["Cidade", "São Paulo, SP"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                        <div className="bg-white border rounded-lg px-2 py-1.5 text-xs text-gray-600 shadow-sm">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Preview panel */}
                  <div className="flex-1 p-5 bg-white overflow-hidden">
                    <div
                      className="flex items-center justify-between pb-2 mb-3"
                      style={{ borderBottom: "2px solid #2563eb" }}
                    >
                      <div>
                        <div className="h-3 w-28 rounded mb-1.5" style={{ backgroundColor: "#0F2744" }} />
                        <div className="flex gap-2">
                          <div className="h-2 w-16 rounded bg-gray-300" />
                          <div className="h-2 w-12 rounded bg-gray-300" />
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-200 to-blue-200" />
                    </div>
                    <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                    <div className="space-y-1 mb-3">
                      <div className="h-1.5 w-full rounded bg-gray-100" />
                      <div className="h-1.5 w-5/6 rounded bg-gray-100" />
                      <div className="h-1.5 w-4/6 rounded bg-gray-100" />
                    </div>
                    <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                    <div className="space-y-1 mb-3">
                      <div className="h-1.5 w-full rounded bg-gray-100" />
                      <div className="h-1.5 w-3/4 rounded bg-gray-100" />
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {["React", "Node.js", "SQL"].map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Status bar */}
                <div className="bg-gray-50 border-t px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">✓ Salvo automaticamente</span>
                  <span
                    className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    Baixar PDF
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF ════════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-6">
            Usuários contratados em empresas como
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {COMPANIES.map((c) => (
              <span
                key={c}
                className="text-gray-400 font-bold text-base tracking-tight select-none"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEMPLATES ═══════════════════════════════════════════════════════════ */}
      <section id="modelos" className="py-24 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">
              Modelos Prontos
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4"
              style={{ color: "#0F2744" }}
            >
              Escolha o seu estilo ideal
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Todos os modelos são validados por especialistas em recrutamento e
              otimizados para sistemas ATS.
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
              className="rounded-2xl border-gray-300 text-gray-600 hover:bg-gray-100 px-8 h-11"
            >
              <Link to="/dashboard">Ver todos os modelos →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA ═══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">
              Simples assim
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4"
              style={{ color: "#0F2744" }}
            >
              Como funciona?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Seu currículo profissional em 4 passos. Sem complicação, sem cadastro obrigatório.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-gray-100 leading-none">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#0F2744" }}>
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DESTAQUE / FEATURE BLOCK ════════════════════════════════════════════ */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div
            className="rounded-3xl overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ backgroundColor: "#0F2744" }}
          >
            {/* Text */}
            <div className="p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="h-3 w-3" /> Diferencial exclusivo
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
                Currículo otimizado para<br />
                <span style={{ color: "#2DD4BF" }}>aprovação por ATS</span>
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                Nossos modelos são estruturados para passar pelos sistemas de triagem
                automática das grandes empresas — garantindo que seu currículo chega
                até o recrutador humano.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Formato reconhecido por sistemas ATS",
                  "Palavras-chave estratégicas por área",
                  "Layout limpo e profissional",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="h-5 w-5 rounded-full bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-teal-400" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                asChild
                className="rounded-2xl h-12 px-8 font-semibold shadow-lg"
                style={{ backgroundColor: "#0D9488", color: "white" }}
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  Experimentar agora
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Document mockup */}
            <div className="hidden lg:flex items-end justify-center px-10 pt-10" style={{ minHeight: "340px" }}>
              <div className="w-full max-w-xs bg-white rounded-t-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: "2px solid #2563eb" }}>
                    <div>
                      <div className="h-3 w-28 rounded mb-1.5" style={{ backgroundColor: "#0F2744" }} />
                      <div className="flex gap-2">
                        <div className="h-2 w-16 rounded bg-gray-300" />
                        <div className="h-2 w-12 rounded bg-gray-300" />
                      </div>
                    </div>
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-teal-200 to-blue-200" />
                  </div>
                  <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                  <div className="space-y-1 mb-4">
                    {[100, 85, 70].map((w, i) => (
                      <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                  <div className="h-2 w-24 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                  <div className="space-y-1 mb-4">
                    {[100, 78].map((w, i) => (
                      <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                  <div className="h-2 w-16 rounded mb-2" style={{ backgroundColor: "#2563eb" }} />
                  <div className="flex gap-1 flex-wrap">
                    {["React", "TypeScript", "Node"].map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="px-6 py-3 flex items-center justify-between"
                  style={{ backgroundColor: "#0F2744" }}
                >
                  <span className="text-xs text-white/50">curriculos.fun</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEPOIMENTOS ═════════════════════════════════════════════════════════ */}
      <section id="depoimentos" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">
              Depoimentos
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4"
              style={{ color: "#0F2744" }}
            >
              O que dizem nossos usuários
            </h2>
            <p className="text-gray-500">
              Histórias reais de pessoas que conseguiram o emprego dos sonhos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#0F2744" }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                    <div className="text-xs font-medium text-teal-600">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DICAS / FAQ ═════════════════════════════════════════════════════════ */}
      <section id="dicas" className="py-24 px-4" style={{ backgroundColor: "#F7F6F3" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">
              Dicas de carreira
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4"
              style={{ color: "#0F2744" }}
            >
              Perguntas frequentes
            </h2>
            <p className="text-gray-500">
              Tudo que você precisa saber para criar um currículo que converte.
            </p>
          </div>

          <div className="space-y-3 mb-14">
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTip(activeTip === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: "#0F2744" }}>
                    {tip.q}
                  </span>
                  <span className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border border-gray-200 bg-white">
                    {activeTip === i ? (
                      <Minus className="h-3.5 w-3.5 text-teal-600" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </span>
                </button>
                {activeTip === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{tip.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="rounded-2xl h-12 px-8 shadow-md font-semibold"
              style={{ backgroundColor: "#0D9488", color: "white" }}
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Criar meu currículo agora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-gray-400">Grátis, sem cadastro obrigatório</p>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-4" style={{ backgroundColor: "#0F2744" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-bold text-lg flex-shrink-0"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#0D9488" }}
              >
                <FileText className="h-4 w-4 text-white" />
              </div>
              Currículo Fácil
            </Link>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Modelos", href: "#modelos" },
                { label: "Como funciona", href: "#como-funciona" },
                { label: "Depoimentos", href: "#depoimentos" },
                { label: "Termos de Uso", href: "#" },
                { label: "Privacidade", href: "#" },
                { label: "Ajuda", href: "#" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <p className="text-xs text-gray-500 flex-shrink-0">
              © 2026 Currículo Fácil · curriculos.fun
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
