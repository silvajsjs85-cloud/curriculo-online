import { supabase } from "./supabase";
import type { ResumeData } from "@/types/resume";

export interface PublicResume {
  id: string;
  slug: string;
  user_id: string | null;
  resume_data: ResumeData;
  template: string;
  created_at: string;
}

export async function publishResume(
  slug: string,
  resumeData: ResumeData,
  template: string,
  userId: string | null = null
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
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
        user_id: userId,
        resume_data: resumeData,
        template: template,
      },
    ]);

    if (error) throw error;
    return { success: true, url: `/p/${slug}` };
  } catch (error: any) {
    console.error("Erro ao publicar currículo:", error);
    return { success: false, error: error.message };
  }
}

export async function getPublicResume(slug: string): Promise<PublicResume | null> {
  try {
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
