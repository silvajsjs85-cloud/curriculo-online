import type { Resume } from "@/types/resume";
import { defaultResumeData } from "@/types/resume";

const KEY = "curriculos_data";

export function getResumes(): Resume[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getResume(id: string): Resume | null {
  return getResumes().find((r) => r.id === id) ?? null;
}

export function saveResume(resume: Resume): void {
  const resumes = getResumes().filter((r) => r.id !== resume.id);
  resumes.unshift({ ...resume, updated_at: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(resumes));
}

export function createResume(): Resume {
  const resume: Resume = {
    id: crypto.randomUUID(),
    user_id: "local",
    title: "Novo Currículo",
    template: "modern",
    data: defaultResumeData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveResume(resume);
  return resume;
}

export function deleteResume(id: string): void {
  const resumes = getResumes().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(resumes));
}
