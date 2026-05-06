import * as pdfjsLib from "pdfjs-dist";
import type { ResumeData } from "@/types/resume";

// Configura o worker do PDF.js para rodar localmente no Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function parseLinkedInPDF(file: File): Promise<Partial<ResumeData>> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    fullText += pageText + "\n";
  }

  return extractResumeDataFromText(fullText);
}

// Uma heurística bem simples para extrair dados do PDF padrão do LinkedIn.
// Nota: O PDF do LinkedIn pode variar de idioma e estrutura.
function extractResumeDataFromText(text: string): Partial<ResumeData> {
  const data: Partial<ResumeData> = {
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
    languages: []
  };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // No PDF do LinkedIn, normalmente a primeira linha útil é o Nome.
  if (lines.length > 0 && data.personalInfo) {
    // O nome costuma ser as primeiras palavras maiores.
    data.personalInfo.name = lines[0];
  }

  // Busca e-mail
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emailMatch = text.match(emailRegex);
  if (emailMatch && data.personalInfo) {
    data.personalInfo.email = emailMatch[0];
  }

  // Tenta extrair algumas seções básicas (bem simplificado)
  const experienceIndex = lines.findIndex(l => l.toLowerCase() === "experience" || l.toLowerCase() === "experiência");
  const educationIndex = lines.findIndex(l => l.toLowerCase() === "education" || l.toLowerCase() === "formação acadêmica");

  if (experienceIndex !== -1 && data.experiences) {
    const endIdx = educationIndex !== -1 ? educationIndex : lines.length;
    // Pega a primeira experiência como exemplo:
    if (experienceIndex + 1 < endIdx) {
      data.experiences.push({
        id: crypto.randomUUID(),
        company: lines[experienceIndex + 1],
        position: lines[experienceIndex + 2] || "",
        startDate: "",
        endDate: "",
        current: true,
        description: "Experiência importada do LinkedIn. Revise e edite os detalhes.",
      });
    }
  }

  if (educationIndex !== -1 && data.education) {
    if (educationIndex + 1 < lines.length) {
      data.education.push({
        id: crypto.randomUUID(),
        institution: lines[educationIndex + 1],
        degree: lines[educationIndex + 2] || "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
      });
    }
  }

  return data;
}
