export interface Experience {
  id: string;
  role: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  course: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: string;
  link?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    desiredRole: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    photo?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  additionalInfo: string;
  template: "classic" | "modern" | "creative";
  themeColor: string;
  fontFamily: string;
  showPhoto: boolean;
}
