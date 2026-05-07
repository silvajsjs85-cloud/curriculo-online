import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Download,
  Eye,
  FileUp,
  Globe,
  GripVertical,
  GraduationCap,
  Languages,
  LayoutTemplate,
  Linkedin,
  Link as LinkIcon,
  Lock,
  Share2,
  Mail,
  MapPin,
  Maximize,
  Columns,
  Monitor,
  PanelLeft,
  Phone,
  Plus,
  Save,
  Sparkles,
  Trash2,
  User,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResumePreview } from "@/components/ResumePreview";
import { UpgradeModal } from "@/components/UpgradeModal";
import { getResume, saveResume } from "@/lib/storage";
import { publishResume } from "@/lib/public-resume";
import { parseLinkedInPDF } from "@/lib/pdf-parser";
import { isPremiumTemplate, canUserUseTemplate } from "@/lib/templateAccess";
import { useSubscription } from "@/hooks/useSubscription";
import type { Resume, ResumeData, Experience, Education, Skill, Language, ResumeTemplate } from "@/types/resume";
import { defaultResumeData } from "@/types/resume";
import { DragDropContext, Droppable, Draggable, type DraggableProvidedDragHandleProps, type DropResult } from "@hello-pangea/dnd";

type StepId = "pessoal" | "experiencia" | "formacao" | "habilidades" | "idiomas";
type MobileView = "form" | "preview";
type PreviewZoom = "fit" | "75" | "100";

const STEPS: Array<{
  id: StepId;
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  tip: string;
  icon: LucideIcon;
}> = [
  {
    id: "pessoal",
    label: "Pessoal",
    shortLabel: "Pessoal",
    title: "Informações pessoais",
    subtitle: "Preencha seus dados principais para montar o cabeçalho do currículo.",
    tip: "Mantenha seus dados atualizados para facilitar o contato dos recrutadores.",
    icon: User,
  },
  {
    id: "experiencia",
    label: "Experiência",
    shortLabel: "Exp.",
    title: "Experiência profissional",
    subtitle: "Destaque cargos, empresas e resultados relevantes para a vaga.",
    tip: "Prefira descrições objetivas, com responsabilidades e conquistas mensuráveis.",
    icon: Briefcase,
  },
  {
    id: "formacao",
    label: "Formação",
    shortLabel: "Form.",
    title: "Formação acadêmica",
    subtitle: "Adicione cursos, instituições e períodos de estudo.",
    tip: "Inclua formações que reforcem sua aderência à oportunidade.",
    icon: GraduationCap,
  },
  {
    id: "habilidades",
    label: "Habilidades",
    shortLabel: "Hab.",
    title: "Habilidades",
    subtitle: "Liste competências técnicas e comportamentais importantes.",
    tip: "Use termos parecidos com os encontrados na descrição da vaga.",
    icon: Wrench,
  },
  {
    id: "idiomas",
    label: "Idiomas",
    shortLabel: "Idiomas",
    title: "Idiomas",
    subtitle: "Mostre os idiomas que você domina e o nível de proficiência.",
    tip: "Seja honesto no nível informado para evitar ruído nas entrevistas.",
    icon: Languages,
  },
];

const CONTROL_CLASS =
  "h-11 rounded-xl border-slate-200 bg-white text-[#0F2744] shadow-sm placeholder:text-slate-400 focus-visible:ring-teal-500 focus-visible:ring-offset-0";

const TEXTAREA_CLASS =
  "min-h-[120px] rounded-xl border-slate-200 bg-white text-[#0F2744] shadow-sm placeholder:text-slate-400 focus-visible:ring-teal-500 focus-visible:ring-offset-0";

const SELECT_TRIGGER_CLASS =
  "h-11 rounded-xl border-slate-200 bg-white text-[#0F2744] shadow-sm focus:ring-teal-500";

const PREVIEW_SCALE: Record<PreviewZoom, number> = {
  fit: 0.72,
  "75": 0.75,
  "100": 1,
};

const TEMPLATE_CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "profissionais", label: "Profissionais" },
  { id: "simples", label: "Simples" },
  { id: "criativos", label: "Criativos" },
  { id: "primeiro-emprego", label: "Primeiro emprego" },
];

const BUILDER_TEMPLATE_OPTIONS: Array<{
  id: ResumeTemplate;
  name: string;
  desc: string;
  accentClass: string;
  accentColor: string;
  category: string[];
  layout: "modern" | "classic" | "sidebar" | "compact";
}> = [
  { id: "modern", name: "Moderno", desc: "Design atual e dinâmico", accentClass: "bg-teal-500", accentColor: "#14b8a6", category: ["profissionais", "criativos"], layout: "modern" },
  { id: "classic", name: "Clássico", desc: "Tradicional e seguro", accentClass: "bg-slate-800", accentColor: "#1e293b", category: ["profissionais", "simples"], layout: "classic" },
  { id: "minimal", name: "Minimalista", desc: "Limpo e direto", accentClass: "bg-slate-400", accentColor: "#94a3b8", category: ["simples"], layout: "modern" },
  { id: "executive", name: "Executivo", desc: "Sóbrio e elegante", accentClass: "bg-blue-800", accentColor: "#1e40af", category: ["profissionais"], layout: "sidebar" },
  { id: "creative", name: "Criativo", desc: "Visual com personalidade", accentClass: "bg-violet-500", accentColor: "#8b5cf6", category: ["criativos"], layout: "modern" },
  { id: "technical", name: "Técnico", desc: "Focado em tecnologia", accentClass: "bg-sky-500", accentColor: "#0ea5e9", category: ["profissionais", "primeiro-emprego"], layout: "classic" },
  { id: "first_job", name: "Primeiro Emprego", desc: "Ideal para começar", accentClass: "bg-emerald-500", accentColor: "#10b981", category: ["primeiro-emprego", "simples"], layout: "modern" },
  { id: "international", name: "Internacional", desc: "Para vagas globais", accentClass: "bg-blue-600", accentColor: "#2563eb", category: ["profissionais"], layout: "classic" },
  { id: "institutional", name: "Institucional", desc: "Formal e oficial", accentClass: "bg-green-700", accentColor: "#15803d", category: ["profissionais", "simples"], layout: "sidebar" },
  { id: "compact", name: "Compacto", desc: "Mais informação em 1 página", accentClass: "bg-neutral-900", accentColor: "#171717", category: ["simples"], layout: "compact" },
];

function getPdfFileName(title: string) {
  const fileName = title.replace(/[<>:"/\\|?*]+/g, "").trim();
  return fileName || "curriculo";
}

export default function Builder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [resume, setResume] = useState<Resume>(() => {
    const found = id ? getResume(id) : null;
    if (found) {
      if (!found.data.languages) {
        found.data.languages = [];
      }
      return found;
    }
    return {
      id: id ?? crypto.randomUUID(),
      user_id: "local",
      title: "Novo Currículo",
      template: "modern",
      data: defaultResumeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  const [activeStep, setActiveStep] = useState<StepId>("pessoal");
  const [mobileView, setMobileView] = useState<MobileView>("form");
  const [viewMode, setViewMode] = useState<"default" | "split" | "fullscreen">("default");
  const [previewZoom, setPreviewZoom] = useState<PreviewZoom>("fit");
  const [autoSaved, setAutoSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateFilter, setTemplateFilter] = useState("todos");
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [lockedTemplateName, setLockedTemplateName] = useState<string | undefined>(undefined);
  const { subscribed, paymentUrl } = useSubscription();

  // ── Proteção de acesso por URL direta ──────────────────────
  // Se um usuário abrir /builder/:id com um currículo que usa template Premium
  // sem ter assinatura, o template é revertido para "modern" (gratuito).
  useEffect(() => {
    if (!isPremiumTemplate(resume.template)) return; // template gratuito, ok

    canUserUseTemplate(resume.template).then((result) => {
      if (!result.allowed) {
        // Reverter template para gratuito e mostrar modal de upgrade
        setResume((r) => ({ ...r, template: "modern" }));
        setLockedTemplateName(
          BUILDER_TEMPLATE_OPTIONS.find((t) => t.id === resume.template)?.name
        );
        setUpgradeModalOpen(true);
        toast.warning("Template Premium revertido", {
          description: "Assine o plano Premium para usar este modelo.",
        });
      }
    });
  // Executar apenas uma vez ao montar (não depender de `resume` para evitar loop)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isTipDismissed, setIsTipDismissed] = useState(() => localStorage.getItem("builderTipDismissed") === "true");
  
  const SUMMARY_PLACEHOLDERS = [
    "Profissional com 5 anos de experiência em marketing digital, especializado em growth e performance...",
    "Engenheiro de software com sólida experiência em React e Node.js, apaixonado por produtos escaláveis...",
    "Gestora de projetos certificada PMP com histórico comprovado de entregas no prazo e dentro do orçamento..."
  ];
  const [summaryPlaceholder, setSummaryPlaceholder] = useState(SUMMARY_PLACEHOLDERS[0]);

  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem("builderPanelWidth");
    return saved ? parseInt(saved, 10) : 340;
  });
  const photoInputRef = useRef<HTMLInputElement>(null);
  const linkedinInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem("builderPanelWidth", panelWidth.toString());
  }, [panelWidth]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveResume(resume);
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    }, 1500);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [resume]);

  const updateData = useCallback((patch: Partial<ResumeData>) => {
    setResume((r) => ({ ...r, data: { ...r.data, ...patch } }));
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const photo = ev.target?.result as string;
      updateData({ personalInfo: { ...resume.data.personalInfo, photo } });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveResume(resume);
    setAutoSaved(true);
    toast.success("Currículo salvo!");
  };

  const handleExportPDF = async () => {
    // ── Verificação de acesso Premium antes de exportar ────────
    const accessResult = await canUserUseTemplate(resume.template);
    if (!accessResult.allowed) {
      setLockedTemplateName(
        BUILDER_TEMPLATE_OPTIONS.find((t) => t.id === resume.template)?.name
      );
      setUpgradeModalOpen(true);
      toast.error("Este modelo é Premium. Faça upgrade para exportar o PDF.");
      return;
    }

    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const element = document.getElementById("resume-preview-export");
      if (!element) throw new Error("Preview do currículo não encontrado");
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${getPdfFileName(resume.title)}.pdf`);
      toast.success("PDF exportado!");
    } catch {
      toast.error("Erro ao exportar PDF");
    } finally {
      setExporting(false);
    }
  };

  const handlePublish = async () => {
    // ── Verificação de acesso Premium antes de publicar ────────
    const accessResult = await canUserUseTemplate(resume.template);
    if (!accessResult.allowed) {
      setLockedTemplateName(
        BUILDER_TEMPLATE_OPTIONS.find((t) => t.id === resume.template)?.name
      );
      setUpgradeModalOpen(true);
      toast.error("Este modelo é Premium. Faça upgrade para compartilhar.");
      return;
    }

    setPublishing(true);
    
    // Create a deterministic or random slug for this user/resume
    // For simplicity, we use the local resume ID or a short hash
    const slug = resume.id.substring(0, 12);

    try {
      const result = await publishResume(slug, resume.data, resume.template, resume.user_id);
      if (result.success && result.url) {
        const fullUrl = `${window.location.origin}${result.url}`;
        await navigator.clipboard.writeText(fullUrl);
        toast.success("Link copiado para a área de transferência!", {
          description: "Envie para recrutadores ou compartilhe no LinkedIn.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      const description =
        err instanceof Error ? err.message : "Verifique se o banco Supabase está online.";
      toast.error("Erro ao gerar link público.", { description });
    } finally {
      setPublishing(false);
    }
  };

  const handleLinkedInImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const importedData = await parseLinkedInPDF(file);
      setResume((r) => {
        // Mesclar dados importados sem sobrescrever foto/idiomas se não houver
        const merged: ResumeData = {
          ...r.data,
          personalInfo: {
            ...r.data.personalInfo,
            name: importedData.personalInfo?.name || r.data.personalInfo.name,
            email: importedData.personalInfo?.email || r.data.personalInfo.email,
          },
          experiences: importedData.experiences?.length ? importedData.experiences : r.data.experiences,
          education: importedData.education?.length ? importedData.education : r.data.education,
        };
        return { ...r, data: merged };
      });
      toast.success("Dados importados com sucesso!", {
        description: "Revise os campos, pois a extração pode conter erros."
      });
    } catch (err) {
      toast.error("Erro ao ler PDF", { description: "O arquivo pode estar corrompido ou num formato diferente."});
    } finally {
      setIsImporting(false);
      // Reset input
      if (linkedinInputRef.current) linkedinInputRef.current.value = "";
    }
  };

  const addExperience = () => {
    const exp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    updateData({ experiences: [...resume.data.experiences, exp] });
  };

  const updateExperience = (id: string, patch: Partial<Experience>) => {
    updateData({
      experiences: resume.data.experiences.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  };

  const removeExperience = (id: string) => {
    updateData({ experiences: resume.data.experiences.filter((e) => e.id !== id) });
  };

  const addEducation = () => {
    const edu: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    updateData({ education: [...resume.data.education, edu] });
  };

  const updateEducation = (id: string, patch: Partial<Education>) => {
    updateData({
      education: resume.data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  };

  const removeEducation = (id: string) => {
    updateData({ education: resume.data.education.filter((e) => e.id !== id) });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (source.index === destination.index) return;

    if (type === "experience") {
      const items = Array.from(resume.data.experiences);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      updateData({ experiences: items });
    } else if (type === "education") {
      const items = Array.from(resume.data.education);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      updateData({ education: items });
    }
  };

  const addSkill = () => {
    const skill: Skill = { id: crypto.randomUUID(), name: "", level: "Intermediário" };
    updateData({ skills: [...resume.data.skills, skill] });
  };

  const updateSkill = (id: string, patch: Partial<Skill>) => {
    updateData({
      skills: resume.data.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const removeSkill = (id: string) => {
    updateData({ skills: resume.data.skills.filter((s) => s.id !== id) });
  };

  const addLanguage = () => {
    const lang: Language = { id: crypto.randomUUID(), name: "", level: "Intermediário" };
    updateData({ languages: [...(resume.data.languages ?? []), lang] });
  };

  const updateLanguage = (id: string, patch: Partial<Language>) => {
    updateData({
      languages: (resume.data.languages ?? []).map((l) => (l.id === id ? { ...l, ...patch } : l)),
    });
  };

  const removeLanguage = (id: string) => {
    updateData({ languages: (resume.data.languages ?? []).filter((l) => l.id !== id) });
  };

  const pi = resume.data.personalInfo;
  const languages = resume.data.languages ?? [];
  const currentStepIndex = STEPS.findIndex((step) => step.id === activeStep);
  const currentStep = STEPS[currentStepIndex] ?? STEPS[0];
  const previewScale = PREVIEW_SCALE[previewZoom];
  const missingName = !pi.name.trim();
  const missingEmail = !pi.email.trim();
  const filteredTemplates = BUILDER_TEMPLATE_OPTIONS.filter(
    (tpl) => templateFilter === "todos" || tpl.category.includes(templateFilter)
  );

  const goToNextStep = () => {
    const nextStep = STEPS[currentStepIndex + 1];
    if (nextStep) {
      setActiveStep(nextStep.id);
      return;
    }
    setMobileView("preview");
  };

  return (
    <div className="flex flex-col bg-[#F7F6F3] text-[#0F2744] lg:h-screen lg:overflow-hidden">
      <header className="shrink-0 border-b border-white/80 bg-[#F7F6F3]/95 px-3 py-3 shadow-sm backdrop-blur sm:px-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-10 w-10 shrink-0 rounded-full text-slate-600 hover:bg-white hover:text-[#0F2744]"
            >
              <Link to="/dashboard" aria-label="Voltar para meus currículos">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(220px,360px)_180px]">
              <div>
                <Label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Nome do currículo
                </Label>
                <Input
                  value={resume.title}
                  onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
                  className={`${CONTROL_CLASS} text-base font-bold`}
                  placeholder="Novo currículo"
                />
              </div>

              <div>
                <Label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Modelo
                </Label>
                <Dialog
                  open={isTemplateModalOpen}
                  onOpenChange={(open) => {
                    setIsTemplateModalOpen(open);
                    if (!open) setTemplateFilter("todos");
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${CONTROL_CLASS} w-full justify-start font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors`}
                    >
                      <LayoutTemplate className="h-4 w-4 text-teal-600 mr-2" />
                      Trocar modelo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex max-h-[88vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[860px] sm:rounded-2xl">
                    {/* Header */}
                    <div className="shrink-0 border-b border-slate-100 px-6 pb-4 pt-6 pr-12">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#0F2744]">Galeria de Templates</DialogTitle>
                        <p className="mt-1 text-sm text-slate-500">Escolha um modelo para começar seu currículo</p>
                      </DialogHeader>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {TEMPLATE_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setTemplateFilter(cat.id)}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                              templateFilter === cat.id
                                ? "bg-[#0F2744] text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {filteredTemplates.map((tpl) => {
                          const isSelected = resume.template === tpl.id;
                          const isLocked = !subscribed && isPremiumTemplate(tpl.id);
                          return (
                            <div
                              key={tpl.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                if (isLocked) {
                                  setLockedTemplateName(tpl.name);
                                  setIsTemplateModalOpen(false);
                                  setUpgradeModalOpen(true);
                                  return;
                                }
                                setResume((r) => ({ ...r, template: tpl.id }));
                                setIsTemplateModalOpen(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  if (isLocked) {
                                    setLockedTemplateName(tpl.name);
                                    setIsTemplateModalOpen(false);
                                    setUpgradeModalOpen(true);
                                    return;
                                  }
                                  setResume((r) => ({ ...r, template: tpl.id }));
                                  setIsTemplateModalOpen(false);
                                }
                              }}
                              className={`group cursor-pointer rounded-xl border-2 p-2 transition-all duration-200 ${
                                isSelected
                                  ? "border-teal-500 bg-teal-50/60 shadow-[0_0_0_2px_rgba(20,184,166,0.15)]"
                                  : isLocked
                                  ? "border-slate-100 bg-slate-50/80 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
                                  : "border-slate-100 bg-white hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                              }`}
                            >
                              <div className="relative mb-2.5 aspect-[1/1.41] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                                <div className={`absolute inset-0 ${isLocked ? "opacity-40" : ""}`}>
                                  <TemplatePreview tpl={tpl} />
                                </div>
                                {isSelected && (
                                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 shadow-sm">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                                {isLocked && (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/30 backdrop-blur-[1px]">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/90 shadow-sm">
                                      <Lock className="h-3.5 w-3.5 text-white" />
                                    </div>
                                    <span className="rounded-full bg-amber-400/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                                      Premium
                                    </span>
                                  </div>
                                )}
                                {!isLocked && (
                                  <div className="absolute inset-0 flex items-end justify-center bg-[#0F2744]/0 pb-2 opacity-0 transition-all duration-200 group-hover:bg-[#0F2744]/25 group-hover:opacity-100">
                                    <span className="translate-y-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#0F2744] shadow-md transition-transform group-hover:translate-y-0">
                                      Selecionar
                                    </span>
                                  </div>
                                )}
                                {isLocked && (
                                  <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
                                    <span className="translate-y-1 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-white shadow-md transition-transform group-hover:translate-y-0">
                                      Ver planos
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="text-center">
                                <div className={`text-[13px] font-bold leading-tight ${isSelected ? "text-teal-700" : isLocked ? "text-slate-500" : "text-[#0F2744]"}`}>
                                  {tpl.name}
                                </div>
                                <div className="mt-0.5 text-[10px] leading-snug text-slate-400">{tpl.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                        {filteredTemplates.length === 0 && (
                          <div className="col-span-5 flex flex-col items-center justify-center py-12 text-slate-400">
                            <LayoutTemplate className="mb-2 h-8 w-8" />
                            <p className="text-sm">Nenhum template nesta categoria</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="shrink-0 border-t border-slate-100 bg-slate-50/80 px-6 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                          {filteredTemplates.length} modelo{filteredTemplates.length !== 1 ? "s" : ""} disponíve{filteredTemplates.length !== 1 ? "is" : "l"}
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsTemplateModalOpen(false)}
                          className="text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800"
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-teal-100 bg-white px-3 text-xs font-semibold text-teal-700 shadow-sm">
              <CheckCircle className="h-4 w-4" />
              {autoSaved ? "Alterações salvas" : "Salvo automaticamente"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="h-10 rounded-xl border-slate-200 bg-white px-4 font-semibold text-[#0F2744] shadow-sm hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              <Save className="h-4 w-4" />
              Salvar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePublish}
              disabled={publishing}
              className="h-10 rounded-xl border-slate-200 bg-white px-4 font-semibold text-[#0F2744] shadow-sm hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              <Share2 className="h-4 w-4" />
              {publishing ? "Gerando..." : "Compartilhar Link"}
            </Button>

            <Button
              size="sm"
              onClick={handleExportPDF}
              disabled={exporting}
              className="btn-cta h-10 rounded-xl px-4 font-bold"
              style={{ boxShadow: "0 4px 16px rgba(13,148,136,0.28)" }}
            >
              <Download className="h-4 w-4" />
              {exporting ? "Exportando..." : "Baixar PDF"}
            </Button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
          <Button
            type="button"
            variant={mobileView === "form" ? "default" : "outline"}
            onClick={() => setMobileView("form")}
            className={
              mobileView === "form"
                ? "h-10 rounded-xl bg-[#0F2744] font-bold text-white hover:bg-[#0b1d32]"
                : "h-10 rounded-xl border-slate-200 bg-white font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            }
          >
            <PanelLeft className="h-4 w-4" />
            Editar
          </Button>
          <Button
            type="button"
            variant={mobileView === "preview" ? "default" : "outline"}
            onClick={() => setMobileView("preview")}
            className={
              mobileView === "preview"
                ? "h-10 rounded-xl bg-[#0F2744] font-bold text-white hover:bg-[#0b1d32]"
                : "h-10 rounded-xl border-slate-200 bg-white font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            }
          >
            <Eye className="h-4 w-4" />
            Ver preview
          </Button>
        </div>
      </header>

      <div className="flex flex-col lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:flex-row">
        <aside
          className={`relative w-full shrink-0 border-r border-white/80 bg-[#F7F6F3] p-3 sm:p-4 lg:min-h-0 lg:w-[var(--panel-width)] ${
            mobileView === "preview" ? "hidden" : "flex"
          } ${viewMode === "fullscreen" ? "lg:hidden" : "lg:flex"}`}
          style={{ "--panel-width": viewMode === "split" ? "50vw" : `${panelWidth}px` } as React.CSSProperties}
        >
          {/* Resize Handle */}
          <div
            className="hidden lg:block absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-teal-500/20 active:bg-teal-500/40 z-10 transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = panelWidth;
              
              const onMouseMove = (moveEvent: MouseEvent) => {
                const newWidth = Math.max(280, Math.min(480, startWidth + (moveEvent.clientX - startX)));
                setPanelWidth(newWidth);
              };
              
              const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
              };
              
              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("mouseup", onMouseUp);
            }}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Tabs
              value={activeStep}
              onValueChange={(value) => setActiveStep(value as StepId)}
              className="flex w-full flex-col rounded-3xl border border-white/80 bg-white shadow-[0_18px_55px_rgba(15,39,68,0.08)] lg:min-h-0 lg:overflow-hidden"
            >
            <div className="border-b border-slate-100 p-3">
              <TabsList className="grid h-auto w-full grid-cols-5 gap-1 rounded-2xl bg-slate-50 p-1">
                {STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      className="min-w-0 rounded-xl px-1.5 py-2 text-[11px] font-bold text-slate-500 transition-all data-[state=active]:bg-[#0D9488] data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                      <Icon className="h-3.5 w-3.5 sm:mr-1" />
                      <span className="hidden sm:inline">{step.shortLabel}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="px-4 py-5 sm:px-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
              <SectionHeader step={currentStep} index={currentStepIndex} />

              <TabsContent value="pessoal" className="mt-5 space-y-4">
                <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
                  <Label className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                    Foto de perfil
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-teal-100 bg-white shadow-sm">
                      {pi.photo ? (
                        <img src={pi.photo} alt="Foto" className="h-full w-full object-cover" />
                      ) : (
                        <Camera className="h-8 w-8 text-teal-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-10 rounded-xl border-teal-100 bg-white font-semibold text-teal-700 hover:bg-teal-50"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4" />
                        {pi.photo ? "Trocar foto" : "Adicionar foto"}
                      </Button>
                      {pi.photo && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-9 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => updateData({ personalInfo: { ...pi, photo: "" } })}
                        >
                          <X className="h-4 w-4" />
                          Remover
                        </Button>
                      )}
                      <p className="text-xs leading-relaxed text-slate-500">
                        Use uma foto profissional e bem iluminada.
                      </p>
                    </div>
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </div>
                </div>

                {/* 
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#0F2744] flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                      Importar do LinkedIn
                      <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                        Em breve
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-sm">
                      Salve o seu perfil em PDF no LinkedIn e importe aqui para preencher automaticamente.
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    disabled
                    className="shrink-0 bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed rounded-xl font-semibold"
                  >
                    <FileUp className="h-4 w-4" />
                    Em breve
                  </Button>
                  <input ref={linkedinInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleLinkedInImport} />
                </div>
                */}

                <Field label="Nome completo" required invalid={missingName} hint={missingName ? "Esse nome aparece no topo do currículo." : undefined}>
                  <IconInput
                    icon={User}
                    value={pi.name}
                    onChange={(e) => updateData({ personalInfo: { ...pi, name: e.target.value } })}
                    placeholder="João Silva"
                  />
                </Field>
                <Field label="E-mail" required invalid={missingEmail} hint="Dica: use um e-mail profissional.">
                  <IconInput
                    icon={Mail}
                    value={pi.email}
                    onChange={(e) => updateData({ personalInfo: { ...pi, email: e.target.value } })}
                    placeholder="joao@email.com"
                  />
                </Field>
                <Field label="Telefone">
                  <IconInput
                    icon={Phone}
                    value={pi.phone}
                    onChange={(e) => updateData({ personalInfo: { ...pi, phone: e.target.value } })}
                    placeholder="(11) 99999-9999"
                  />
                </Field>
                <Field 
                  label="Localização" 
                  hint={pi.location.length > 0 && !pi.location.includes(',') ? "Dica: Evite colocar seu endereço completo, apenas Cidade e Estado já é suficiente (ex: São Paulo, SP)." : undefined}
                >
                  <IconInput
                    icon={MapPin}
                    value={pi.location}
                    onChange={(e) => updateData({ personalInfo: { ...pi, location: e.target.value } })}
                    placeholder="São Paulo, SP"
                  />
                </Field>
                <Field label="LinkedIn">
                  <IconInput
                    icon={Linkedin}
                    value={pi.linkedin}
                    onChange={(e) => updateData({ personalInfo: { ...pi, linkedin: e.target.value } })}
                    placeholder="linkedin.com/in/joao"
                  />
                </Field>
                <Field label="Site / Portfólio">
                  <IconInput
                    icon={Globe}
                    value={pi.website}
                    onChange={(e) => updateData({ personalInfo: { ...pi, website: e.target.value } })}
                    placeholder="joao.dev"
                  />
                </Field>
                <Field label="Resumo profissional" hint="Dica: escreva na primeira pessoa e destaque seus principais resultados.">
                  <Textarea
                    value={pi.summary}
                    onChange={(e) => updateData({ personalInfo: { ...pi, summary: e.target.value } })}
                    onFocus={() => {
                      setSummaryPlaceholder((prev) => {
                        const currentIndex = SUMMARY_PLACEHOLDERS.indexOf(prev);
                        const nextIndex = (currentIndex + 1) % SUMMARY_PLACEHOLDERS.length;
                        return SUMMARY_PLACEHOLDERS[nextIndex];
                      });
                    }}
                    placeholder={summaryPlaceholder}
                    className={TEXTAREA_CLASS}
                    rows={5}
                  />
                  <p className="text-right text-xs font-medium text-slate-400">{pi.summary.length} caracteres</p>
                </Field>
              </TabsContent>

              <TabsContent value="experiencia" className="mt-5 space-y-4">
                {resume.data.experiences.length === 0 && (
                  <EmptyEditorState icon={Briefcase} text="Adicione sua primeira experiência profissional." />
                )}
                <Droppable droppableId="experiences" type="experience">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {resume.data.experiences.map((exp, i) => (
                        <Draggable key={exp.id} draggableId={exp.id} index={i}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps}>
                              <EditorItem 
                                title={`Experiência ${i + 1}`} 
                                onRemove={() => removeExperience(exp.id)}
                                dragHandleProps={provided.dragHandleProps}
                              >
                                <Field label="Cargo">
                                  <Input value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} placeholder="Desenvolvedor Frontend" className={CONTROL_CLASS} />
                                </Field>
                                <Field label="Empresa">
                                  <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Empresa LTDA" className={CONTROL_CLASS} />
                                </Field>
                                <div className="grid grid-cols-2 gap-3">
                                  <Field label="Início">
                                    <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="Jan 2022" className={CONTROL_CLASS} />
                                  </Field>
                                  <Field label="Fim">
                                    <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Atual" disabled={exp.current} className={CONTROL_CLASS} />
                                  </Field>
                                </div>
                                <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                                  <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: "" })} className="h-4 w-4 accent-teal-600" />
                                  Emprego atual
                                </label>
                                <Field label="Descrição">
                                  <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder="Descreva suas responsabilidades, entregas e resultados..." className={TEXTAREA_CLASS} rows={4} />
                                </Field>
                              </EditorItem>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <AddButton onClick={addExperience}>Adicionar experiência</AddButton>
              </TabsContent>

              <TabsContent value="formacao" className="mt-5 space-y-4">
                {resume.data.education.length === 0 && (
                  <EmptyEditorState icon={GraduationCap} text="Adicione sua formação mais relevante." />
                )}
                <Droppable droppableId="education" type="education">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {resume.data.education.map((edu, i) => (
                        <Draggable key={edu.id} draggableId={edu.id} index={i}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps}>
                              <EditorItem 
                                title={`Formação ${i + 1}`} 
                                onRemove={() => removeEducation(edu.id)}
                                dragHandleProps={provided.dragHandleProps}
                              >
                                <Field label="Instituição">
                                  <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} placeholder="Universidade de São Paulo" className={CONTROL_CLASS} />
                                </Field>
                                <Field label="Curso">
                                  <Input value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} placeholder="Ciência da Computação" className={CONTROL_CLASS} />
                                </Field>
                                <Field label="Grau">
                                  <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="Bacharelado" className={CONTROL_CLASS} />
                                </Field>
                                <div className="grid grid-cols-2 gap-3">
                                  <Field label="Início">
                                    <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} placeholder="2018" className={CONTROL_CLASS} />
                                  </Field>
                                  <Field label="Conclusão">
                                    <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} placeholder="2022" disabled={edu.current} className={CONTROL_CLASS} />
                                  </Field>
                                </div>
                                <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                                  <input type="checkbox" checked={edu.current} onChange={(e) => updateEducation(edu.id, { current: e.target.checked, endDate: "" })} className="h-4 w-4 accent-teal-600" />
                                  Em andamento
                                </label>
                              </EditorItem>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <AddButton onClick={addEducation}>Adicionar formação</AddButton>
              </TabsContent>

              <TabsContent value="habilidades" className="mt-5 space-y-4">
                {resume.data.skills.length === 0 && (
                  <EmptyEditorState icon={Wrench} text="Adicione habilidades que diferenciam seu perfil." />
                )}
                <div className="space-y-2">
                  {resume.data.skills.map((skill) => (
                    <div key={skill.id} className="grid gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-[1fr_150px_40px]">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        placeholder="Ex: React"
                        className={CONTROL_CLASS}
                      />
                      <Select value={skill.level} onValueChange={(v) => updateSkill(skill.id, { level: v as Skill["level"] })}>
                        <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                          <SelectItem value="Especialista">Especialista</SelectItem>
                        </SelectContent>
                      </Select>
                      <IconRemoveButton onClick={() => removeSkill(skill.id)} />
                    </div>
                  ))}
                </div>
                <AddButton onClick={addSkill}>Adicionar habilidade</AddButton>
              </TabsContent>

              <TabsContent value="idiomas" className="mt-5 space-y-4">
                {languages.length === 0 && (
                  <EmptyEditorState icon={Languages} text="Adicione idiomas e níveis de proficiência." />
                )}
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="grid gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-[1fr_150px_40px]">
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                        placeholder="Ex: Inglês"
                        className={CONTROL_CLASS}
                      />
                      <Select value={lang.level} onValueChange={(v) => updateLanguage(lang.id, { level: v as Language["level"] })}>
                        <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                          <SelectItem value="Fluente">Fluente</SelectItem>
                          <SelectItem value="Nativo">Nativo</SelectItem>
                        </SelectContent>
                      </Select>
                      <IconRemoveButton onClick={() => removeLanguage(lang.id)} />
                    </div>
                  ))}
                </div>
                <AddButton onClick={addLanguage}>Adicionar idioma</AddButton>
              </TabsContent>
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              {!isTipDismissed && (
                <div className="relative mb-4 rounded-2xl bg-[#0F2744] p-4 text-white">
                  <button 
                    onClick={() => {
                      setIsTipDismissed(true);
                      localStorage.setItem("builderTipDismissed", "true");
                    }}
                    className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    aria-label="Fechar dica"
                    title="Fechar dica"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Dica
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200">{currentStep.tip}</p>
                </div>
              )}
              
              <div className="mb-4">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Etapa {currentStepIndex + 1} de {STEPS.length}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#1D9E75] transition-all duration-200 ease-in-out"
                    style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={goToNextStep}
                className="btn-cta h-11 w-full rounded-2xl font-bold"
                style={{ boxShadow: "0 4px 16px rgba(13,148,136,0.28)" }}
              >
                {currentStepIndex === STEPS.length - 1 ? "Ver preview" : "Próxima etapa"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Tabs>
          </DragDropContext>
        </aside>

        <section
          className={`flex-col bg-[#eceff1]/70 lg:min-h-0 lg:flex-1 lg:overflow-hidden ${
            mobileView === "form" ? "hidden" : "flex"
          } lg:flex ${viewMode === "fullscreen" ? "fixed inset-0 z-50 bg-[#eceff1]" : ""}`}
        >
          <div className="flex shrink-0 flex-col gap-3 border-b border-white/70 bg-[#F7F6F3]/80 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Pré-visualização</p>
              <h2 className="text-lg font-extrabold text-[#0F2744]">Currículo em tempo real</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {viewMode === "fullscreen" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setViewMode("default")}
                  className="h-10 rounded-xl border-slate-200 bg-white px-3 font-semibold text-slate-600 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <X className="h-4 w-4 mr-1" />
                  Fechar
                </Button>
              )}
              {viewMode !== "fullscreen" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === "split" ? "default" : "split")}
                    className={`h-10 rounded-xl border-slate-200 px-3 font-semibold shadow-sm transition-colors ${
                      viewMode === "split" 
                        ? "bg-teal-50 text-teal-700 border-teal-100" 
                        : "bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                    }`}
                    title="Dividir tela 50/50"
                  >
                    <Columns className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode("fullscreen")}
                    className="h-10 rounded-xl border-slate-200 bg-white px-3 font-semibold text-slate-600 shadow-sm hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    title="Tela cheia"
                  >
                    <Maximize className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Tela cheia</span>
                  </Button>
                </>
              )}

              <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>

              <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm">
                <Monitor className="h-4 w-4 text-teal-600" />
                Zoom
              </span>
              {[
                { value: "fit" as const, label: "Ajustar" },
                { value: "75" as const, label: "75%" },
                { value: "100" as const, label: "100%" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewZoom(option.value)}
                  className={
                    previewZoom === option.value
                      ? "h-10 rounded-xl border-teal-100 bg-teal-50 font-bold text-teal-700 hover:bg-teal-50"
                      : "h-10 rounded-xl border-slate-200 bg-white font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="overflow-auto px-4 py-8 sm:px-8 lg:min-h-0 lg:flex-1">
            <div className="mx-auto flex min-h-full w-full justify-center">
              <div
                className="origin-top transition-transform duration-200"
                style={{ transform: `scale(${previewScale})` }}
              >
                <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_24px_80px_rgba(15,39,68,0.20),0_0_0_1px_rgba(15,39,68,0.06)]">
                  <ResumePreview data={resume.data} template={resume.template} id="resume-preview" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed -left-[10000px] top-0 bg-white" aria-hidden="true">
        <ResumePreview data={resume.data} template={resume.template} id="resume-preview-export" />
      </div>

      <UpgradeModal
        open={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        templateName={lockedTemplateName}
        paymentUrl={paymentUrl}
      />
    </div>
  );
}

function SectionHeader({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
          Etapa {index + 1} de {STEPS.length}
        </span>
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <span
            className="block h-full rounded-full bg-[#0D9488] transition-all"
            style={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
          />
        </span>
      </div>
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488] text-white shadow-[0_8px_20px_rgba(13,148,136,0.24)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#0F2744]">{step.title}</h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  hint,
  required,
  invalid,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className={`text-xs font-bold uppercase tracking-[0.12em] ${invalid ? "text-red-500" : "text-slate-500"}`}>
          {label}
          {required && <span className="ml-1 text-teal-600">*</span>}
        </Label>
      </div>
      {children}
      {hint && (
        <p className={`text-xs leading-relaxed ${invalid ? "text-red-500" : "text-slate-500"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

function IconInput({ icon: Icon, className, ...props }: InputProps & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input className={`${CONTROL_CLASS} pl-9 ${className ?? ""}`} {...props} />
    </div>
  );
}

function EditorItem({
  title,
  onRemove,
  children,
  dragHandleProps,
}: {
  title: string;
  onRemove: () => void;
  children: ReactNode;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm relative">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          {dragHandleProps && (
            <div 
              {...dragHandleProps} 
              className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1"
            >
              <GripVertical className="h-5 w-5" />
            </div>
          )}
          <h3 className="text-sm font-extrabold text-[#0F2744]">{title}</h3>
        </div>
        <IconRemoveButton onClick={onRemove} />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function IconRemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 shrink-0 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600"
      onClick={onClick}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full rounded-2xl border-dashed border-teal-200 bg-teal-50/60 font-bold text-teal-700 hover:border-teal-300 hover:bg-teal-50"
      onClick={onClick}
    >
      <Plus className="h-4 w-4" />
      {children}
    </Button>
  );
}

function EmptyEditorState({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
}

function TemplatePreview({ tpl }: { tpl: (typeof BUILDER_TEMPLATE_OPTIONS)[number] }) {
  const c = tpl.accentColor;

  if (tpl.layout === "sidebar") {
    return (
      <div className="flex h-full w-full">
        <div className="flex w-[34%] shrink-0 flex-col items-center gap-1 px-1 pb-1 pt-2" style={{ backgroundColor: c + "18" }}>
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: c + "55" }} />
          <div className="mt-0.5 h-[2px] w-5/6 rounded" style={{ backgroundColor: c + "66" }} />
          <div className="h-[2px] w-4/6 rounded" style={{ backgroundColor: c + "44" }} />
          <div className="mt-1 h-px w-full" style={{ backgroundColor: c + "33" }} />
          <div className="mt-1 h-[2px] w-5/6 rounded" style={{ backgroundColor: c + "44" }} />
          <div className="h-[2px] w-4/6 rounded" style={{ backgroundColor: c + "33" }} />
          <div className="h-[2px] w-5/6 rounded" style={{ backgroundColor: c + "33" }} />
          <div className="mt-1 h-px w-full" style={{ backgroundColor: c + "33" }} />
          <div className="mt-1 h-[2px] w-4/6 rounded" style={{ backgroundColor: c + "33" }} />
          <div className="h-[2px] w-5/6 rounded" style={{ backgroundColor: c + "33" }} />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-1.5 pt-2">
          <div className="h-2.5 w-4/5 rounded" style={{ backgroundColor: c }} />
          <div className="mt-0.5 h-[2px] w-3/5 rounded bg-slate-300" />
          <div className="mt-1.5 h-px w-full bg-slate-200" />
          <div className="mt-1 h-[2px] w-2/5 rounded" style={{ backgroundColor: c + "99" }} />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-3/5 rounded bg-slate-200" />
          <div className="mt-1 h-[2px] w-2/5 rounded" style={{ backgroundColor: c + "99" }} />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (tpl.layout === "classic") {
    return (
      <div className="flex h-full w-full flex-col p-2 pt-2.5">
        <div className="mb-1.5 flex flex-col items-center gap-0.5 border-b-2 pb-2" style={{ borderColor: c }}>
          <div className="h-2.5 w-2/3 rounded" style={{ backgroundColor: c }} />
          <div className="h-[2px] w-1/2 rounded bg-slate-300" />
          <div className="mt-0.5 flex gap-2">
            <div className="h-[2px] w-10 rounded bg-slate-200" />
            <div className="h-[2px] w-10 rounded bg-slate-200" />
          </div>
        </div>
        <div className="mb-0.5 h-[2px] w-1/3 rounded" style={{ backgroundColor: c + "dd" }} />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="mt-0.5 h-[2px] w-full rounded bg-slate-200" />
        <div className="mt-0.5 h-[2px] w-4/5 rounded bg-slate-200" />
        <div className="mb-0.5 mt-1.5 h-[2px] w-1/3 rounded" style={{ backgroundColor: c + "dd" }} />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="mt-0.5 h-[2px] w-5/6 rounded bg-slate-200" />
        <div className="mt-0.5 h-[2px] w-full rounded bg-slate-200" />
      </div>
    );
  }

  if (tpl.layout === "compact") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="flex h-5 shrink-0 items-center px-2" style={{ backgroundColor: c }}>
          <div className="h-[3px] w-1/2 rounded bg-white/80" />
          <div className="ml-auto h-[2px] w-1/4 rounded bg-white/50" />
        </div>
        <div className="flex flex-1 flex-col gap-[3px] p-1.5">
          <div className="mt-0.5 h-[2px] w-1/3 rounded" style={{ backgroundColor: c + "cc" }} />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="mt-1 h-[2px] w-1/3 rounded" style={{ backgroundColor: c + "cc" }} />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-4/5 rounded bg-slate-200" />
          <div className="mt-1 h-[2px] w-1/3 rounded" style={{ backgroundColor: c + "cc" }} />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-full rounded bg-slate-200" />
          <div className="h-[2px] w-3/5 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-8 shrink-0 items-center gap-1.5 px-2" style={{ backgroundColor: c }}>
        <div className="h-5 w-5 shrink-0 rounded-full bg-white/30" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="h-[3px] w-3/5 rounded bg-white/80" />
          <div className="h-[2px] w-2/5 rounded bg-white/50" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <div className="h-[2px] w-2/5 rounded" style={{ backgroundColor: c + "cc" }} />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="h-[2px] w-4/5 rounded bg-slate-200" />
        <div className="mt-1 h-[2px] w-2/5 rounded" style={{ backgroundColor: c + "cc" }} />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="h-[2px] w-5/6 rounded bg-slate-200" />
        <div className="h-[2px] w-full rounded bg-slate-200" />
        <div className="h-[2px] w-3/5 rounded bg-slate-200" />
      </div>
    </div>
  );
}
