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

function ModernTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills } = data;
  return (
    <div id={id} className="bg-white text-gray-800 font-sans text-sm" style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}>
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{pi.name || "Seu Nome"}</h1>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
            {pi.email && <span className="flex items-center gap-1"><Mail size={12} />{pi.email}</span>}
            {pi.phone && <span className="flex items-center gap-1"><Phone size={12} />{pi.phone}</span>}
            {pi.location && <span className="flex items-center gap-1"><MapPin size={12} />{pi.location}</span>}
            {pi.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} />{pi.linkedin}</span>}
            {pi.website && <span className="flex items-center gap-1"><Globe size={12} />{pi.website}</span>}
          </div>
        </div>
        {pi.photo && (
          <img src={pi.photo} alt="Foto" className="rounded-full object-cover shrink-0" style={{ width: 80, height: 80 }} />
        )}
      </div>

      {pi.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Resumo Profissional</h2>
          <p className="text-gray-700 leading-relaxed">{pi.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">Experiência Profissional</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? "Atual" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="mt-1 text-gray-600 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">Formação Acadêmica</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} em {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {edu.startDate} – {edu.current ? "Atual" : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {skill.name} · {skill.level}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ClassicTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills } = data;
  return (
    <div id={id} className="bg-white text-gray-800 font-serif text-sm" style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        {pi.photo && (
          <img src={pi.photo} alt="Foto" className="rounded-full object-cover mx-auto mb-3" style={{ width: 90, height: 90 }} />
        )}
        <h1 className="text-3xl font-bold tracking-widest uppercase">{pi.name || "Seu Nome"}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>| {pi.phone}</span>}
          {pi.location && <span>| {pi.location}</span>}
          {pi.linkedin && <span>| {pi.linkedin}</span>}
        </div>
      </div>

      {pi.summary && (
        <section className="mb-5">
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">Objetivo</h2>
          <p className="leading-relaxed">{pi.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">Experiência</h2>
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
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">Formação</h2>
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

      {skills.length > 0 && (
        <section>
          <h2 className="font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">Habilidades</h2>
          <p>{skills.map((s) => `${s.name} (${s.level})`).join(" · ")}</p>
        </section>
      )}
    </div>
  );
}

function MinimalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills } = data;
  return (
    <div id={id} className="bg-white text-gray-900 font-sans text-sm" style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-light tracking-tight">{pi.name || "Seu Nome"}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            {pi.email && <span>{pi.email}</span>}
            {pi.phone && <span>{pi.phone}</span>}
            {pi.location && <span>{pi.location}</span>}
            {pi.linkedin && <span>{pi.linkedin}</span>}
          </div>
        </div>
        {pi.photo && (
          <img src={pi.photo} alt="Foto" className="rounded-lg object-cover shrink-0" style={{ width: 75, height: 75 }} />
        )}
      </div>

      {pi.summary && (
        <section className="mb-6">
          <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4">{pi.summary}</p>
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

      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="text-xs border border-gray-200 px-2 py-0.5 rounded">{s.name}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
