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
  if (template === "creative") return <CreativeTemplate id={id} data={data} />;
  if (template === "technical") return <TechnicalTemplate id={id} data={data} />;
  if (template === "first_job") return <FirstJobTemplate id={id} data={data} />;
  if (template === "international") return <InternationalTemplate id={id} data={data} />;
  if (template === "institutional") return <InstitutionalTemplate id={id} data={data} />;
  if (template === "compact") return <CompactTemplate id={id} data={data} />;
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
          letterSpacing: "0",
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
        letterSpacing: "0",
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
        letterSpacing: "0",
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
        letterSpacing: "0",
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
            <h1 style={{ color: MODERN.ink, fontSize: 38, fontWeight: 900, letterSpacing: "0", lineHeight: 1.04 }}>
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
        <h1 style={{ color: "#0F2744", fontSize: 32, fontWeight: 800, letterSpacing: "0", lineHeight: 1.15, textTransform: "uppercase" }}>
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
          <p style={{ color: "#0D9488", fontSize: 11, fontWeight: 800, letterSpacing: "0", marginBottom: 9, textTransform: "uppercase" }}>
            {headline}
          </p>
          <h1 style={{ color: "#0F2744", fontSize: 40, fontWeight: 350, letterSpacing: "0", lineHeight: 1.04 }}>
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
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0", marginBottom: 10, textTransform: "uppercase" }}>
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
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0", marginBottom: 10, textTransform: "uppercase" }}>
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
          <p style={{ color: EXECUTIVE.primary, fontSize: 10, fontWeight: 850, letterSpacing: "0", marginBottom: 10, textTransform: "uppercase" }}>
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
          <p style={{ color: EXECUTIVE.primary, fontSize: 11, fontWeight: 850, letterSpacing: "0", marginBottom: 9, textTransform: "uppercase" }}>
            {headline}
          </p>
          <h1 style={{ color: "#0F2744", fontSize: 39, fontWeight: 900, letterSpacing: "0", lineHeight: 1.02 }}>
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

function CreativeTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const headline = getHeadline(data);
  const ACCENT = "#7F77DD";

  return (
    <div
      id={id}
      className="bg-white font-sans text-sm"
      style={{ display: "flex", minHeight: "297mm", width: "210mm" }}
    >
      <aside style={{ backgroundColor: ACCENT, color: "white", padding: "18mm 12mm", width: "70mm", display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          {pi.photo ? (
            <img src={pi.photo} alt="Foto" style={{ width: "140px", height: "140px", borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(255, 255, 255, 0.3)" }} />
          ) : (
            <div style={{ width: "140px", height: "140px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "4px solid rgba(255, 255, 255, 0.3)" }} />
          )}
        </div>

        <div>
          <h3 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "0", marginBottom: "15px", fontWeight: 600, borderBottom: "1px solid rgba(255, 255, 255, 0.3)", paddingBottom: "5px" }}>
            Contato
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {getContactItems(pi).map(({ icon: Icon, value, fallback }) => (
              <div key={fallback} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", wordBreak: "break-all" }}>
                <Icon size={16} style={{ opacity: 0.9 }} />
                <span>{value || fallback}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "0", marginBottom: "15px", fontWeight: 600, borderBottom: "1px solid rgba(255, 255, 255, 0.3)", paddingBottom: "5px" }}>
            Habilidades
          </h3>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", marginBottom: "5px", display: "block" }}>{skill.name}</span>
                <div style={{ height: "6px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ height: "100%", backgroundColor: "#FFFFFF", borderRadius: "10px", width: SKILL_LEVEL_WIDTH[skill.level] || "50%" }} />
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
               <EmptyLine color="rgba(255,255,255,0.2)" width="100%" />
               <EmptyLine color="rgba(255,255,255,0.2)" width="80%" />
            </div>
          )}
        </div>

        <div>
          <h3 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "0", marginBottom: "15px", fontWeight: 600, borderBottom: "1px solid rgba(255, 255, 255, 0.3)", paddingBottom: "5px" }}>
            Idiomas
          </h3>
          {languages.length > 0 ? (
            languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", marginBottom: "5px", display: "block" }}>{lang.name} - {lang.level}</span>
                <div style={{ height: "6px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ height: "100%", backgroundColor: "#FFFFFF", borderRadius: "10px", width: SKILL_LEVEL_WIDTH[lang.level] || "50%" }} />
                </div>
              </div>
            ))
          ) : (
             <EmptyLine color="rgba(255,255,255,0.2)" width="90%" />
          )}
        </div>
      </aside>

      <main style={{ flex: 1, padding: "20mm 15mm", display: "flex", flexDirection: "column", gap: "25px", backgroundColor: "#FFFFFF" }}>
        <div style={{ marginBottom: "10px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#333333", marginBottom: "5px", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0" }}>
            {pi.name || "Seu Nome"}
          </h1>
          <div style={{ fontSize: "18px", color: "#666666", fontWeight: 500, display: "inline-block", position: "relative" }}>
            {headline}
            <div style={{ position: "absolute", left: 0, bottom: "-2px", width: "100%", height: "3px", backgroundColor: ACCENT, opacity: 0.5 }} />
          </div>
          {pi.summary ? (
             <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, marginTop: "15px", textAlign: "justify" }}>{pi.summary}</p>
          ) : (
             <div style={{ marginTop: "15px", display: "grid", gap: 7 }}><EmptyLine width="100%" color="#f1f5f9" /><EmptyLine width="80%" color="#f1f5f9" /></div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#333333", textTransform: "uppercase", letterSpacing: "0", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "block", width: "24px", height: "3px", backgroundColor: ACCENT }} />
            Experiência
          </h2>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <div style={{ fontWeight: 600, fontSize: "15px", color: "#333333" }}>{exp.position || "Cargo"}</div>
                  <div style={{ fontSize: "12px", color: ACCENT, fontWeight: 500 }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#333333", fontWeight: 500, marginBottom: "6px" }}>{exp.company || "Empresa"}</div>
                {exp.description && <p style={{ fontSize: "13px", color: "#666666", lineHeight: 1.5, textAlign: "justify" }}>{exp.description}</p>}
              </div>
            ))
          ) : (
             <div style={{ display: "grid", gap: 7 }}><EmptyLine width="80%" /><EmptyLine width="100%" /></div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#333333", textTransform: "uppercase", letterSpacing: "0", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "block", width: "24px", height: "3px", backgroundColor: ACCENT }} />
            Formação
          </h2>
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <div style={{ fontWeight: 600, fontSize: "15px", color: "#333333" }}>{edu.degree || "Grau"} em {edu.field || "Curso"}</div>
                  <div style={{ fontSize: "12px", color: ACCENT, fontWeight: 500 }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#333333", fontWeight: 500 }}>{edu.institution || "Instituição"}</div>
              </div>
            ))
          ) : (
             <EmptyLine width="60%" />
          )}
        </div>
      </main>
    </div>
  );
}

function TechnicalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const ACCENT = "#378ADD";
  const TEXT = "#111111";
  const TEXT_LIGHT = "#4B5563";
  const BORDER = "#E5E7EB";

  return (
    <div
      id={id}
      className="bg-white text-sm"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: TEXT,
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm 20mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ borderBottom: `2px solid ${TEXT}`, paddingBottom: "20px", marginBottom: "25px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "15px", marginBottom: "12px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "0", textTransform: "uppercase", margin: 0 }}>
            {pi.name || "Seu Nome"}
          </h1>
          <div style={{ fontSize: "20px", fontWeight: 600, color: ACCENT }}>
            {getHeadline(data)}
          </div>
        </div>
        
        <div style={{ fontSize: "13px", color: TEXT_LIGHT, marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "15px", fontWeight: 500 }}>
          {getContactItems(pi).map(({ icon: Icon, value, fallback }, index) => (
            <span key={fallback} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {index > 0 && <span style={{ marginRight: "10px" }}>&bull;</span>}
              {value || fallback}
            </span>
          ))}
        </div>
        
        {pi.summary ? (
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: TEXT_LIGHT, textAlign: "justify" }}>
            {pi.summary}
          </p>
        ) : (
          <div style={{ display: "grid", gap: 7 }}><EmptyLine width="100%" color="#f1f5f9" /><EmptyLine width="80%" color="#f1f5f9" /></div>
        )}
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "25px", paddingRight: "30px", borderRight: `1px solid ${BORDER}` }}>
          
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", marginBottom: "18px", color: TEXT, letterSpacing: "0" }}>
              Experiência
            </h2>
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>{exp.position || "Cargo"}</div>
                    <div style={{ fontSize: "12px", color: TEXT_LIGHT, fontWeight: 500, fontFamily: "'Courier New', Courier, monospace" }}>
                      {formatRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: ACCENT, marginBottom: "6px" }}>
                    {exp.company || "Empresa"}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: "13px", lineHeight: 1.5, color: TEXT_LIGHT, textAlign: "justify" }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div style={{ display: "grid", gap: 7 }}><EmptyLine width="80%" /><EmptyLine width="100%" /></div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", marginBottom: "18px", color: TEXT, letterSpacing: "0" }}>
              Formação
            </h2>
            {education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>
                      {edu.degree || "Grau"} em {edu.field || "Curso"}
                    </div>
                    <div style={{ fontSize: "12px", color: TEXT_LIGHT, fontWeight: 500, fontFamily: "'Courier New', Courier, monospace" }}>
                      {formatRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: ACCENT }}>
                    {edu.institution || "Instituição"}
                  </div>
                </div>
              ))
            ) : (
              <EmptyLine width="60%" />
            )}
          </section>

        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "25px", paddingLeft: "30px" }}>
          
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", marginBottom: "18px", color: TEXT, letterSpacing: "0" }}>
              Habilidades Técnicas
            </h2>
            {skills.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      fontFamily: "'Courier New', Courier, monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      backgroundColor: "#F9FAFB",
                      border: `1px solid ${BORDER}`,
                      borderRadius: "4px",
                      color: TEXT,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyLine width="100%" />
            )}
          </section>

          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase", marginBottom: "18px", color: TEXT, letterSpacing: "0" }}>
              Idiomas
            </h2>
            {languages.length > 0 ? (
              languages.map((lang, index) => (
                <div
                  key={lang.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: index < languages.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>{lang.name}</span>
                  <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{lang.level}</span>
                </div>
              ))
            ) : (
              <EmptyLine width="80%" />
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

function FirstJobTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const ACCENT = "#1D9E75";
  const ACCENT_LIGHT = "#E1F5EE";
  const TEXT = "#1F2937";
  const TEXT_LIGHT = "#4B5563";

  return (
    <div
      id={id}
      className="bg-white text-sm"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: TEXT,
        width: "210mm",
        minHeight: "297mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ textAlign: "center", padding: "14mm 15mm 12mm", backgroundColor: "#ffffff" }}>
        {pi.photo ? (
          <img src={pi.photo} alt="Foto" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 15px auto", border: `4px solid ${ACCENT_LIGHT}`, display: "block" }} />
        ) : (
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", backgroundColor: ACCENT_LIGHT, border: `4px solid ${ACCENT_LIGHT}`, margin: "0 auto 15px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: ACCENT, fontSize: "32px", fontWeight: 800 }}>{pi.name?.charAt(0) || "U"}</span>
          </div>
        )}
        
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: TEXT, marginBottom: "5px", letterSpacing: "0" }}>
          {pi.name || "Seu Nome"}
        </h1>
        <div style={{ fontSize: "16px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", marginBottom: "18px" }}>
          {getHeadline(data)}
        </div>
        
        <div style={{ fontSize: "13px", color: TEXT_LIGHT, display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginBottom: "25px", fontWeight: 500 }}>
          {getContactItems(pi).map(({ icon: Icon, value, fallback }) => (
            <span key={fallback} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Icon size={14} style={{ color: ACCENT }} /> {value || fallback}
            </span>
          ))}
        </div>
        
        {pi.summary ? (
          <p style={{ fontSize: "14px", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto", color: TEXT_LIGHT, textAlign: "justify" }}>
            {pi.summary}
          </p>
        ) : (
          <div style={{ maxWidth: "600px", margin: "0 auto", display: "grid", gap: 7 }}><EmptyLine width="100%" color="#f1f5f9" /><EmptyLine width="80%" color="#f1f5f9" /></div>
        )}
      </header>

      <section style={{ padding: "10mm 15mm", backgroundColor: ACCENT_LIGHT }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: ACCENT, marginBottom: "25px", textTransform: "uppercase", textAlign: "center", letterSpacing: "0" }}>
          Formação Acadêmica
        </h2>
        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "15px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "baseline", marginBottom: "5px" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: TEXT }}>
                  {edu.degree || "Grau"} em {edu.field || "Curso"}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: ACCENT, backgroundColor: "#ffffff", padding: "4px 10px", borderRadius: "20px" }}>
                  {formatRange(edu.startDate, edu.endDate, edu.current)}
                </div>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: TEXT_LIGHT }}>
                {edu.institution || "Instituição"}
              </div>
            </div>
          ))
        ) : (
           <EmptyLine width="60%" />
        )}
      </section>

      <section style={{ padding: "10mm 15mm", backgroundColor: "#ffffff" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: ACCENT, marginBottom: "25px", textTransform: "uppercase", textAlign: "center", letterSpacing: "0" }}>
          Experiência & Atividades
        </h2>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "baseline", marginBottom: "5px" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: TEXT }}>
                  {exp.position || "Cargo"}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: ACCENT, backgroundColor: ACCENT_LIGHT, padding: "4px 10px", borderRadius: "20px" }}>
                  {formatRange(exp.startDate, exp.endDate, exp.current)}
                </div>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: TEXT_LIGHT, marginBottom: "8px" }}>
                {exp.company || "Empresa"}
              </div>
              {exp.description && (
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: TEXT_LIGHT, textAlign: "justify" }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <div style={{ display: "grid", gap: 7 }}><EmptyLine width="80%" /><EmptyLine width="100%" /></div>
        )}
      </section>

      <div style={{ display: "flex", flex: 1 }}>
        <section style={{ flex: 1, padding: "10mm 15mm", backgroundColor: ACCENT_LIGHT }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: ACCENT, marginBottom: "25px", textTransform: "uppercase", textAlign: "center", letterSpacing: "0" }}>
            Habilidades
          </h2>
          {skills.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{ backgroundColor: "#ffffff", padding: "12px", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(29, 158, 117, 0.05)" }}>
                  <div style={{ width: "32px", height: "32px", backgroundColor: ACCENT_LIGHT, color: ACCENT, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold" }}>
                     {skill.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: TEXT, textAlign: "center" }}>{skill.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyLine width="100%" />
          )}
        </section>

        <section style={{ flex: 1, padding: "10mm 15mm", backgroundColor: "#ffffff" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: ACCENT, marginBottom: "25px", textTransform: "uppercase", textAlign: "center", letterSpacing: "0" }}>
            Idiomas
          </h2>
          {languages.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ backgroundColor: "#ffffff", padding: "12px", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", border: `1px solid ${ACCENT_LIGHT}` }}>
                  <div style={{ width: "32px", height: "32px", backgroundColor: ACCENT_LIGHT, color: ACCENT, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold" }}>
                     {lang.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: TEXT, textAlign: "center", lineHeight: 1.2 }}>{lang.name} <br/> <span style={{ color: TEXT_LIGHT, fontWeight: 500, fontSize: "11px" }}>{lang.level}</span></span>
                </div>
              ))}
            </div>
          ) : (
             <EmptyLine width="80%" />
          )}
        </section>
      </div>

    </div>
  );
}

function InternationalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const ACCENT = "#185FA5";
  const TEXT_DARK = "#2C2C2A";
  const TEXT_LIGHT = "#555555";
  const BORDER = "#D1D5DB";

  return (
    <div
      id={id}
      className="bg-white text-sm"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: TEXT_DARK,
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 20mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "34px", fontWeight: 800, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", margin: 0, marginBottom: "5px" }}>
            {pi.name || "Seu Nome"}
          </h1>
          <div style={{ fontSize: "16px", fontWeight: 600, color: TEXT_DARK, textTransform: "uppercase", letterSpacing: "0" }}>
            {getHeadline(data)}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", color: TEXT_LIGHT, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "2px" }}>
          {getContactItems(pi, false).map(({ value }) => (
            value ? <span key={value}>{value}</span> : null
          ))}
          {!pi.email && !pi.phone && !pi.location && (
             <>
               <span>email@exemplo.com</span>
               <span>(00) 00000-0000</span>
               <span>Cidade, UF</span>
             </>
          )}
        </div>
      </header>

      <hr style={{ border: "none", height: "2px", backgroundColor: ACCENT, margin: 0, marginBottom: "30px" }} />

      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", textAlign: "right" }}>
            Resumo<br />Profissional
          </h2>
        </div>
        <div style={{ width: "75%" }}>
          {pi.summary ? (
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: TEXT_LIGHT, textAlign: "justify" }}>
              {pi.summary}
            </p>
          ) : (
            <div style={{ display: "grid", gap: 7 }}><EmptyLine width="100%" color="#f1f5f9" /><EmptyLine width="80%" color="#f1f5f9" /></div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", textAlign: "right" }}>
            Experiência
          </h2>
        </div>
        <div style={{ width: "75%" }}>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: TEXT_DARK }}>{exp.position || "Cargo"}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: TEXT_LIGHT }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: TEXT_DARK, marginBottom: "8px" }}>{exp.company || "Empresa"}</div>
                {exp.description && (
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: TEXT_LIGHT, textAlign: "justify" }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))
          ) : (
             <div style={{ display: "grid", gap: 7 }}><EmptyLine width="80%" /><EmptyLine width="100%" /></div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", textAlign: "right" }}>
            Formação
          </h2>
        </div>
        <div style={{ width: "75%" }}>
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: TEXT_DARK }}>{edu.degree || "Grau"} em {edu.field || "Curso"}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: TEXT_LIGHT }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: TEXT_DARK }}>{edu.institution || "Instituição"}</div>
              </div>
            ))
          ) : (
            <EmptyLine width="60%" />
          )}
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", textAlign: "right" }}>
            Idiomas
          </h2>
        </div>
        <div style={{ width: "75%" }}>
          {languages.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {languages.map((lang) => {
                let filledDots = 3;
                if (lang.level === "Básico") filledDots = 1;
                if (lang.level === "Intermediário") filledDots = 3;
                if (lang.level === "Avançado") filledDots = 4;
                if (lang.level === "Fluente" || lang.level === "Nativo") filledDots = 5;

                return (
                  <div key={lang.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F9FAFB", padding: "10px 15px", borderRadius: "6px", border: `1px solid ${BORDER}` }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: TEXT_DARK }}>{lang.name}</span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: dot <= filledDots ? ACCENT : BORDER }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
             <EmptyLine width="80%" />
          )}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0", textAlign: "right" }}>
            Habilidades
          </h2>
        </div>
        <div style={{ width: "75%" }}>
          {skills.length > 0 ? (
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: TEXT_LIGHT }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ display: "inline-block", fontWeight: 600, color: TEXT_DARK, backgroundColor: "#F3F4F6", padding: "2px 8px", borderRadius: "4px", marginRight: "5px", marginBottom: "5px", border: `1px solid ${BORDER}` }}>
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <EmptyLine width="100%" />
          )}
        </div>
      </div>

    </div>
  );
}

function InstitutionalTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const ACCENT = "#0F6E56";
  const INK = "#1f2933";
  const MUTED = "#56616f";
  const LINE = "#cfd8d3";

  return (
    <div
      id={id}
      className="bg-white text-sm"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: INK,
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm 19mm",
      }}
    >
      <header style={{ border: `2px solid ${ACCENT}`, padding: "20px 24px", textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: "8px" }}>
          Currículo profissional
        </div>
        <h1 style={{ fontSize: "30px", lineHeight: 1.1, margin: 0, color: INK, textTransform: "uppercase" }}>
          {pi.name || "Seu Nome"}
        </h1>
        <div style={{ marginTop: "8px", fontSize: "14px", color: MUTED, fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700 }}>
          {getHeadline(data)}
        </div>
        <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${LINE}`, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 14px", fontSize: "11px", color: MUTED, fontFamily: "'Inter', Arial, sans-serif" }}>
          {getContactItems(pi, true).map(({ value, fallback }) => (
            <span key={value || fallback}>{value || fallback}</span>
          ))}
        </div>
      </header>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "13px", letterSpacing: "0", textTransform: "uppercase", color: ACCENT, borderBottom: `1px solid ${LINE}`, paddingBottom: "6px", marginBottom: "10px" }}>
          Perfil
        </h2>
        {pi.summary ? (
          <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.65, color: MUTED, textAlign: "justify" }}>{pi.summary}</p>
        ) : (
          <div style={{ display: "grid", gap: 7 }}><EmptyLine width="100%" /><EmptyLine width="78%" /></div>
        )}
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "13px", letterSpacing: "0", textTransform: "uppercase", color: ACCENT, borderBottom: `1px solid ${LINE}`, paddingBottom: "6px", marginBottom: "12px" }}>
          Experiência Profissional
        </h2>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", fontFamily: "'Inter', Arial, sans-serif" }}>
                <strong style={{ fontSize: "13px", color: INK }}>{exp.position || "Cargo"}</strong>
                <span style={{ fontSize: "11px", color: MUTED }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</span>
              </div>
              <div style={{ fontSize: "12px", color: ACCENT, fontWeight: 700, margin: "3px 0 6px", fontFamily: "'Inter', Arial, sans-serif" }}>{exp.company || "Empresa"}</div>
              {exp.description && <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.55, color: MUTED }}>{exp.description}</p>}
            </div>
          ))
        ) : (
          <EmptyLine width="84%" />
        )}
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <section>
          <h2 style={{ fontSize: "13px", letterSpacing: "0", textTransform: "uppercase", color: ACCENT, borderBottom: `1px solid ${LINE}`, paddingBottom: "6px", marginBottom: "12px" }}>
            Formação
          </h2>
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px", fontSize: "12px", lineHeight: 1.45 }}>
                <strong>{edu.degree || "Grau"} em {edu.field || "Curso"}</strong>
                <div style={{ color: MUTED }}>{edu.institution || "Instituição"}</div>
                <div style={{ color: MUTED }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</div>
              </div>
            ))
          ) : (
            <EmptyLine width="70%" />
          )}
        </section>

        <section>
          <h2 style={{ fontSize: "13px", letterSpacing: "0", textTransform: "uppercase", color: ACCENT, borderBottom: `1px solid ${LINE}`, paddingBottom: "6px", marginBottom: "12px" }}>
            Competências
          </h2>
          {skills.length > 0 ? (
            <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.7, color: MUTED }}>
              {skills.map((skill) => skill.name).join(" • ")}
            </p>
          ) : (
            <EmptyLine width="90%" />
          )}
          {languages.length > 0 && (
            <p style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: 1.7, color: MUTED }}>
              <strong style={{ color: INK }}>Idiomas:</strong> {languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

function CompactTemplate({ id, data }: { id: string; data: ResumeData }) {
  const { personalInfo: pi, experiences, education, skills, languages = [] } = data;
  const INK = "#111827";
  const MUTED = "#4b5563";
  const LINE = "#d1d5db";

  return (
    <div
      id={id}
      className="bg-white"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: INK,
        width: "210mm",
        minHeight: "297mm",
        padding: "13mm 15mm",
        fontSize: "11px",
        lineHeight: 1.38,
      }}
    >
      <header style={{ borderBottom: `2px solid ${INK}`, paddingBottom: "8px", marginBottom: "10px" }}>
        <h1 style={{ margin: 0, fontSize: "25px", lineHeight: 1, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" }}>
          {pi.name || "Seu Nome"}
        </h1>
        <div style={{ marginTop: "4px", fontSize: "12px", fontWeight: 800, color: MUTED }}>
          {getHeadline(data)}
        </div>
        <div style={{ marginTop: "6px", display: "flex", flexWrap: "wrap", gap: "4px 10px", color: MUTED }}>
          {getContactItems(pi, false).map(({ value }) => (
            value ? <span key={value}>{value}</span> : null
          ))}
          {!pi.email && !pi.phone && !pi.location && <span>email@exemplo.com • (00) 00000-0000 • Cidade, UF</span>}
        </div>
      </header>

      {pi.summary ? (
        <section style={{ marginBottom: "10px" }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0", borderBottom: `1px solid ${LINE}`, paddingBottom: "3px" }}>Resumo</h2>
          <p style={{ margin: 0, color: MUTED }}>{pi.summary}</p>
        </section>
      ) : null}

      <section style={{ marginBottom: "10px" }}>
        <h2 style={{ margin: "0 0 5px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0", borderBottom: `1px solid ${LINE}`, paddingBottom: "3px" }}>Experiência</h2>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <strong>{exp.position || "Cargo"} · {exp.company || "Empresa"}</strong>
                <span style={{ color: MUTED, whiteSpace: "nowrap" }}>{formatRange(exp.startDate, exp.endDate, exp.current)}</span>
              </div>
              {exp.description && <p style={{ margin: "2px 0 0", color: MUTED }}>{exp.description}</p>}
            </div>
          ))
        ) : (
          <EmptyLine width="85%" />
        )}
      </section>

      <section style={{ marginBottom: "10px" }}>
        <h2 style={{ margin: "0 0 5px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0", borderBottom: `1px solid ${LINE}`, paddingBottom: "3px" }}>Formação</h2>
        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "5px" }}>
              <span><strong>{edu.degree || "Grau"} em {edu.field || "Curso"}</strong> · {edu.institution || "Instituição"}</span>
              <span style={{ color: MUTED, whiteSpace: "nowrap" }}>{formatRange(edu.startDate, edu.endDate, edu.current)}</span>
            </div>
          ))
        ) : (
          <EmptyLine width="70%" />
        )}
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "14px" }}>
        <section>
          <h2 style={{ margin: "0 0 5px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0", borderBottom: `1px solid ${LINE}`, paddingBottom: "3px" }}>Habilidades</h2>
          {skills.length > 0 ? (
            <p style={{ margin: 0, color: MUTED }}>{skills.map((skill) => skill.name).join(" • ")}</p>
          ) : (
            <EmptyLine width="95%" />
          )}
        </section>
        <section>
          <h2 style={{ margin: "0 0 5px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0", borderBottom: `1px solid ${LINE}`, paddingBottom: "3px" }}>Idiomas</h2>
          {languages.length > 0 ? (
            <p style={{ margin: 0, color: MUTED }}>{languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}</p>
          ) : (
            <EmptyLine width="80%" />
          )}
        </section>
      </div>
    </div>
  );
}
