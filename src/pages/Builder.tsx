import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Camera,
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
  Share2,
  Mail,
  MapPin,
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
import { ResumePreview } from "@/components/ResumePreview";
import { getResume, saveResume } from "@/lib/storage";
import { publishResume } from "@/lib/public-resume";
import { parseLinkedInPDF } from "@/lib/pdf-parser";
import type { Resume, ResumeData, Experience, Education, Skill, Language } from "@/types/resume";
import { defaultResumeData } from "@/types/resume";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

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

function getPdfFileName(title: string) {
  const fileName = title.replace(/[<>:"/\\|?*]+/g, "").trim();
  return fileName || "curriculo";
}

export default function Builder() {
  const { id } = useParams<{ id: string }>();

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
  const [previewZoom, setPreviewZoom] = useState<PreviewZoom>("fit");
  const [autoSaved, setAutoSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const linkedinInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      toast.error("Erro ao gerar link público. Verifique se o banco Supabase está online.");
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
                <Select
                  value={resume.template}
                  onValueChange={(v) => setResume((r) => ({ ...r, template: v as Resume["template"] }))}
                >
                  <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                    <span className="flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4 text-teal-600" />
                      <SelectValue />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modelo moderno</SelectItem>
                    <SelectItem value="classic">Modelo clássico</SelectItem>
                    <SelectItem value="minimal">Modelo minimalista</SelectItem>
                    <SelectItem value="executive">Modelo executivo</SelectItem>
                  </SelectContent>
                </Select>
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
          className={`w-full shrink-0 border-r border-white/80 bg-[#F7F6F3] p-3 sm:p-4 lg:min-h-0 lg:flex lg:w-[430px] ${
            mobileView === "preview" ? "hidden" : "flex"
          }`}
        >
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
                <Field label="Resumo profissional" hint="Dica: escreva um resumo com 3 a 4 linhas.">
                  <Textarea
                    value={pi.summary}
                    onChange={(e) => updateData({ personalInfo: { ...pi, summary: e.target.value } })}
                    placeholder="Breve descrição sobre você, sua experiência e seus objetivos..."
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
              <div className="mb-3 rounded-2xl bg-[#0F2744] p-4 text-white">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Dica
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{currentStep.tip}</p>
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
          } lg:flex`}
        >
          <div className="flex shrink-0 flex-col gap-3 border-b border-white/70 bg-[#F7F6F3]/80 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Pré-visualização</p>
              <h2 className="text-lg font-extrabold text-[#0F2744]">Currículo em tempo real</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
  dragHandleProps?: any;
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
