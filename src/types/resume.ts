export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado" | "Especialista";
}

export interface Language {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado" | "Fluente" | "Nativo";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template: "modern" | "classic" | "minimal" | "executive";
  data: ResumeData;
  created_at: string;
  updated_at: string;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
    photo: "",
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
};
