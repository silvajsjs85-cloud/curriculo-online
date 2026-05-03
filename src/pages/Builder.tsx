import { useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Download, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResumePreview } from "@/components/ResumePreview";
import { getResume, saveResume } from "@/lib/storage";
import type { Resume, ResumeData, Experience, Education, Skill } from "@/types/resume";
import { defaultResumeData } from "@/types/resume";

export default function Builder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [resume, setResume] = useState<Resume>(() => {
    const found = id ? getResume(id) : null;
    return found ?? {
      id: id ?? crypto.randomUUID(),
      user_id: "local",
      title: "Novo Currículo",
      template: "modern",
      data: defaultResumeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const updateData = useCallback((patch: Partial<ResumeData>) => {
    setResume((r) => ({ ...r, data: { ...r.data, ...patch } }));
  }, []);

  const handleSave = () => {
    setSaving(true);
    saveResume(resume);
    setTimeout(() => {
      setSaving(false);
      toast.success("Currículo salvo!");
    }, 300);
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${resume.title}.pdf`);
      toast.success("PDF exportado!");
    } catch {
      toast.error("Erro ao exportar PDF");
    } finally {
      setExporting(false);
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

  const pi = resume.data.personalInfo;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-white shrink-0">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <Input
          value={resume.title}
          onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
          className="max-w-xs font-medium"
        />
        <Select
          value={resume.template}
          onValueChange={(v) => setResume((r) => ({ ...r, template: v as Resume["template"] }))}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Moderno</SelectItem>
            <SelectItem value="classic">Clássico</SelectItem>
            <SelectItem value="minimal">Minimalista</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1">
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
          <Button size="sm" onClick={handleExportPDF} disabled={exporting} className="gap-1">
            <Download className="h-4 w-4" />
            {exporting ? "Exportando..." : "PDF"}
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form */}
        <div className="w-full lg:w-[420px] shrink-0 overflow-y-auto border-r bg-gray-50">
          <Tabs defaultValue="pessoal" className="p-4">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
              <TabsTrigger value="experiencia">Exp.</TabsTrigger>
              <TabsTrigger value="formacao">Form.</TabsTrigger>
              <TabsTrigger value="habilidades">Hab.</TabsTrigger>
            </TabsList>

            {/* Pessoal */}
            <TabsContent value="pessoal" className="space-y-3 mt-0">
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <Field label="Nome completo">
                    <Input value={pi.name} onChange={(e) => updateData({ personalInfo: { ...pi, name: e.target.value } })} placeholder="João Silva" />
                  </Field>
                  <Field label="E-mail">
                    <Input value={pi.email} onChange={(e) => updateData({ personalInfo: { ...pi, email: e.target.value } })} placeholder="joao@email.com" />
                  </Field>
                  <Field label="Telefone">
                    <Input value={pi.phone} onChange={(e) => updateData({ personalInfo: { ...pi, phone: e.target.value } })} placeholder="(11) 99999-9999" />
                  </Field>
                  <Field label="Localização">
                    <Input value={pi.location} onChange={(e) => updateData({ personalInfo: { ...pi, location: e.target.value } })} placeholder="São Paulo, SP" />
                  </Field>
                  <Field label="LinkedIn">
                    <Input value={pi.linkedin} onChange={(e) => updateData({ personalInfo: { ...pi, linkedin: e.target.value } })} placeholder="linkedin.com/in/joao" />
                  </Field>
                  <Field label="Site / Portfólio">
                    <Input value={pi.website} onChange={(e) => updateData({ personalInfo: { ...pi, website: e.target.value } })} placeholder="joao.dev" />
                  </Field>
                  <Field label="Resumo profissional">
                    <Textarea
                      value={pi.summary}
                      onChange={(e) => updateData({ personalInfo: { ...pi, summary: e.target.value } })}
                      placeholder="Breve descrição sobre você e seus objetivos..."
                      rows={4}
                    />
                  </Field>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experiência */}
            <TabsContent value="experiencia" className="space-y-3 mt-0">
              {resume.data.experiences.map((exp, i) => (
                <Card key={exp.id}>
                  <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm">Experiência {i + 1}</CardTitle>
                    <Button variant="ghost" size="sm" className="text-destructive h-7 w-7 p-0" onClick={() => removeExperience(exp.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-4">
                    <Field label="Cargo">
                      <Input value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} placeholder="Desenvolvedor Frontend" />
                    </Field>
                    <Field label="Empresa">
                      <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Empresa LTDA" />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Início">
                        <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="Jan 2022" />
                      </Field>
                      <Field label="Fim">
                        <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Atual" disabled={exp.current} />
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: "" })} />
                      Emprego atual
                    </label>
                    <Field label="Descrição">
                      <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder="Descreva suas responsabilidades..." rows={3} />
                    </Field>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full gap-2" onClick={addExperience}>
                <Plus className="h-4 w-4" /> Adicionar experiência
              </Button>
            </TabsContent>

            {/* Formação */}
            <TabsContent value="formacao" className="space-y-3 mt-0">
              {resume.data.education.map((edu, i) => (
                <Card key={edu.id}>
                  <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm">Formação {i + 1}</CardTitle>
                    <Button variant="ghost" size="sm" className="text-destructive h-7 w-7 p-0" onClick={() => removeEducation(edu.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-4">
                    <Field label="Instituição">
                      <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} placeholder="Universidade de São Paulo" />
                    </Field>
                    <Field label="Curso">
                      <Input value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} placeholder="Ciência da Computação" />
                    </Field>
                    <Field label="Grau">
                      <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="Bacharelado" />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Início">
                        <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} placeholder="2018" />
                      </Field>
                      <Field label="Conclusão">
                        <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} placeholder="2022" disabled={edu.current} />
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={edu.current} onChange={(e) => updateEducation(edu.id, { current: e.target.checked, endDate: "" })} />
                      Em andamento
                    </label>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full gap-2" onClick={addEducation}>
                <Plus className="h-4 w-4" /> Adicionar formação
              </Button>
            </TabsContent>

            {/* Habilidades */}
            <TabsContent value="habilidades" className="space-y-3 mt-0">
              <Card>
                <CardContent className="pt-4 space-y-2">
                  {resume.data.skills.map((skill) => (
                    <div key={skill.id} className="flex gap-2 items-center">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        placeholder="Ex: React"
                        className="flex-1"
                      />
                      <Select value={skill.level} onValueChange={(v) => updateSkill(skill.id, { level: v as Skill["level"] })}>
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                          <SelectItem value="Especialista">Especialista</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" className="text-destructive h-9 w-9 p-0 shrink-0" onClick={() => removeSkill(skill.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  {resume.data.skills.length > 0 && <Separator className="my-2" />}
                  <Button variant="outline" className="w-full gap-2" onClick={addSkill}>
                    <Plus className="h-4 w-4" /> Adicionar habilidade
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="hidden lg:flex flex-1 overflow-auto bg-gray-200 items-start justify-center p-8">
          <div className="shadow-2xl">
            <ResumePreview data={resume.data} template={resume.template} id="resume-preview" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
