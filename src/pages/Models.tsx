import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/ResumePreview";
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

const TEMPLATES = [
  {
    name: "Moderno",
    layout: "modern" as const,
    accent: "#0D9488",
    description:
      "Design contemporâneo com destaque para habilidades e experiências. Ideal para tecnologia, marketing e áreas criativas.",
    badges: ["Popular", "ATS"],
  },
  {
    name: "Clássico",
    layout: "classic" as const,
    accent: "#0F2744",
    description:
      "Layout tradicional e elegante, aceito em qualquer setor. Perfeito para vagas em empresas conservadoras e cargos administrativos.",
    badges: ["ATS", "Profissional"],
  },
  {
    name: "Minimalista",
    layout: "minimal" as const,
    accent: "#475569",
    description:
      "Estrutura limpa e objetiva, sem distrações. Ótimo para quem quer que o conteúdo fale por si.",
    badges: ["ATS"],
  },
  {
    name: "Executivo",
    layout: "executive" as const,
    accent: "#0D9488",
    description:
      "Apresentação sofisticada com destaque para liderança e resultados. Ideal para cargos seniores e posições de gestão.",
    badges: ["Novo", "Profissional"],
  },
  {
    name: "Criativo",
    layout: "creative" as const,
    accent: "#7F77DD",
    description:
      "Sidebar colorida e tipografia moderna. Perfeito para designers, criadores de conteúdo e profissionais de comunicação.",
    badges: ["Novo", "Design"],
  },
  {
    name: "Técnico",
    layout: "technical" as const,
    accent: "#378ADD",
    description:
      "Visual inspirado em editores de código (duas colunas, fonte mono). Direcionado para engenheiros de software e analistas de TI.",
    badges: ["Dev", "ATS"],
  },
  {
    name: "Primeiro Emprego",
    layout: "first_job" as const,
    accent: "#1D9E75",
    description:
      "Foco na formação acadêmica e atividades extracurriculares. Ideal para jovens aprendizes, estagiários e recém-formados.",
    badges: ["Estágio"],
  },
  {
    name: "Internacional",
    layout: "international" as const,
    accent: "#185FA5",
    description:
      "Padrão sem foto com estrutura em linhas similar ao Europass. Feito sob medida para vagas no exterior e multinacionais.",
    badges: ["Global", "ATS"],
  },
  {
    name: "Institucional",
    layout: "institutional" as const,
    accent: "#0F6E56",
    description:
      "Aparência formal de documento oficial, com fonte serifada e campo de registro. Recomendado para saúde, área pública e docentes.",
    badges: ["Formal"],
  },
  {
    name: "Compacto",
    layout: "compact" as const,
    accent: "#000000",
    description:
      "Fontes menores e espaços condensados para encaixar dezenas de informações em apenas uma página. Ideal para profissionais sêniores.",
    badges: ["Sênior"],
  },
];

const BADGE_STYLES: Record<string, string> = {
  Popular: "bg-teal-500 text-white",
  Novo: "bg-amber-400 text-amber-900",
  ATS: "bg-blue-50 text-blue-700 border border-blue-100",
  Profissional: "bg-slate-100 text-slate-700",
};

export default function Models() {
  useEffect(() => {
    document.title = "Modelos de Currículo | Currículo Fácil";
  }, []);

  return (
    <main
      className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:py-16"
      style={{ backgroundColor: "#F7F6F3" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.18em]">
            Templates Profissionais
          </span>
          <h1
            className="text-3xl sm:text-[2.6rem] font-extrabold mt-3 mb-4 tracking-tight"
            style={{ color: "#0F2744" }}
          >
            Modelos de currículo
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Escolha um modelo profissional e comece a criar seu currículo em
            poucos minutos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEMPLATES.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl overflow-hidden flex flex-col"
              style={{
                boxShadow:
                  "0 2px 16px rgba(15,39,68,0.08), 0 1px 4px rgba(15,39,68,0.04)",
                border: "1px solid rgba(15,39,68,0.08)",
              }}
            >
              {/* Preview */}
              <div
                className="relative overflow-hidden"
                style={{ height: "260px" }}
              >
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
                  }}
                >
                  <ResumePreview data={DEMO_DATA} template={t.layout} />
                </div>

                {/* Bottom gradient fade */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background:
                      "linear-gradient(to bottom, transparent, white)",
                    pointerEvents: "none",
                  }}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex gap-1 flex-wrap">
                  {t.badges.map((b) => (
                    <span
                      key={b}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        BADGE_STYLES[b] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div
                className="p-4 flex flex-col gap-3 flex-1"
                style={{ borderTop: "1px solid rgba(15,39,68,0.07)" }}
              >
                <div>
                  <h3
                    className="font-extrabold text-base"
                    style={{ color: "#0F2744" }}
                  >
                    {t.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="btn-cta w-full rounded-xl font-semibold text-sm h-9"
                  >
                    <Link
                      to={`/criar?template=${t.layout}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Usar este modelo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Grátis · Sem cadastro · Seus dados ficam no seu dispositivo
        </p>
      </div>
    </main>
  );
}
