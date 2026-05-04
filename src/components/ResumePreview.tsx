import type { Resume, ResumeData, PersonalInfo } from "@/types/resume";
import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template?: Resume["template"];
  id?: string;
}

type Accent = {
  primary: string;
  secondary: string;
  soft: string;
  ink: string;
};

const MODERN: Accent = {
  primary: "#0D9488",
  secondary: "#2563eb",
  soft: "#e6fffb",
  ink: "#0F2744",
};

const EXECUTIVE: Accent = {
  primary: "#2DD4BF",
  secondary: "#38bdf8",
  soft: "#0f334d",
  ink: "#081827",
};

const SKILL_LEVEL_WIDTH: Record<string, string> = {
  "Básico": "25%",
  "Intermediário": "50%",
  "Avançado": "75%",
  "Especialista": "100%",
  "Fluente": "90%",
  "Nativo": "100%",
};

export function ResumePreview({ data, template = "modern", id = "resume-preview" }: ResumePreviewProps) {
  if (template === "classic") return <ClassicTemplate id={id} data={data} />;
  if (template === "minimal") return <MinimalTemplate id={id} data={data} />;
  if (template === "executive") return <ExecutiveTemplate id={id} data={data} />;
  return <ModernTemplate id={id} data={data} />;
}

function getHeadline(data: ResumeData) {
  return data.experiences.find((exp) => exp.position.trim())?.position || "Profissão / Cargo desejado";
}

function getContactItems(pi: PersonalInfo, withPlaceholders = true) {
  return [
    { icon: Mail, value: pi.email, fallback: "email@exemplo.com" },
    { icon: Phone, value: pi.phone, fallback: "(00) 00000-0000" },
    { icon: MapPin, value: pi.location, fallback: "Cidade, UF" },
    { icon: Linkedin, value: pi.linkedin, fallback: "linkedin.com/in/seunome" },
    { icon: Globe, value: pi.website, fallback: "portfolio.com" },
  ].filter((item) => withPlaceholders || item.value);
}

function formatRange(startDate: string, endDate: string, current: boolean) {
  const start = startDate || "Início";
  const end = current ? "Atual" : endDate || "Fim";
  return `${start} - ${end}`;
}

function EmptyLine({ width = "100%", color = "#eef2f5" }: { width?: string; color?: string }) {
  return <span style={{ display: "block", width, height: 7, borderRadius: 999, backgroundColor: color }} />;
}

function PremiumSectionTitle({
  children,
  accent = MODERN.primary,
  ink = MODERN.ink,
}: {
  children: string;
  accent?: string;
  ink?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, backgroundColor: accent }} />
      <h2
        style={{
          color: ink,
          fontSize: 12,
          fontWeight: 850,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </h2>
      <span style={{ flex: 1, height: 1, backgroundColor: "#e7edf2" }} />
    </div>
  );
}

function ClassicSectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        borderBottom: "1px solid #cbd5e1",
        color: "#0F2744",
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: "0.14em",
        marginBottom: 12,
        paddingBottom: 5,
        textTransform: "uppercase",
      }}
    >
      {children}
    </h2>
  );
}

function MinimalSectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        color: "#64748b",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.18em",
        marginBottom: 14,
        textTransform: "uppercase",
      }}
    >
      {children}
    </h2>
  );
}

function ExecutiveSectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        color: "#0F2744",
        fontSize: 12,
        fontWeight: 850,
        letterSpacing: "0.13em",
        marginBottom: 12,
        textTransform: "uppercase",
      }}
    >
      {children}
    </h2>
  );
}

function SkillBar({
  name,
  level,
  color,
  muted = "#e8edf2",
  text = "#0F2744",
}: {
  name: string;
  level: string;
  color: string;
  muted?: string;
  text?: string;
}) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 4 }}>
        <span style={{ color: text, fontSize: 11, fontWeight: 750 }}>{name || "Habilidade"}</span>
        <span style={{ color: "#64748b", fontSize: 10, whiteSpace: "nowrap" }}>{level}</span>
      </div>
      <div style={{ backgroundColor: muted, borderRadius: 999, height: 5, overflow: "hidden" }}>
        <div style={{ backgroundColor: color, borderRadius: 999, height: "100%", width: SKILL_LEVEL_WIDTH[level] ?? "50%" }} />
      </div>
    </div>
  );
}

function SkillChip({ name, color = MODERN.primary }: { name: string; color?: string }) {
  return (
    <span
      style={{
        backgroundColor: `${color}14`,
        border: `1px solid ${color}30`,
        borderRadius: 999,
        color,
        display: "inline-flex",
        fontSize: 10,
        fontWeight: 750,
        marginBottom: 6,
        marginRight: 6,
        padding: "4px 9px",
      }}
    >
      {name || "Habilidade"}
    </span>
  );
}

function ModernTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const headline = getHeadline(data);

  return (
    <div
      id={id}
      className="bg-white font-sans text-sm"
      style={{ color: "#1f2937", minHeight: "297mm", padding: "18mm 19mm", width: "210mm" }}
    >
      <header style={{ borderBottom: "1px solid #dbe8ef", marginBottom: 24, paddingBottom: 20 }}>
        <div style={{ display: "flex", gap: 18, justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ backgroundColor: MODERN.primary, borderRadius: 999, height: 8, width: 34 }} />
              <span style={{ backgroundColor: MODERN.secondary, borderRadius: 999, height: 8, width: 8 }} />
            </div>
            <h1 style={{ color: MODERN.ink, fontSize: 38, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.04 }}>
              {pi.name || "Seu Nome"}
            </h1>
            <p style={{ color: MODERN.primary, fontSize: 14, fontWeight: 800, marginTop: 6 }}>
              {headline}
            </p>
          </div>
          {pi.photo && (
            <img
              src={pi.photo}
              alt="Foto"
              className="shrink-0 rounded-2xl object-cover"
              style={{ boxShadow: `0 0 0 4px ${MODERN.soft}`, height: 90, width: 90 }}
            />
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px", marginTop: 16 }}>
          {getContactItems(pi).map(({ icon: Icon, value, fallback }) => (
            <span
              key={fallback}
              style={{
                alignItems: "center",
                backgroundColor: value ? "#f8fafc" : "#fbfdff",
                border: "1px solid #e7edf2",
                borderRadius: 999,
                color: value ? "#475569" : "#94a3b8",
                display: "inline-flex",
                fontSize: 10.5,
                gap: 5,
                padding: "5px 9px",
              }}
            >
              <Icon size={11} style={{ color: MODERN.primary }} />
              {value || fallback}
            </span>
          ))}
        </div>
      </header>

      <section style={{ marginBottom: 22 }}>
        <PremiumSectionTitle>Resumo</PremiumSectionTitle>
        {pi.summary ? (
          <p style={{ color: "#475569", fontSize: 12.5, lineHeight: 1.65 }}>{pi.summary}</p>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine />
            <EmptyLine width="88%" />
            <EmptyLine width="64%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 22 }}>
        <PremiumSectionTitle>Experiência</PremiumSectionTitle>
        {experiences.length > 0 ? (
          <div style={{ display: "grid", gap: 15 }}>
            {experiences.map((exp) => (
              <article key={exp.id} style={{ borderLeft: `3px solid ${MODERN.primary}`, paddingLeft: 12 }}>
                <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ color: MODERN.ink, fontSize: 14, fontWeight: 850 }}>{exp.position || "Cargo"}</h3>
                    <p style={{ color: MODERN.primary, fontSize: 12, fontWeight: 750, marginTop: 2 }}>{exp.company || "Empresa"}</p>
                  </div>
                  <span style={{ color: "#64748b", fontSize: 10.5, fontWeight: 650, whiteSpace: "nowrap" }}>
                    {formatRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && <p style={{ color: "#475569", fontSize: 11.5, lineHeight: 1.55, marginTop: 6 }}>{exp.description}</p>}
              </article>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine width="72%" />
            <EmptyLine width="96%" />
            <EmptyLine width="80%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 22 }}>
        <PremiumSectionTitle>Formação</PremiumSectionTitle>
        {education.length > 0 ? (
          <div style={{ display: "grid", gap: 12 }}>
            {education.map((edu) => (
              <article key={edu.id} style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ color: MODERN.ink, fontSize: 13, fontWeight: 800 }}>
                    {edu.degree || "Grau"} em {edu.field || "Curso"}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: 11.5, marginTop: 2 }}>{edu.institution || "Instituição"}</p>
                </div>
                <span style={{ color: "#64748b", fontSize: 10.5, whiteSpace: "nowrap" }}>
                  {formatRange(edu.startDate, edu.endDate, edu.current)}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine width="68%" />
            <EmptyLine width="45%" />
          </div>
        )}
      </section>

      <div style={{ display: "grid", gap: 26, gridTemplateColumns: "1.35fr 0.8fr" }}>
        <section>
          <PremiumSectionTitle>Habilidades</PremiumSectionTitle>
          {skills.length > 0 ? (
            <div>
              {skills.map((skill) => <SkillChip key={skill.id} name={skill.name} />)}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 7 }}>
              <EmptyLine />
              <EmptyLine width="76%" />
            </div>
          )}
        </section>

        <section>
          <PremiumSectionTitle>Idiomas</PremiumSectionTitle>
          {languages.length > 0 ? (
            languages.map((lang) => <SkillBar key={lang.id} name={lang.name} level={lang.level} color={MODERN.secondary} />)
          ) : (
            <div style={{ display: "grid", gap: 7 }}>
              <EmptyLine width="90%" />
              <EmptyLine width="70%" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ClassicTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const headline = getHeadline(data);

  return (
    <div
      id={id}
      className="bg-white text-gray-800 font-serif text-sm"
      style={{ color: "#1f2937", minHeight: "297mm", padding: "20mm 22mm", width: "210mm" }}
    >
      <header style={{ marginBottom: 25, textAlign: "center" }}>
        {pi.photo && (
          <img
            src={pi.photo}
            alt="Foto"
            className="mx-auto mb-4 rounded-full object-cover"
            style={{ boxShadow: "0 0 0 4px #f1f5f9", height: 86, width: 86 }}
          />
        )}
        <h1 style={{ color: "#0F2744", fontSize: 32, fontWeight: 800, letterSpacing: "0.08em", lineHeight: 1.15, textTransform: "uppercase" }}>
          {pi.name || "Seu Nome"}
        </h1>
        <p style={{ color: "#475569", fontSize: 13, fontStyle: "italic", marginTop: 7 }}>{headline}</p>
        <div style={{ backgroundColor: "#0F2744", height: 1, margin: "15px auto 10px", width: "72%" }} />
        <p style={{ color: "#475569", fontSize: 10.5, lineHeight: 1.7 }}>
          {(pi.email || "email@exemplo.com")}
          {"  |  "}
          {(pi.phone || "(00) 00000-0000")}
          {"  |  "}
          {(pi.location || "Cidade, UF")}
          {pi.linkedin ? `  |  ${pi.linkedin}` : ""}
          {pi.website ? `  |  ${pi.website}` : ""}
        </p>
      </header>

      <section style={{ marginBottom: 20 }}>
        <ClassicSectionTitle>Resumo Profissional</ClassicSectionTitle>
        {pi.summary ? (
          <p style={{ color: "#334155", fontSize: 12.5, lineHeight: 1.65, textAlign: "justify" }}>{pi.summary}</p>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine />
            <EmptyLine width="86%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 20 }}>
        <ClassicSectionTitle>Experiência Profissional</ClassicSectionTitle>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <article key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ color: "#0F2744", fontSize: 13.5, fontWeight: 800 }}>{exp.position || "Cargo"}</h3>
                  <p style={{ color: "#475569", fontSize: 12, fontStyle: "italic", marginTop: 2 }}>{exp.company || "Empresa"}</p>
                </div>
                <span style={{ color: "#64748b", fontSize: 10.5, whiteSpace: "nowrap" }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</span>
              </div>
              {exp.description && <p style={{ color: "#334155", fontSize: 11.5, lineHeight: 1.55, marginTop: 5 }}>{exp.description}</p>}
            </article>
          ))
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine width="72%" />
            <EmptyLine width="92%" />
            <EmptyLine width="78%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 20 }}>
        <ClassicSectionTitle>Formação Acadêmica</ClassicSectionTitle>
        {education.length > 0 ? (
          education.map((edu) => (
            <article key={edu.id} style={{ display: "flex", gap: 16, justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <h3 style={{ color: "#0F2744", fontSize: 12.5, fontWeight: 800 }}>
                  {edu.degree || "Grau"} em {edu.field || "Curso"}
                </h3>
                <p style={{ color: "#475569", fontSize: 11.5, fontStyle: "italic" }}>{edu.institution || "Instituição"}</p>
              </div>
              <span style={{ color: "#64748b", fontSize: 10.5, whiteSpace: "nowrap" }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</span>
            </article>
          ))
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <EmptyLine width="68%" />
            <EmptyLine width="45%" />
          </div>
        )}
      </section>

      <div style={{ display: "grid", gap: 28, gridTemplateColumns: "1fr 0.85fr" }}>
        <section>
          <ClassicSectionTitle>Habilidades</ClassicSectionTitle>
          {skills.length > 0 ? (
            <div style={{ columns: 2 }}>
              {skills.map((skill) => (
                <p key={skill.id} style={{ color: "#334155", fontSize: 11.5, lineHeight: 1.7, margin: 0 }}>
                  {skill.name || "Habilidade"} · {skill.level}
                </p>
              ))}
            </div>
          ) : (
            <EmptyLine width="80%" />
          )}
        </section>

        <section>
          <ClassicSectionTitle>Idiomas</ClassicSectionTitle>
          {languages.length > 0 ? (
            languages.map((lang) => (
              <p key={lang.id} style={{ color: "#334155", fontSize: 11.5, lineHeight: 1.7, margin: 0 }}>
                {lang.name || "Idioma"} · {lang.level}
              </p>
            ))
          ) : (
            <EmptyLine width="80%" />
          )}
        </section>
      </div>
    </div>
  );
}

function MinimalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const headline = getHeadline(data);

  return (
    <div
      id={id}
      className="bg-white font-sans text-sm"
      style={{ color: "#111827", minHeight: "297mm", padding: "22mm 24mm", width: "210mm" }}
    >
      <header style={{ display: "grid", gap: 18, gridTemplateColumns: pi.photo ? "1fr 76px" : "1fr", marginBottom: 32 }}>
        <div>
          <p style={{ color: "#0D9488", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", marginBottom: 9, textTransform: "uppercase" }}>
            {headline}
          </p>
          <h1 style={{ color: "#0F2744", fontSize: 40, fontWeight: 350, letterSpacing: "-0.03em", lineHeight: 1.04 }}>
            {pi.name || "Seu Nome"}
          </h1>
          <div style={{ color: "#64748b", display: "flex", flexWrap: "wrap", fontSize: 10.5, gap: "8px 16px", marginTop: 14 }}>
            <span>{pi.email || "email@exemplo.com"}</span>
            <span>{pi.phone || "(00) 00000-0000"}</span>
            <span>{pi.location || "Cidade, UF"}</span>
            {pi.linkedin && <span>{pi.linkedin}</span>}
            {pi.website && <span>{pi.website}</span>}
          </div>
        </div>
        {pi.photo && <img src={pi.photo} alt="Foto" className="rounded-xl object-cover" style={{ height: 76, width: 76 }} />}
      </header>

      <section style={{ marginBottom: 28 }}>
        <MinimalSectionTitle>Resumo</MinimalSectionTitle>
        {pi.summary ? (
          <p style={{ borderLeft: "2px solid #0D9488", color: "#475569", fontSize: 13, lineHeight: 1.75, paddingLeft: 14 }}>{pi.summary}</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <EmptyLine />
            <EmptyLine width="84%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 28 }}>
        <MinimalSectionTitle>Experiência</MinimalSectionTitle>
        {experiences.length > 0 ? (
          <div style={{ display: "grid", gap: 18 }}>
            {experiences.map((exp) => (
              <article key={exp.id} style={{ display: "grid", gap: 18, gridTemplateColumns: "95px 1fr" }}>
                <span style={{ color: "#94a3b8", fontSize: 10.5, lineHeight: 1.5 }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</span>
                <div>
                  <h3 style={{ color: "#0F2744", fontSize: 14, fontWeight: 750 }}>{exp.position || "Cargo"}</h3>
                  <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{exp.company || "Empresa"}</p>
                  {exp.description && <p style={{ color: "#475569", fontSize: 11.5, lineHeight: 1.6, marginTop: 6 }}>{exp.description}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <EmptyLine width="70%" />
            <EmptyLine width="94%" />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 28 }}>
        <MinimalSectionTitle>Formação</MinimalSectionTitle>
        {education.length > 0 ? (
          <div style={{ display: "grid", gap: 14 }}>
            {education.map((edu) => (
              <article key={edu.id} style={{ display: "grid", gap: 18, gridTemplateColumns: "95px 1fr" }}>
                <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</span>
                <div>
                  <h3 style={{ color: "#0F2744", fontSize: 13, fontWeight: 750 }}>
                    {edu.degree || "Grau"} em {edu.field || "Curso"}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: 11.5, marginTop: 2 }}>{edu.institution || "Instituição"}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyLine width="68%" />
        )}
      </section>

      <div style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr 0.8fr" }}>
        <section>
          <MinimalSectionTitle>Habilidades</MinimalSectionTitle>
          {skills.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ color: "#334155", fontSize: 11.5 }}>
                  {skill.name || "Habilidade"}
                </span>
              ))}
            </div>
          ) : (
            <EmptyLine width="78%" />
          )}
        </section>

        <section>
          <MinimalSectionTitle>Idiomas</MinimalSectionTitle>
          {languages.length > 0 ? (
            languages.map((lang) => (
              <p key={lang.id} style={{ color: "#334155", fontSize: 11.5, lineHeight: 1.7, margin: 0 }}>
                {lang.name || "Idioma"} · {lang.level}
              </p>
            ))
          ) : (
            <EmptyLine width="76%" />
          )}
        </section>
      </div>
    </div>
  );
}

function ExecutiveTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const headline = getHeadline(data);

  return (
    <div
      id={id}
      className="bg-white font-sans text-sm"
      style={{ color: "#1f2937", display: "flex", minHeight: "297mm", width: "210mm" }}
    >
      <aside style={{ backgroundColor: EXECUTIVE.ink, color: "white", padding: "18mm 10mm", width: "62mm" }}>
        {pi.photo && (
          <img
            src={pi.photo}
            alt="Foto"
            className="mb-7 rounded-2xl object-cover"
            style={{ boxShadow: "0 0 0 4px rgba(45,212,191,0.20)", height: 96, width: 96 }}
          />
        )}
        <div style={{ marginBottom: 26 }}>
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0.16em", marginBottom: 10, textTransform: "uppercase" }}>
            Contato
          </p>
          <div style={{ display: "grid", gap: 9 }}>
            {getContactItems(pi, false).length > 0 ? (
              getContactItems(pi, false).map(({ icon: Icon, value }) => (
                <span key={value} style={{ alignItems: "flex-start", color: "#d7e5ef", display: "flex", fontSize: 10.5, gap: 7, lineHeight: 1.4 }}>
                  <Icon size={12} style={{ color: EXECUTIVE.primary, marginTop: 1 }} />
                  {value}
                </span>
              ))
            ) : (
              <>
                <span style={{ color: "#d7e5ef", fontSize: 10.5 }}>email@exemplo.com</span>
                <span style={{ color: "#d7e5ef", fontSize: 10.5 }}>(00) 00000-0000</span>
                <span style={{ color: "#d7e5ef", fontSize: 10.5 }}>Cidade, UF</span>
              </>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 26 }}>
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0.16em", marginBottom: 10, textTransform: "uppercase" }}>
            Habilidades
          </p>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                level={skill.level}
                color={EXECUTIVE.primary}
                muted="rgba(255,255,255,0.14)"
                text="#ffffff"
              />
            ))
          ) : (
            <div style={{ display: "grid", gap: 7 }}>
              <EmptyLine color="rgba(255,255,255,0.16)" width="90%" />
              <EmptyLine color="rgba(255,255,255,0.16)" width="76%" />
            </div>
          )}
        </div>

        <div>
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0.16em", marginBottom: 10, textTransform: "uppercase" }}>
            Idiomas
          </p>
          {languages.length > 0 ? (
            languages.map((lang) => (
              <p key={lang.id} style={{ color: "#d7e5ef", fontSize: 10.5, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "white" }}>{lang.name || "Idioma"}</strong><br />
                {lang.level}
              </p>
            ))
          ) : (
            <EmptyLine color="rgba(255,255,255,0.16)" width="82%" />
          )}
        </div>
      </aside>

      <main style={{ flex: 1, padding: "18mm 18mm 18mm 15mm" }}>
        <header style={{ borderBottom: "1px solid #dbe8ef", marginBottom: 24, paddingBottom: 18 }}>
          <p style={{ color: EXECUTIVE.primary, fontSize: 11, fontWeight: 850, letterSpacing: "0.18em", marginBottom: 9, textTransform: "uppercase" }}>
            {headline}
          </p>
          <h1 style={{ color: "#0F2744", fontSize: 39, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
            {pi.name || "Seu Nome"}
          </h1>
        </header>

        <section style={{ marginBottom: 24 }}>
          <ExecutiveSectionTitle>Perfil Executivo</ExecutiveSectionTitle>
          {pi.summary ? (
            <p style={{ color: "#475569", fontSize: 12.5, lineHeight: 1.7 }}>{pi.summary}</p>
          ) : (
            <div style={{ display: "grid", gap: 7 }}>
              <EmptyLine />
              <EmptyLine width="86%" />
              <EmptyLine width="60%" />
            </div>
          )}
        </section>

        <section style={{ marginBottom: 24 }}>
          <ExecutiveSectionTitle>Experiência</ExecutiveSectionTitle>
          {experiences.length > 0 ? (
            <div style={{ display: "grid", gap: 16 }}>
              {experiences.map((exp) => (
                <article key={exp.id}>
                  <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ color: "#0F2744", fontSize: 14, fontWeight: 850 }}>{exp.position || "Cargo"}</h3>
                      <p style={{ color: EXECUTIVE.primary, fontSize: 12, fontWeight: 800, marginTop: 2 }}>{exp.company || "Empresa"}</p>
                    </div>
                    <span style={{ color: "#64748b", fontSize: 10.5, fontWeight: 650, whiteSpace: "nowrap" }}>
                      {formatRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: "#475569", fontSize: 11.5, lineHeight: 1.6, marginTop: 6 }}>{exp.description}</p>}
                </article>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 7 }}>
              <EmptyLine width="74%" />
              <EmptyLine width="92%" />
              <EmptyLine width="78%" />
            </div>
          )}
        </section>

        <section>
          <ExecutiveSectionTitle>Formação</ExecutiveSectionTitle>
          {education.length > 0 ? (
            education.map((edu) => (
              <article key={edu.id} style={{ display: "flex", gap: 16, justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h3 style={{ color: "#0F2744", fontSize: 13, fontWeight: 800 }}>
                    {edu.degree || "Grau"} em {edu.field || "Curso"}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: 11.5, marginTop: 2 }}>{edu.institution || "Instituição"}</p>
                </div>
                <span style={{ color: "#64748b", fontSize: 10.5, whiteSpace: "nowrap" }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</span>
              </article>
            ))
          ) : (
            <EmptyLine width="68%" />
          )}
        </section>
      </main>
    </div>
  );
}
