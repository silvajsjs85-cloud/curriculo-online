import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData, Experience, Education } from "@/types/resume";
import { User, Briefcase, GraduationCap, Code, Globe, Award, Settings, Plus, Trash2, Palette, Type, Layout, Upload, Camera } from "lucide-react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { ResumePreview } from "./ResumePreview";
import { useRef } from "react";

interface ResumeFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

const resumeTemplates = [
  { id: "modern", name: "Moderno", desc: "Design elegante com cores suaves." },
  { id: "classic", name: "Clássico", desc: "Formal, limpo e direto." },
  { id: "creative", name: "Criativo", desc: "Ousado, com fundo escuro no topo." },
] as const;

export const ResumeForm = ({ data, onUpdate }: ResumeFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo("photo", "");
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      role: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onUpdate({ experiences: [...data.experiences, newExp] });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      course: "",
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    };
    onUpdate({ education: [...data.education, newEdu] });
  };

  const updateSkill = (skillsStr: string) => {
    const skillList = skillsStr.split(",").map(s => s.trim()).filter(s => s !== "");
    onUpdate({ skills: skillList });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs defaultValue="pessoal" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-8 h-auto flex-wrap">
          <TabsTrigger value="pessoal" className="gap-2 py-3"><User className="h-4 w-4" /> <span className="hidden lg:inline">Pessoal</span></TabsTrigger>
          <TabsTrigger value="experiencia" className="gap-2 py-3"><Briefcase className="h-4 w-4" /> <span className="hidden lg:inline">Exp.</span></TabsTrigger>
          <TabsTrigger value="formacao" className="gap-2 py-3"><GraduationCap className="h-4 w-4" /> <span className="hidden lg:inline">Educação</span></TabsTrigger>
          <TabsTrigger value="habilidades" className="gap-2 py-3"><Code className="h-4 w-4" /> <span className="hidden lg:inline">Habil.</span></TabsTrigger>
          <TabsTrigger value="modelos" className="gap-2 py-3"><Layout className="h-4 w-4" /> <span className="hidden lg:inline">Modelos</span></TabsTrigger>
          <TabsTrigger value="design" className="gap-2 py-3"><Settings className="h-4 w-4" /> <span className="hidden lg:inline">Design</span></TabsTrigger>
          <TabsTrigger value="extra" className="gap-2 py-3"><Plus className="h-4 w-4" /> <span className="hidden lg:inline">Extra</span></TabsTrigger>
        </TabsList>

        <TabsContent value="pessoal" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input id="fullName" value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo("fullName", e.target.value)} placeholder="Ex: João Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredRole">Cargo Desejado</Label>
              <Input id="desiredRole" value={data.personalInfo.desiredRole} onChange={(e) => updatePersonalInfo("desiredRole", e.target.value)} placeholder="Ex: Desenvolvedor Frontend" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} placeholder="joao@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Cidade/Estado</Label>
              <Input id="location" value={data.personalInfo.location} onChange={(e) => updatePersonalInfo("location", e.target.value)} placeholder="São Paulo, SP" />
            </div>
            <div className="col-span-full space-y-4 pt-2">
              <Label>Foto do Perfil</Label>
              <div className="flex flex-col md:flex-row items-center gap-6 p-4 border-2 border-dashed rounded-xl bg-secondary/10">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-2xl overflow-hidden bg-secondary flex items-center justify-center border-2 border-white shadow-md relative">
                    {data.personalInfo.photo ? (
                      <img src={data.personalInfo.photo} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <Camera className="h-10 w-10 text-muted-foreground/40" />
                    )}
                  </div>
                  {data.personalInfo.photo && (
                    <button 
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <p className="text-sm text-muted-foreground">
                    Carregue uma foto profissional para aumentar suas chances de contratação.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" /> {data.personalInfo.photo ? "Trocar foto" : "Carregar foto"}
                    </Button>
                    <div className="w-full mt-2">
                      <Label htmlFor="photo" className="text-xs text-muted-foreground mb-1 block">Ou cole a URL da imagem abaixo:</Label>
                      <Input 
                        id="photo" 
                        className="h-8 text-xs" 
                        value={data.personalInfo.photo} 
                        onChange={(e) => updatePersonalInfo("photo", e.target.value)} 
                        placeholder="https://link-da-sua-foto.jpg" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full space-y-2">
              <Label htmlFor="summary">Resumo Profissional</Label>
              <Textarea id="summary" className="h-32" value={data.summary} onChange={(e) => onUpdate({ summary: e.target.value })} placeholder="Conte um pouco sobre sua trajetória profissional..." />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="experiencia" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Experiência Profissional</h3>
            <Button onClick={addExperience} size="sm" className="gap-2"><Plus className="h-4 w-4" /> Adicionar</Button>
          </div>
          {data.experiences.map((exp, index) => (
            <Card key={exp.id} className="p-6 relative group">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                onClick={() => onUpdate({ experiences: data.experiences.filter(e => e.id !== exp.id) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Input value={exp.role} onChange={(e) => {
                    const newExp = [...data.experiences];
                    newExp[index].role = e.target.value;
                    onUpdate({ experiences: newExp });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input value={exp.company} onChange={(e) => {
                    const newExp = [...data.experiences];
                    newExp[index].company = e.target.value;
                    onUpdate({ experiences: newExp });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Início</Label>
                  <Input value={exp.startDate} onChange={(e) => {
                    const newExp = [...data.experiences];
                    newExp[index].startDate = e.target.value;
                    onUpdate({ experiences: newExp });
                  }} placeholder="MM/AAAA" />
                </div>
                <div className="space-y-2">
                  <Label>Fim</Label>
                  <Input disabled={exp.current} value={exp.endDate} onChange={(e) => {
                    const newExp = [...data.experiences];
                    newExp[index].endDate = e.target.value;
                    onUpdate({ experiences: newExp });
                  }} placeholder="MM/AAAA" />
                </div>
                <div className="flex items-center gap-2 col-span-full">
                  <Checkbox id={`current-${exp.id}`} checked={exp.current} onCheckedChange={(val) => {
                    const newExp = [...data.experiences];
                    newExp[index].current = val as boolean;
                    onUpdate({ experiences: newExp });
                  }} />
                  <Label htmlFor={`current-${exp.id}`}>Trabalho atualmente aqui</Label>
                </div>
                <div className="col-span-full space-y-2">
                  <Label>Descrição</Label>
                  <Textarea value={exp.description} onChange={(e) => {
                    const newExp = [...data.experiences];
                    newExp[index].description = e.target.value;
                    onUpdate({ experiences: newExp });
                  }} />
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="formacao" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
            <Button onClick={addEducation} size="sm" className="gap-2"><Plus className="h-4 w-4" /> Adicionar</Button>
          </div>
          {data.education.map((edu, index) => (
            <Card key={edu.id} className="p-6 relative group">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                onClick={() => onUpdate({ education: data.education.filter(e => e.id !== edu.id) })}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-full space-y-2">
                  <Label>Curso</Label>
                  <Input value={edu.course} onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].course = e.target.value;
                    onUpdate({ education: newEdu });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Instituição</Label>
                  <Input value={edu.institution} onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].institution = e.target.value;
                    onUpdate({ education: newEdu });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Grau</Label>
                  <Input value={edu.degree} onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].degree = e.target.value;
                    onUpdate({ education: newEdu });
                  }} />
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="habilidades" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habilidades</h3>
            <p className="text-sm text-muted-foreground">Adicione suas habilidades separadas por vírgula.</p>
            <Textarea placeholder="Ex: JavaScript, React, Node.js, Inglês fluente..." value={data.skills.join(", ")} onChange={(e) => updateSkill(e.target.value)} className="h-32" />
          </div>
        </TabsContent>

        <TabsContent value="modelos" className="space-y-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Escolha um Modelo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resumeTemplates.map((temp) => (
              <div key={temp.id} className="flex flex-col gap-4">
                <button
                  className={cn(
                    "relative aspect-[1/1.414] w-full border-2 rounded-xl overflow-hidden transition-all text-left group shadow-lg bg-white",
                    data.template === temp.id ? "border-primary ring-4 ring-primary/20 scale-[1.02]" : "border-border hover:border-primary/50"
                  )}
                  onClick={() => onUpdate({ template: temp.id })}
                >
                  {/* Real mini-preview using the ResumePreview component */}
                  <div className="absolute inset-0 pointer-events-none origin-top-left" style={{ width: '400%', height: '400%', transform: 'scale(0.25)' }}>
                    <ResumePreview 
                      data={{ ...data, template: temp.id }} 
                      className="shadow-none border-none p-0"
                    />
                  </div>
                  
                  {/* Overlay for selection state */}
                  {data.template === temp.id && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center pointer-events-none rounded-xl">
                      <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                        <Plus className="h-6 w-6 rotate-45" />
                      </div>
                    </div>
                  )}
                </button>
                <div className="text-center">
                  <span className="font-bold text-base block">{temp.name}</span>
                  <span className="text-xs text-muted-foreground">{temp.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Palette className="h-4 w-4" /> Cor do Tema</Label>
              <div className="flex flex-wrap gap-2">
                {["#3b82f6", "#10b981", "#8b5cf6", "#f43f5e", "#0f172a", "#2563eb"].map((color) => (
                  <button key={color} className={cn("w-8 h-8 rounded-full border-2", data.themeColor === color ? "border-primary scale-110" : "border-transparent")} style={{ backgroundColor: color }} onClick={() => onUpdate({ themeColor: color })} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Type className="h-4 w-4" /> Fonte</Label>
              <Select value={data.fontFamily} onValueChange={(val) => onUpdate({ fontFamily: val })}>
                <SelectTrigger><SelectValue placeholder="Escolha uma fonte" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Sans Serif (Inter)</SelectItem>
                  <SelectItem value="Merriweather">Serif (Merriweather)</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <Checkbox id="showPhoto" checked={data.showPhoto} onCheckedChange={(val) => onUpdate({ showPhoto: val as boolean })} />
              <Label htmlFor="showPhoto" className="font-bold">Exibir foto no currículo</Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="extra" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações Adicionais</h3>
            <Textarea 
              placeholder="Cursos, certificações, projetos ou qualquer outra informação relevante..." 
              value={data.additionalInfo} 
              onChange={(e) => onUpdate({ additionalInfo: e.target.value })} 
              className="h-32" 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
