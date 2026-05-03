import { ResumeData } from "@/types/resume";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, User, Globe, ExternalLink, Calendar, Award, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  className?: string;
}

export const ResumePreview = ({ data, scale = 1, className }: ResumePreviewProps) => {
  const { personalInfo, summary, experiences, education, skills, showPhoto, languages, certifications, projects, additionalInfo } = data;

  const isCreative = data.template === "creative";
  const isClassic = data.template === "classic";
  const isModern = data.template === "modern";

  const Sidebar = () => (
    <div className={cn(
      "space-y-8",
      isCreative ? "text-slate-300" : "text-slate-700"
    )}>
      {/* Contact info for sidebar if creative */}
      {isCreative && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Contato</h2>
          <div className="space-y-2 text-xs">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-primary" /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3 text-primary" /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" /> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3 w-3 text-primary" /> {personalInfo.linkedin}</div>}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="space-y-3">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest pb-2 border-b",
            isCreative ? "text-white border-white/10" : "text-slate-900 border-slate-200"
          )}>Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className={cn(
                "px-2 py-1 text-[10px] font-medium rounded-md",
                isCreative ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700 border border-slate-200"
              )}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="space-y-3">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest pb-2 border-b",
            isCreative ? "text-white border-white/10" : "text-slate-900 border-slate-200"
          )}>Idiomas</h2>
          <div className="space-y-2">
            {languages.map((lang) => (
              <div key={lang.id} className="text-xs">
                <p className={cn("font-bold", isCreative ? "text-white" : "text-slate-800")}>{lang.name}</p>
                <p className="opacity-80">{lang.level}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className="space-y-3">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest pb-2 border-b",
            isCreative ? "text-white border-white/10" : "text-slate-900 border-slate-200"
          )}>Certificações</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs">
                <p className={cn("font-bold", isCreative ? "text-white" : "text-slate-800")}>{cert.name}</p>
                <p className="opacity-80">{cert.institution} • {cert.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div 
      className={cn(
        "bg-white w-full aspect-[1/1.414] shadow-2xl text-slate-800 transition-all duration-300 origin-top overflow-hidden",
        data.fontFamily === "Inter" ? "font-sans" : data.fontFamily === "Merriweather" ? "font-serif" : "font-sans",
        className
      )}
      style={{ transform: `scale(${scale})` }}
      id="resume-content"
    >
      {isCreative ? (
        /* Creative Template: Two Column with dark sidebar */
        <div className="flex h-full">
          <aside className="w-1/3 bg-slate-900 p-8 flex flex-col gap-8 h-full overflow-hidden">
            {showPhoto && (
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-white/10 bg-slate-800 shrink-0">
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt={personalInfo.fullName} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center"><User className="h-16 w-16 text-white/20" /></div>
                )}
              </div>
            )}
            <Sidebar />
          </aside>
          <main className="flex-1 p-10 bg-white overflow-hidden flex flex-col gap-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">{personalInfo.fullName || "NOME COMPLETO"}</h1>
              <p className="text-xl font-bold tracking-tighter" style={{ color: data.themeColor }}>{personalInfo.desiredRole || "CARGO DESEJADO"}</p>
            </header>
            
            <div className="space-y-8">
              {summary && (
                <section className="space-y-3">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <div className="h-px bg-slate-200 flex-1"></div> Sobre mim
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 italic">"{summary}"</p>
                </section>
              )}

              {experiences.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <div className="h-px bg-slate-200 flex-1"></div> Experiência
                  </h2>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-[100px_1fr] gap-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase pt-1">
                          {exp.startDate} — {exp.current ? "Ativo" : exp.endDate}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-base text-slate-900 leading-none">{exp.role}</h3>
                          <p className="text-sm font-medium text-slate-500">{exp.company}</p>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <div className="h-px bg-slate-200 flex-1"></div> Educação
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="grid grid-cols-[100px_1fr] gap-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase pt-1">{edu.startDate} — {edu.endDate}</div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">{edu.course}</h3>
                          <p className="text-xs text-slate-500">{edu.institution} | {edu.degree}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {additionalInfo && (
                <section className="space-y-3">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <div className="h-px bg-slate-200 flex-1"></div> Informações Adicionais
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">{additionalInfo}</p>
                </section>
              )}
            </div>
          </main>
        </div>
      ) : isClassic ? (
        /* Classic Template: Centered, Conservative, Elegant */
        <div className="p-16 flex flex-col gap-10">
          <header className="text-center space-y-4 border-b-2 border-slate-900 pb-8">
            {showPhoto && personalInfo.photo && (
              <div className="mx-auto h-24 w-24 rounded-full overflow-hidden border-2 border-slate-900 mb-4">
                <img src={personalInfo.photo} alt={personalInfo.fullName} className="h-full w-full object-cover" />
              </div>
            )}
            <h1 className="text-4xl font-serif font-bold uppercase tracking-widest">{personalInfo.fullName || "SEU NOME COMPLETO"}</h1>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
              {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {personalInfo.location}</span>}
              {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin className="h-3 w-3" /> {personalInfo.linkedin}</span>}
            </div>
          </header>

          <div className="space-y-8">
             {summary && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Perfil Profissional</h2>
                <p className="text-sm leading-relaxed text-slate-700 text-justify">{summary}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Experiência Profissional</h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.role}</h3>
                        <span className="text-xs font-bold italic text-slate-500">{exp.startDate} — {exp.current ? "Presente" : exp.endDate}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">{exp.company}, {exp.city}</p>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-8">
                {education.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Formação</h2>
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-1">
                          <p className="text-xs font-bold text-slate-500">{edu.startDate} — {edu.endDate}</p>
                          <h3 className="font-bold text-sm leading-tight">{edu.course}</h3>
                          <p className="text-xs text-slate-600">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {languages && languages.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Idiomas</h2>
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <p key={lang.id} className="text-sm text-slate-700"><strong>{lang.name}:</strong> {lang.level}</p>
                      ))}
                    </div>
                  </section>
                )}
              </div>
              
              <div className="space-y-8">
                <section className="space-y-3">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Habilidades</h2>
                  <div className="grid grid-cols-1 gap-1 text-sm text-slate-700">
                    {skills.map((skill, i) => (
                      <span key={i} className="flex items-center gap-2">• {skill}</span>
                    ))}
                  </div>
                </section>

                {certifications && certifications.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Certificações</h2>
                    <div className="space-y-2">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="text-sm text-slate-700">
                          <p className="font-bold leading-tight">{cert.name}</p>
                          <p className="text-xs text-slate-500">{cert.institution} ({cert.year})</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {additionalInfo && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1">Informações Adicionais</h2>
                <p className="text-sm text-slate-700">{additionalInfo}</p>
              </section>
            )}
          </div>
        </div>
      ) : (
        /* Modern Template: Balanced, Clean, Colored Accents */
        <div className="h-full flex flex-col">
          <header className="p-12 flex items-center gap-8 text-white relative overflow-hidden" style={{ backgroundColor: data.themeColor }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-10 -mb-10"></div>
            </div>
            
            {showPhoto && (
              <div className="relative z-10 h-32 w-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl bg-white/10 shrink-0">
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt={personalInfo.fullName} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center"><User className="h-12 w-12 text-white/50" /></div>
                )}
              </div>
            )}
            
            <div className="relative z-10 flex-1 space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">{personalInfo.fullName || "João Silva"}</h1>
              <p className="text-xl font-medium text-white/90">{personalInfo.desiredRole || "Cargo Desejado"}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/80">
                {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {personalInfo.email}</div>}
                {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {personalInfo.phone}</div>}
                {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {personalInfo.location}</div>}
              </div>
            </div>
          </header>

          <div className="flex-1 p-12 grid grid-cols-[1fr_240px] gap-12">
            <div className="space-y-10">
              {summary && (
                <section className="space-y-3">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: data.themeColor }}></div> 
                    Perfil
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
                </section>
              )}

              {experiences.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: data.themeColor }}></div> 
                    Experiência Profissional
                  </h2>
                  <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 flex items-center justify-center z-10" style={{ borderColor: data.themeColor }}></div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-base text-slate-900">{exp.role}</h3>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{exp.startDate} — {exp.current ? "Atual" : exp.endDate}</span>
                        </div>
                        <p className="text-sm font-semibold mb-2" style={{ color: data.themeColor }}>{exp.company} • {exp.city}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {additionalInfo && (
                <section className="space-y-3">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: data.themeColor }}></div> 
                    Informações Adicionais
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">{additionalInfo}</p>
                </section>
              )}
            </div>

            <div className="space-y-10">
              {skills.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 border-b-2 pb-2" style={{ borderColor: data.themeColor }}>Habilidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-tighter border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 border-b-2 pb-2" style={{ borderColor: data.themeColor }}>Educação</h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <h3 className="font-bold text-xs text-slate-800">{edu.course}</h3>
                        <p className="text-[10px] text-slate-500 font-medium">{edu.institution}</p>
                        <p className="text-[10px] text-slate-400 italic">{edu.startDate} — {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {languages && languages.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 border-b-2 pb-2" style={{ borderColor: data.themeColor }}>Idiomas</h2>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-slate-700">{lang.name}</span>
                        <span className="text-slate-400 italic">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {certifications && certifications.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 border-b-2 pb-2" style={{ borderColor: data.themeColor }}>Certificações</h2>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="space-y-1">
                        <h3 className="font-bold text-[11px] text-slate-800 leading-tight">{cert.name}</h3>
                        <p className="text-[10px] text-slate-500">{cert.institution} ({cert.year})</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
