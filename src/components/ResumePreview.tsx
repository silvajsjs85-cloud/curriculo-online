import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template?: "modern" | "classic" | "minimal";
  id?: string;
}

export function ResumePreview({ data, template = "modern", id = "resume-preview" }: ResumePreviewProps) {
  if (template === "classic") return <ClassicTemplate id={id} data={data} />;
  if (template === "minimal") return <MinimalTemplate id={id} data={data} />;
  return <ModernTemplate id={id} data={data} />;
}

const SKILL_LEVEL_WIDTH: Record<string, string> = {
  "Básico": "25%",
  "Intermediário": "50%",
  "Avançado": "75%",
  "Especialista": "100%",
  "Fluente": "90%",
  "Nativo": "100%",
};

function SkillBar({ name, level, color }: { name: string; level: string; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#0F2744" }}>{name || "Habilidade"}</span>
        <span style={{ fontSize: 10, color: "#64748b", whiteSpace: "nowrap" }}>{level}</span>
      </div>
      <div style={{ height: 5, backgroundColor: "#e8edf2", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: SKILL_LEVEL_WIDTH[level] ?? "50%", backgroundColor: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

function SectionTitle({ children, color = "#0D9488" }: { children: string; color?: string }) {
  return (
    <h2
      style={{
        color,
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </h2>
  );
}

function EmptyLine({ width = "100%" }: { width?: string }) {
  return <span style={{ display: "block", width, height: 7, borderRadius: 999, backgroundColor: "#eef2f5" }} />;
}

function ModernTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const contactItems = [
    { icon: Mail, value: pi.email, placeholder: "email@exemplo.com" },
    { icon: Phone, value: pi.phone, placeholder: "(00) 00000-0000" },
    { icon: MapPin, value: pi.location, placeholder: "Cidade, UF" },
  ];

  return (
    <div
      id={id}
      className="bg-white font-sans text-sm"
      style={{ width: "210mm", minHeight: "297mm", padding: "19mm 20mm", color: "#1f2937" }}
    >
      <div className="mb-6 flex items-start justify-between gap-5 pb-5" style={{ borderBottom: "3px solid #0D9488" }}>
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold leading-tight" style={{ color: "#0F2744", letterSpacing: "0.01em" }}>
            {pi.name || "Seu Nome"}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {contactItems.map(({ icon: Icon, value, placeholder }) => (
              <span
                key={placeholder}
                className="flex items-center gap-1.5"
                style={{ color: value ? "#475569" : "#94a3b8", opacity: value ? 1 : 0.75 }}
              >
                <Icon size={12} style={{ color: "#0D9488" }} />
                {value || placeholder}
              </span>
            ))}
            {pi.linkedin && <span className="flex items-center gap-1.5 text-slate-600"><Linkedin size={12} style={{ color: "#0D9488" }} />{pi.linkedin}</span>}
            {pi.website && <span className="flex items-center gap-1.5 text-slate-600"><Globe size={12} style={{ color: "#0D9488" }} />{pi.website}</span>}
          </div>
        </div>
        {pi.photo && (
          <img
            src={pi.photo}
            alt="Foto"
            className="shrink-0 rounded-full object-cover"
            style={{ width: 86, height: 86, boxShadow: "0 0 0 4px #ccfbf1" }}
          />
        )}
      </div>

      <section className="mb-5">
        <SectionTitle>Resumo Profissional</SectionTitle>
        {pi.summary ? (
          <p className="leading-relaxed" style={{ color: "#475569" }}>{pi.summary}</p>
        ) : (
          <div className="space-y-2">
            <EmptyLine />
            <EmptyLine width="88%" />
            <EmptyLine width="64%" />
          </div>
        )}
      </section>

      <section className="mb-5">
        <SectionTitle>Experiência Profissional</SectionTitle>
        {experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: "#0F2744" }}>{exp.position || "Cargo"}</h3>
                    <p className="font-semibold" style={{ color: "#0D9488" }}>{exp.company || "Empresa"}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate || "Início"} - {exp.current ? "Atual" : exp.endDate || "Fim"}
                  </span>
                </div>
                {exp.description && <p className="mt-1 text-gray-600 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <EmptyLine width="72%" />
            <EmptyLine width="96%" />
            <EmptyLine width="80%" />
          </div>
        )}
      </section>

      <section className="mb-5">
        <SectionTitle>Formação Acadêmica</SectionTitle>
        {education.length > 0 ? (
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold" style={{ color: "#0F2744" }}>{edu.degree || "Grau"} em {edu.field || "Curso"}</h3>
                  <p className="text-gray-600">{edu.institution || "Instituição"}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {edu.startDate || "Início"} - {edu.current ? "Atual" : edu.endDate || "Fim"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <EmptyLine width="68%" />
            <EmptyLine width="45%" />
          </div>
        )}
      </section>

      <div className="flex gap-8">
        {skills.length > 0 && (
          <section className="flex-1">
            <SectionTitle>Habilidades</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {skills.map((skill) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} color="#0D9488" />
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ minWidth: 130 }}>
            <SectionTitle>Idiomas</SectionTitle>
            {languages.map((lang) => (
              <SkillBar key={lang.id} name={lang.name} level={lang.level} color="#7c3aed" />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function ClassicTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  return (
    <div id={id} className="bg-white text-gray-800 font-serif text-sm" style={{ width: "210mm", minHeight: "297mm", padding: "20mm", color: "#1f2937" }}>
      <div className="text-center pb-5 mb-6" style={{ borderBottom: "2px solid #0F2744" }}>
        {pi.photo && (
          <img src={pi.photo} alt="Foto" className="rounded-full object-cover mx-auto mb-3" style={{ width: 90, height: 90, boxShadow: "0 0 0 4px #f1f5f9" }} />
        )}
        <h1 className="text-3xl font-bold tracking-widest uppercase" style={{ color: "#0F2744" }}>{pi.name || "Seu Nome"}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
          <span>{pi.email || "email@exemplo.com"}</span>
          <span>| {pi.phone || "(00) 00000-0000"}</span>
          <span>| {pi.location || "Cidade, UF"}</span>
          {pi.linkedin && <span>| {pi.linkedin}</span>}
        </div>
      </div>

      {pi.summary && (
        <section className="mb-5">
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2" style={{ color: "#0F2744" }}>Objetivo</h2>
          <p className="leading-relaxed">{pi.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color: "#0F2744" }}>Experiência</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <strong>{exp.position}</strong>
                <span className="text-xs">{exp.startDate} – {exp.current ? "Atual" : exp.endDate}</span>
              </div>
              <p className="italic text-gray-600">{exp.company}</p>
              {exp.description && <p className="mt-1">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color: "#0F2744" }}>Formação</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <strong>{edu.degree} em {edu.field}</strong>
                <p className="italic text-gray-600">{edu.institution}</p>
              </div>
              <span className="text-xs">{edu.startDate} – {edu.current ? "Atual" : edu.endDate}</span>
            </div>
          ))}
        </section>
      )}

      <div className="flex gap-8">
        {skills.length > 0 && (
          <section className="flex-1">
            <h2 className="font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color: "#0F2744" }}>Habilidades</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {skills.map((skill) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} color="#374151" />
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ minWidth: 130 }}>
            <h2 className="font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3" style={{ color: "#0F2744" }}>Idiomas</h2>
            {languages.map((lang) => (
              <SkillBar key={lang.id} name={lang.name} level={lang.level} color="#6b7280" />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  return (
    <div id={id} className="bg-white text-gray-900 font-sans text-sm" style={{ width: "210mm", minHeight: "297mm", padding: "20mm", color: "#111827" }}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-light tracking-tight" style={{ color: "#0F2744" }}>{pi.name || "Seu Nome"}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            <span>{pi.email || "email@exemplo.com"}</span>
            <span>{pi.phone || "(00) 00000-0000"}</span>
            <span>{pi.location || "Cidade, UF"}</span>
            {pi.linkedin && <span>{pi.linkedin}</span>}
          </div>
        </div>
        {pi.photo && (
          <img src={pi.photo} alt="Foto" className="rounded-lg object-cover shrink-0" style={{ width: 75, height: 75 }} />
        )}
      </div>

      {pi.summary && (
        <section className="mb-6">
          <p className="text-gray-600 leading-relaxed border-l-2 pl-4" style={{ borderColor: "#0D9488" }}>{pi.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experiência</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-4 grid grid-cols-4 gap-2">
              <div className="text-xs text-gray-400 pt-0.5">
                {exp.startDate}<br />{exp.current ? "Atual" : exp.endDate}
              </div>
              <div className="col-span-3">
                <p className="font-medium">{exp.position}</p>
                <p className="text-gray-500">{exp.company}</p>
                {exp.description && <p className="mt-1 text-gray-600">{exp.description}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Formação</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 grid grid-cols-4 gap-2">
              <div className="text-xs text-gray-400 pt-0.5">
                {edu.startDate}<br />{edu.current ? "Atual" : edu.endDate}
              </div>
              <div className="col-span-3">
                <p className="font-medium">{edu.degree} em {edu.field}</p>
                <p className="text-gray-500">{edu.institution}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <div className="flex gap-10">
        {skills.length > 0 && (
          <section className="flex-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Habilidades</h2>
            {skills.map((skill) => (
              <SkillBar key={skill.id} name={skill.name} level={skill.level} color="#111827" />
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ minWidth: 130 }}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Idiomas</h2>
            {languages.map((lang) => (
              <SkillBar key={lang.id} name={lang.name} level={lang.level} color="#6b7280" />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
