import { getSupabaseClient } from "./supabase";
import type { Resume, ResumeData } from "@/types/resume";

type ResumeTemplate = Resume["template"];

export interface PublicResume {
  id: string;
  slug: string;
  user_id: string | null;
  resume_data: ResumeData;
  template: ResumeTemplate;
  created_at: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "Não foi possível publicar o currículo.";
}

export async function publishResume(
  slug: string,
  resumeData: ResumeData,
  template: ResumeTemplate,
  userId: string | null = null
): Promise<{ success: boolean; url?: string; error?: string }> {
  // O app salva localmente com "local", mas o Supabase espera UUID ou null.
  const validUserId = userId === "local" ? null : userId;
  try {
    const supabase = getSupabaseClient();

    // Tenta buscar se o slug já existe
    const { data: existing } = await supabase
      .from("public_resumes")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      // Atualiza o existente (se for do mesmo usuário ou anônimo, aqui simplificamos)
      const { error } = await supabase
        .from("public_resumes")
        .update({
          resume_data: resumeData,
          template: template,
          updated_at: new Date().toISOString(),
        })
        .eq("slug", slug);

      if (error) throw error;
      return { success: true, url: `/p/${slug}` };
    }

    // Cria novo
    const { error } = await supabase.from("public_resumes").insert([
      {
        slug,
        user_id: validUserId,
        resume_data: resumeData,
        template: template,
      },
    ]);

    if (error) throw error;
    return { success: true, url: `/p/${slug}` };
  } catch (error) {
    console.error("Erro ao publicar currículo:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getPublicResume(slug: string): Promise<PublicResume | null> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("public_resumes")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as PublicResume;
  } catch (error) {
    console.error("Erro ao buscar currículo público:", error);
    return null;
  }
}
