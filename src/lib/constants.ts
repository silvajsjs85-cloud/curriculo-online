import { ResumeData } from "@/types/resume";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    desiredRole: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    photo: "",
  },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  additionalInfo: "",
  template: "modern",
  themeColor: "#3b82f6",
  fontFamily: "Inter",
  showPhoto: true,
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "João Silva",
    desiredRole: "Senior Frontend Architect",
    email: "joao.silva@techglobal.com",
    phone: "+55 (11) 98765-4321",
    location: "São Paulo, Brasil (Híbrido)",
    linkedin: "linkedin.com/in/joaosilva",
    portfolio: "joaosilva.dev",
    photo: "https://i.pravatar.cc/150?u=joao",
  },
  summary: "Arquiteto de sistemas frontend com mais de 10 anos de experiência internacional. Especialista em ecossistemas React, otimização de performance core web vitals e liderança de times multidisciplinares. Focado em escalabilidade e acessibilidade, com histórico de redução de 40% em custos de infraestrutura através de melhorias de renderização.",
  experiences: [
    {
      id: "1",
      role: "Lead Frontend Engineer",
      company: "Tech Global Solutions",
      city: "Remoto / EUA",
      startDate: "01/2021",
      endDate: "",
      current: true,
      description: "Responsável pela arquitetura de micro-frontends de uma plataforma utilizada por 2 milhões de usuários mensais. Liderança técnica de 3 squads, implementando padrões de Design System e garantindo 100% de cobertura de testes em componentes críticos.",
    },
    {
      id: "2",
      role: "Desenvolvedor Frontend Sênior",
      company: "Inovação Digital S.A.",
      city: "São Paulo, SP",
      startDate: "06/2018",
      endDate: "12/2020",
      current: false,
      description: "Desenvolvimento de aplicações financeiras de alta segurança. Implementação de fluxos complexos de checkout e dashboards analíticos em tempo real. Mentoria de desenvolvedores juniores e plenos.",
    },
    {
      id: "3",
      role: "Full Stack Developer",
      company: "Startup Nexus",
      city: "Florianópolis, SC",
      startDate: "01/2015",
      endDate: "05/2018",
      current: false,
      description: "Atuação em ambiente ágil desenvolvendo o MVP da plataforma. Integração de APIs RESTful e GraphQL. Otimização de SEO resultando em 60% mais tráfego orgânico.",
    }
  ],
  education: [
    {
      id: "1",
      course: "Mestrado em Engenharia de Software",
      institution: "Georgia Institute of Technology",
      degree: "Pós-graduação",
      startDate: "2019",
      endDate: "2021",
    },
    {
      id: "1",
      course: "Ciência da Computação",
      institution: "Universidade de São Paulo (USP)",
      degree: "Bacharelado",
      startDate: "2010",
      endDate: "2014",
    }
  ],
  skills: ["React / Next.js", "TypeScript", "Node.js / NestJS", "Cloud AWS", "Web Performance", "CI/CD", "Testing (Jest/Cypress)", "UI/UX Design Systems"],
  languages: [
    { id: "1", name: "Inglês", level: "Fluente / Nativo" },
    { id: "2", name: "Espanhol", level: "Avançado" }
  ],
  certifications: [
    { id: "1", name: "AWS Certified Developer", institution: "Amazon Web Services", year: "2022" },
    { id: "2", name: "Google UX Design Professional", institution: "Coursera", year: "2020" }
  ],
  projects: [
    { id: "1", name: "Open Source UI Kit", description: "Biblioteca de componentes acessíveis com +5k stars no GitHub.", link: "github.com/joao/uikit" }
  ],
  additionalInfo: "Palestrante em conferências de tecnologia (React Conf BR). Ativo na comunidade open-source.",
  template: "modern",
  themeColor: "#3b82f6",
  fontFamily: "Inter",
  showPhoto: true,
};
