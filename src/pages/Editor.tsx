import { useCallback, useEffect, useState } from "react";
import { ResumeData } from "@/types/resume";
import { defaultResumeData } from "@/lib/constants";
import { ResumeForm } from "@/components/editor/ResumeForm";
import { ResumePreview } from "@/components/editor/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Json, TablesInsert } from "@/integrations/supabase/types";
import { getErrorMessage } from "@/lib/utils";

const sampleData: ResumeData = {
  ...defaultResumeData,
  personalInfo: {
    fullName: "João Silva",
    desiredRole: "Desenvolvedor Frontend Senior",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    linkedin: "linkedin.com/in/joaosilva",
    portfolio: "joaosilva.dev",
  },
  summary: "Desenvolvedor apaixonado por criar interfaces incríveis e performáticas. Com mais de 5 anos de experiência em React, TypeScript e ecossistemas modernos de desenvolvimento web.",
  experiences: [
    {
      id: "1",
      role: "Desenvolvedor Frontend Senior",
      company: "Tech Solutions",
      city: "São Paulo",
      startDate: "01/2020",
      endDate: "",
      current: true,
      description: "Liderança técnica da equipe de frontend, arquitetura de micro-frontends e otimização de performance.",
    },
    {
      id: "2",
      role: "Desenvolvedor Web",
      company: "Digital Agency",
      city: "Curitiba",
      startDate: "06/2017",
      endDate: "12/2019",
      current: false,
      description: "Desenvolvimento de sites responsivos e e-commerces utilizando React e Node.js.",
    }
  ],
  education: [
    {
      id: "1",
      course: "Ciência da Computação",
      institution: "Universidade de São Paulo (USP)",
      degree: "Bacharelado",
      startDate: "2013",
      endDate: "2017",
    }
  ],
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Redux", "GraphQL", "UI/UX Design"],
  template: "modern",
};

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);
  const { toast } = useToast();

  const fetchResume = useCallback(async () => {
    if (!id) return;

    try {
      const { data: resume, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (resume) {
        setData(resume.content as unknown as ResumeData);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar",
        description: getErrorMessage(error),
      });
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    if (id) {
      fetchResume();
    } else {
      setData(sampleData);
      setIsLoading(false);
    }
  }, [fetchResume, id]);

  const handleUpdate = (newData: Partial<ResumeData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Atenção",
        description: "Você precisa estar logado para salvar seus currículos.",
      });
      return;
    }

    setIsSaving(true);
    try {
      const resumePayload: TablesInsert<"resumes"> = {
        title: data.personalInfo.fullName || "Novo Currículo",
        content: data as unknown as Json,
        template: data.template || "modern",
        user_id: user.id,
      };

      if (id) {
        const { error } = await supabase
          .from("resumes")
          .update(resumePayload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data: newResume, error } = await supabase
          .from("resumes")
          .insert(resumePayload)
          .select()
          .single();
        if (error) throw error;
        navigate(`/editor/${newResume.id}`, { replace: true });
      }

      toast({
        title: "Currículo salvo!",
        description: "Suas alterações foram sincronizadas com o banco de dados.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    const element = document.getElementById("resume-content");
    if (!element) return;

    setIsExporting(true);
    toast({
      title: "Exportando...",
      description: "Gerando seu PDF de alta qualidade. Por favor, aguarde.",
    });

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Create canvas from the resume preview element
      const canvas = await html2canvas(element, {
        scale: 2, // Better quality
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      
      // Calculate dimensions for PDF (A4 size)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`curriculo-${data.personalInfo.fullName.toLowerCase().replace(/\s+/g, "-") || "meu-curriculo"}.pdf`);

      toast({
        title: "Sucesso!",
        description: "Seu currículo foi exportado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <header className="h-16 border-b bg-background sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          </Link>
          <div className="h-8 w-[1px] bg-border mx-2"></div>
          <span className="font-bold text-lg hidden md:block">Currículo Fácil <span className="text-muted-foreground font-normal">| Editor</span></span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" size="sm" onClick={handleSave} className="gap-2" disabled={isExporting || isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
          <Button size="sm" onClick={handleExport} className="gap-2" disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Exportando..." : "Exportar PDF"}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Editor Form */}
        <div className="w-full md:w-1/2 overflow-y-auto p-4 md:p-8 bg-background border-r">
          <ResumeForm data={data} onUpdate={handleUpdate} />
        </div>

        {/* Preview */}
        <div className="w-full md:w-1/2 overflow-y-auto p-4 md:p-8 flex justify-center bg-secondary/30">
          <div className="w-full max-w-[800px] shadow-2xl origin-top transition-all duration-300">
            <ResumePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
