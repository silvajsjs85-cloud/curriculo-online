import { useEffect, useState } from "react";
import { ArrowRight, Lock, Sparkles, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/ResumePreview";
import { UpgradeModal } from "@/components/UpgradeModal";
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
  experiences: [{ id: "1", position: "Analista de Marketing", company: "Empresa X", startDate: "Jan 2021", endDate: "", current: true, description: "Gestão de campanhas digitais." }],
  education: [{ id: "1", degree: "Bacharelado", field: "Administração", institution: "Universidade Y", startDate: "2015", endDate: "2019", current: false }],
  skills: [{ id: "1", name: "Marketing Digital", level: "Avançado" }],
  languages: [{ id: "1", name: "Inglês", level: "Intermediário" }],
};

const TEMPLATES = [
  { name: "Moderno", layout: "modern" as const, accent: "#0D9488", desc: "Design contemporâneo ideal para tech e marketing.", tag: "Popular" },
  { name: "Clássico", layout: "classic" as const, accent: "#0F2744", desc: "Tradicional e elegante para áreas corporativas.", tag: "ATS" },
  { name: "Minimalista", layout: "minimal" as const, accent: "#475569", desc: "Foco total no conteúdo e objetividade.", tag: "ATS" },
  { name: "Executivo", layout: "executive" as const, accent: "#0D9488", desc: "Layout sofisticado para cargos de liderança.", tag: "Premium" },
  { name: "Criativo", layout: "creative" as const, accent: "#7F77DD", desc: "Sidebar colorida e tipografia moderna.", tag: "Novo" },
  { name: "Técnico", layout: "technical" as const, accent: "#378ADD", desc: "Visual inspirado em editores de código.", tag: "Dev" },
  { name: "Internacional", layout: "international" as const, accent: "#185FA5", desc: "Padrão sem foto para vagas no exterior.", tag: "Global" },
  { name: "Compacto", layout: "compact" as const, accent: "#000000", desc: "Máximo de informações em uma página.", tag: "Sênior" },
];

export default function Models() {
  const { subscribed, paymentUrl } = useSubscription();
  const navigate = useNavigate();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [lockedName, setLockedName] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = "Modelos de Currículo | Currículo Fácil";
  }, []);

  function handleUseTemplate(layout: string, name: string) {
    if (isPremiumTemplate(layout) && !subscribed) {
      setLockedName(name);
      setUpgradeOpen(true);
      return;
    }
    navigate(`/criar?template=${layout}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-fade-up">
          <div className="section-label mx-auto">
            <Layout className="h-3.5 w-3.5" />
            Galeria de Templates
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0F2744] mb-6 tracking-tight">
            Escolha o modelo <br />
            <span className="text-[#0D9488]">ideal</span> para você
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
            Designs testados e aprovados para passar em sistemas ATS e impressionar humanos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATES.map((t) => {
            const isPremium = isPremiumTemplate(t.layout);
            const canUse = !isPremium || subscribed;

            return (
              <div key={t.name} className="template-card bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:border-[#0D9488]/30 animate-fade-up">
                <div className="template-preview-container bg-slate-50 relative h-64 overflow-hidden">
                  <div className="scale-[0.4] origin-top transform translate-x-[15%] pt-8">
                    <ResumePreview data={DEMO_DATA} template={t.layout} />
                  </div>
                  {!canUse && (
                    <div className="absolute inset-0 bg-[#0F2744]/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-2xl">
                         <Lock className="h-6 w-6 text-[#0F2744]" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                     <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${t.tag === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-teal-50 text-[#0D9488]'}`}>
                       {t.tag}
                     </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-bold text-xl text-[#0F2744] mb-2">{t.name}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mb-8 flex-1">
                    {t.desc}
                  </p>
                  
                  {canUse ? (
                    <Button
                      onClick={() => handleUseTemplate(t.layout, t.name)}
                      className="w-full h-12 rounded-full bg-[#0D9488] hover:bg-[#0f766e] font-bold text-sm shadow-lg shadow-teal-500/10 group/btn"
                    >
                      Usar este modelo
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUseTemplate(t.layout, t.name)}
                      className="w-full h-12 rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-sm shadow-lg shadow-amber-500/10"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Desbloquear Premium
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <UpgradeModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        templateName={lockedName}
        paymentUrl={paymentUrl}
      />
    </main>
  );
}
