import { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Copy,
  Download,
  Edit3,
  FileText,
  Lightbulb,
  Plus,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResumePreview } from "@/components/ResumePreview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createResume, deleteResume, duplicateResume, getResumes } from "@/lib/storage";
import type { Resume } from "@/types/resume";

type TemplateTheme = {
  label: string;
  accent: string;
  badgeClass: string;
  layout: "default" | "sidebar";
};

const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  modern: {
    label: "Moderno",
    accent: "#2563eb",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-100",
    layout: "default",
  },
  classic: {
    label: "Clássico",
    accent: "#7c3aed",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-100",
    layout: "default",
  },
  minimal: {
    label: "Minimalista",
    accent: "#0F766E",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
    layout: "sidebar",
  },
};

const FALLBACK_THEME: TemplateTheme = {
  label: "Personalizado",
  accent: "#0D9488",
  badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
  layout: "default",
};

function getTemplateTheme(template: string) {
  return TEMPLATE_THEMES[template] ?? { ...FALLBACK_THEME, label: template || FALLBACK_THEME.label };
}

function getResumeCountLabel(count: number) {
  if (count === 0) return "Nenhum currículo salvo";
  return `${count} currículo${count > 1 ? "s" : ""} salvo${count > 1 ? "s" : ""}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPdfFileName(title: string) {
  const fileName = title.replace(/[<>:"/\\|?*]+/g, "").trim();
  return fileName || "curriculo";
}

function ResumeMiniPreview({
  template,
  candidateName,
  className = "",
}: {
  template: string;
  candidateName: string;
  className?: string;
}) {
  const theme = getTemplateTheme(template);
  const initials =
    candidateName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "CV";

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full min-h-[190px] items-center justify-center overflow-hidden bg-[#f8fafc] p-5 ${className}`}
      style={{
        background: `linear-gradient(145deg, ${theme.accent}12 0%, #f8fafc 42%, #ffffff 100%)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: theme.accent }}
      />
      <div
        className="relative h-[158px] w-[118px] rounded-xl bg-white p-3"
        style={{
          boxShadow: "0 18px 40px rgba(15,39,68,0.16), 0 0 0 1px rgba(15,39,68,0.05)",
        }}
      >
        {theme.layout === "sidebar" ? (
          <div className="flex h-full gap-2.5">
            <div
              className="flex w-8 flex-col items-center gap-1.5 rounded-lg p-1.5"
              style={{ backgroundColor: `${theme.accent}10` }}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-black text-white"
                style={{ backgroundColor: theme.accent }}
              >
                {initials}
              </div>
              <span className="h-1 w-full rounded-full" style={{ backgroundColor: theme.accent }} />
              <span className="h-1 w-5 rounded-full bg-slate-200" />
              <span className="h-1 w-6 rounded-full bg-slate-200" />
              <span className="mt-1 h-1 w-full rounded-full" style={{ backgroundColor: `${theme.accent}88` }} />
              <span className="h-1 w-5 rounded-full bg-slate-200" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 pt-1">
              <span className="h-2 w-12 rounded-full bg-[#0F2744]" />
              <span className="h-1 w-9 rounded-full bg-slate-300" />
              <span className="my-1 h-px w-full" style={{ backgroundColor: `${theme.accent}44` }} />
              <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: theme.accent }} />
              <span className="h-1 w-full rounded-full bg-slate-100" />
              <span className="h-1 w-10 rounded-full bg-slate-100" />
              <span className="mt-1 h-1.5 w-9 rounded-full" style={{ backgroundColor: `${theme.accent}aa` }} />
              <span className="h-1 w-full rounded-full bg-slate-100" />
              <span className="h-1 w-8 rounded-full bg-slate-100" />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-2 border-b pb-2" style={{ borderColor: `${theme.accent}33` }}>
              <div>
                <span className="mb-1.5 block h-2 w-16 rounded-full bg-[#0F2744]" />
                <span className="block h-1 w-12 rounded-full bg-slate-300" />
              </div>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-[8px] font-black text-white"
                style={{ backgroundColor: theme.accent }}
              >
                {initials}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {[0, 1, 2].map((section) => (
                <div key={section}>
                  <span className="mb-1.5 block h-1.5 w-10 rounded-full" style={{ backgroundColor: section === 0 ? theme.accent : `${theme.accent}aa` }} />
                  <div className="space-y-1">
                    <span className="block h-1 w-full rounded-full bg-slate-100" />
                    <span className="block h-1 w-4/5 rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex gap-1">
              {[20, 24, 18].map((width) => (
                <span
                  key={width}
                  className="h-2 rounded-full"
                  style={{ width, backgroundColor: `${theme.accent}22` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <section
      className="overflow-hidden rounded-3xl border border-dashed border-teal-200 bg-white"
      style={{
        boxShadow: "0 18px 50px rgba(15,39,68,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
      }}
    >
      <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[0.9fr_1.1fr]">
        <ResumeMiniPreview
          template="modern"
          candidateName="Seu nome"
          className="rounded-2xl border border-slate-100"
        />

        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            Primeiro currículo
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F2744] sm:text-3xl">
            Comece seu primeiro currículo
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Crie uma versão profissional agora e volte aqui para editar, duplicar ou ajustar para cada vaga.
          </p>
          <Button
            onClick={onCreate}
            size="lg"
            className="btn-cta mt-6 h-12 rounded-2xl px-6 font-bold"
            style={{ boxShadow: "0 4px 16px rgba(13,148,136,0.35)" }}
          >
            <Plus className="h-5 w-5" />
            Criar primeiro currículo
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>(() => getResumes());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const hasResumes = resumes.length > 0;

  const handleCreate = () => {
    const resume = createResume();
    navigate(`/builder/${resume.id}`);
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicateResume(id);
    if (copy) {
      setResumes(getResumes());
      toast.success("Currículo duplicado!");
    }
  };

  const handleDownloadPDF = async (resume: Resume) => {
    setExportingId(resume.id);

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.backgroundColor = "#ffffff";
    document.body.appendChild(container);

    const root = createRoot(container);

    try {
      flushSync(() => {
        root.render(
          <ResumePreview
            id={`resume-export-${resume.id}`}
            data={resume.data}
            template={resume.template}
          />
        );
      });

      await new Promise((resolve) => requestAnimationFrame(resolve));

      const element = container.firstElementChild as HTMLElement | null;
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
      root.unmount();
      container.remove();
      setExportingId(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
    setResumes(getResumes());
    setDeleteId(null);
    toast.success("Currículo excluído");
  };

  return (
    <main
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: "linear-gradient(180deg, #F7F6F3 0%, #fbfaf7 46%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <section
          className="mb-8 overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 sm:p-8"
          style={{
            boxShadow: "0 18px 55px rgba(15,39,68,0.09), 0 1px 0 rgba(255,255,255,0.9) inset",
          }}
        >
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                <Sparkles className="h-3.5 w-3.5" />
                Área de trabalho
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F2744] sm:text-4xl lg:text-[2.75rem]">
                Meus Currículos
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Edite, duplique ou baixe suas versões sempre que precisar.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-[#0F2744] shadow-sm">
                  <FileText className="h-4 w-4 text-teal-600" />
                  {getResumeCountLabel(resumes.length)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  {hasResumes ? "Pronto para a próxima vaga" : "Comece em poucos minutos"}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              size="lg"
              className="btn-cta h-12 rounded-2xl px-6 font-bold md:self-end"
              style={{ boxShadow: "0 4px 16px rgba(13,148,136,0.35)" }}
            >
              <Plus className="h-5 w-5" />
              Novo Currículo
            </Button>
          </div>
        </section>

        {!hasResumes ? (
          <EmptyState onCreate={handleCreate} />
        ) : (
          <section>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#0F2744]">Currículos salvos</h2>
                <p className="text-sm text-slate-600">
                  Organize suas versões e mantenha cada candidatura com o tom certo.
                </p>
              </div>
              <span className="text-sm font-semibold text-teal-700">{getResumeCountLabel(resumes.length)}</span>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {resumes.map((resume) => {
                const expCount = resume.data?.experiences?.length ?? 0;
                const skillCount = resume.data?.skills?.length ?? 0;
                const candidateName = resume.data?.personalInfo?.name || "Nome não preenchido";
                const theme = getTemplateTheme(resume.template);

                return (
                  <article
                    key={resume.id}
                    className="group overflow-hidden rounded-3xl border border-white bg-white transition-all duration-300 hover:-translate-y-1"
                    style={{
                      boxShadow: "0 10px 35px rgba(15,39,68,0.08), 0 0 0 1px rgba(15,39,68,0.04)",
                    }}
                  >
                    <div className="grid h-full sm:grid-cols-[168px_1fr]">
                      <Link
                        to={`/builder/${resume.id}`}
                        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                        aria-label={`Editar ${resume.title}`}
                      >
                        <ResumeMiniPreview template={resume.template} candidateName={candidateName} />
                      </Link>

                      <div className="flex min-w-0 flex-col p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              to={`/builder/${resume.id}`}
                              className="line-clamp-1 text-lg font-extrabold tracking-tight text-[#0F2744] transition-colors hover:text-teal-700"
                            >
                              {resume.title || "Novo Currículo"}
                            </Link>
                            <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-600">
                              {candidateName}
                            </p>
                          </div>

                          <Badge className={`border px-3 py-1 font-bold ${theme.badgeClass}`}>
                            {theme.label}
                          </Badge>
                        </div>

                        <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-teal-600" />
                            Última edição em {formatDate(resume.updated_at)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                            {expCount} experiência{expCount === 1 ? "" : "s"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 sm:col-span-2">
                            <Wrench className="h-3.5 w-3.5 text-violet-600" />
                            {skillCount} habilidade{skillCount === 1 ? "" : "s"} registrada{skillCount === 1 ? "" : "s"}
                          </span>
                        </div>

                        <div className="mt-auto space-y-2 pt-5">
                          <Button
                            asChild
                            className="btn-cta h-10 w-full rounded-xl font-bold"
                            style={{ boxShadow: "0 3px 12px rgba(13,148,136,0.28)" }}
                          >
                            <Link to={`/builder/${resume.id}`}>
                              <Edit3 className="h-4 w-4" />
                              Editar currículo
                            </Link>
                          </Button>
                          <div className="grid grid-cols-3 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-10 rounded-xl border-slate-200 px-2 text-xs font-semibold text-[#0F2744] hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 sm:text-sm"
                              title="Duplicar"
                              onClick={() => handleDuplicate(resume.id)}
                            >
                              <Copy className="h-4 w-4" />
                              Duplicar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-10 rounded-xl border-slate-200 px-2 text-xs font-semibold text-[#0F2744] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-sm"
                              title="Baixar PDF"
                              disabled={exportingId === resume.id}
                              onClick={() => handleDownloadPDF(resume)}
                            >
                              <Download className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                {exportingId === resume.id ? "Baixando..." : "Baixar PDF"}
                              </span>
                              <span className="sm:hidden">
                                {exportingId === resume.id ? "..." : "PDF"}
                              </span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-10 rounded-xl border-slate-200 px-2 text-xs font-semibold text-slate-500 hover:border-red-100 hover:bg-red-50 hover:text-red-600 sm:text-sm"
                              title="Excluir"
                              onClick={() => setDeleteId(resume.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section
          className="mt-8 overflow-hidden rounded-3xl p-5 text-white sm:p-6"
          style={{
            background: "linear-gradient(135deg, #0F2744 0%, #0b1d32 100%)",
            boxShadow: "0 18px 45px rgba(15,39,68,0.18)",
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(13,148,136,0.18)", border: "1px solid rgba(45,212,191,0.24)" }}
              >
                <Lightbulb className="h-5 w-5 text-teal-300" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Dica rápida</p>
                <h2 className="mt-1 text-lg font-extrabold">Crie versões diferentes para cada vaga.</h2>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                  Ajuste o título, destaque experiências relevantes e aumente suas chances de ser chamado.
                </p>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              variant="outline"
              className="h-11 rounded-2xl border-white/15 bg-white/10 px-5 font-bold text-white hover:bg-white hover:text-[#0F2744]"
            >
              Nova versão
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir currículo?</DialogTitle>
            <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
