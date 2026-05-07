/**
 * templateAccess.ts
 * ─────────────────────────────────────────────────────────────
 * Função central de autorização de templates.
 * Esta é a ÚNICA fonte da verdade sobre quais templates o usuário
 * pode usar. Todos os pontos sensíveis do app devem chamar aqui.
 *
 * Hierarquia de verificação:
 *  1. Template é gratuito? → Permitir sempre.
 *  2. Usuário está logado?
 *     a. Verificar assinatura ativa no Supabase (fonte autoritativa).
 *  3. Fallback: verificar localStorage (para usuários não logados que
 *     compraram antes de criar conta — aceitável como transitório).
 *  4. Caso contrário: negar acesso.
 * ─────────────────────────────────────────────────────────────
 */

import { supabase } from "@/lib/supabase";
import {
  FREE_TEMPLATES,
  PREMIUM_TEMPLATES,
  isPremiumTemplate,
  getLocalSubscription,
} from "@/lib/subscription";
import type { ResumeTemplate } from "@/types/resume";

export { FREE_TEMPLATES, PREMIUM_TEMPLATES, isPremiumTemplate };

// ─── Tipos ────────────────────────────────────────────────────

export type AccessResult =
  | { allowed: true }
  | { allowed: false; reason: "premium_required" | "invalid_template" };

// ─── Verificação server-side (Supabase) ───────────────────────

/**
 * Verifica diretamente no Supabase se o usuário autenticado tem
 * assinatura premium ativa. Esta é a verificação autoritativa —
 * não pode ser manipulada pelo cliente.
 */
export async function checkSupabaseSubscription(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("status, expires_at")
      .eq("user_id", user.id)
      .eq("status", "premium")
      .single();

    if (error || !data) return false;
    if (new Date(data.expires_at) < new Date()) return false;

    return true;
  } catch {
    return false;
  }
}

// ─── Função central de autorização ───────────────────────────

/**
 * canUserUseTemplate(templateId)
 *
 * Verifica se o usuário atual pode usar o template especificado.
 * Deve ser chamada em TODOS os pontos de acesso a templates:
 *  - Ao clicar em "Usar este modelo" na página /modelos
 *  - Ao criar currículo via /criar?template=X
 *  - Ao trocar template no builder
 *  - Ao salvar, exportar PDF, compartilhar
 *
 * @param templateId - ID do template a verificar
 * @returns AccessResult com allowed=true ou allowed=false + reason
 */
export async function canUserUseTemplate(
  templateId: string
): Promise<AccessResult> {
  // 1. Valida se o template existe
  const allTemplates: string[] = [...FREE_TEMPLATES, ...PREMIUM_TEMPLATES];
  if (!allTemplates.includes(templateId)) {
    return { allowed: false, reason: "invalid_template" };
  }

  // 2. Templates gratuitos são sempre permitidos
  if (!isPremiumTemplate(templateId as ResumeTemplate)) {
    return { allowed: true };
  }

  // 3. Template é Premium → verificar assinatura no Supabase (autoritativo)
  const hasSupabaseSub = await checkSupabaseSubscription();
  if (hasSupabaseSub) return { allowed: true };

  // 4. Fallback: verificar localStorage (para casos transitórios)
  const localSub = getLocalSubscription();
  if (localSub) return { allowed: true };

  // 5. Sem permissão
  return { allowed: false, reason: "premium_required" };
}

/**
 * Versão síncrona (apenas localStorage) para uso em UI antes de operações.
 * NÃO deve ser usada como verificação final — use canUserUseTemplate() para isso.
 * Útil para renderização condicional de UI enquanto a verificação async acontece.
 */
export function canUserUseTemplateSync(templateId: string): boolean {
  if (!isPremiumTemplate(templateId as ResumeTemplate)) return true;
  return getLocalSubscription() !== null;
}
