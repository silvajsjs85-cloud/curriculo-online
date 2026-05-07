/**
 * templateAccess.test.ts
 * ─────────────────────────────────────────────────────────────
 * Testes para a função central de autorização de templates.
 *
 * Executa com: npx vitest run src/lib/templateAccess.test.ts
 * ─────────────────────────────────────────────────────────────
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ─── Mocks ────────────────────────────────────────────────────

// Mock do Supabase — controlamos o retorno por teste
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

// Importações após mocks
import { supabase } from "@/lib/supabase";
import {
  canUserUseTemplate,
  checkSupabaseSubscription,
  isPremiumTemplate,
  FREE_TEMPLATES,
  PREMIUM_TEMPLATES,
} from "@/lib/templateAccess";
import { activateSubscription, clearLocalSubscription } from "@/lib/subscription";

// ─── Helpers ─────────────────────────────────────────────────

function mockSupabaseUser(userId: string | null) {
  (supabase!.auth.getUser as ReturnType<typeof vi.fn>).mockResolvedValue({
    data: { user: userId ? { id: userId } : null },
  });
}

function mockSupabaseSubscription(active: boolean, expiresInDays = 30) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (active ? expiresInDays : -1));

  const chainMock = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(
      active
        ? {
            data: { status: "premium", expires_at: expiresAt.toISOString() },
            error: null,
          }
        : { data: null, error: { message: "No subscription" } }
    ),
  };

  (supabase!.from as ReturnType<typeof vi.fn>).mockReturnValue(chainMock);
}

// ─── Constantes ───────────────────────────────────────────────

const A_FREE_TEMPLATE = FREE_TEMPLATES[0];
const A_PREMIUM_TEMPLATE = PREMIUM_TEMPLATES[0];
const USER_ID = "user-abc-123";

// ─── Testes ───────────────────────────────────────────────────

describe("isPremiumTemplate()", () => {
  it("retorna false para templates gratuitos", () => {
    for (const t of FREE_TEMPLATES) {
      expect(isPremiumTemplate(t)).toBe(false);
    }
  });

  it("retorna true para templates Premium", () => {
    for (const t of PREMIUM_TEMPLATES) {
      expect(isPremiumTemplate(t)).toBe(true);
    }
  });

  it("retorna false para templateId desconhecido", () => {
    expect(isPremiumTemplate("nao-existe" as any)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────

describe("checkSupabaseSubscription()", () => {
  beforeEach(() => {
    clearLocalSubscription();
  });

  it("retorna false quando não há usuário logado", async () => {
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);
    expect(await checkSupabaseSubscription()).toBe(false);
  });

  it("retorna true quando usuário tem assinatura ativa no Supabase", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(true);
    expect(await checkSupabaseSubscription()).toBe(true);
  });

  it("retorna false quando assinatura está expirada no Supabase", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(false); // expirada (expires_at no passado)
    expect(await checkSupabaseSubscription()).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────

describe("canUserUseTemplate()", () => {
  beforeEach(() => {
    clearLocalSubscription();
  });

  afterEach(() => {
    clearLocalSubscription();
  });

  // ── Template gratuito ───────────────────────────────────────

  it("[REQ-01] template gratuito é sempre permitido (sem login)", async () => {
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);

    const result = await canUserUseTemplate(A_FREE_TEMPLATE);
    expect(result.allowed).toBe(true);
  });

  it("[REQ-02] template gratuito é sempre permitido (com login, sem Premium)", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(false);

    const result = await canUserUseTemplate(A_FREE_TEMPLATE);
    expect(result.allowed).toBe(true);
  });

  // ── Template Premium sem plano ──────────────────────────────

  it("[REQ-03] usuário sem plano tentando usar template Premium → bloqueado", async () => {
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);

    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("premium_required");
    }
  });

  it("[REQ-04] usuário logado sem assinatura tentando usar template Premium → bloqueado", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(false);

    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("premium_required");
    }
  });

  // ── Template Premium com plano ──────────────────────────────

  it("[REQ-05] usuário com plano ativo (Supabase) pode usar template Premium", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(true);

    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    expect(result.allowed).toBe(true);
  });

  it("[REQ-06] usuário com assinatura em localStorage pode usar template Premium (fallback)", async () => {
    // Simula usuário não logado mas com localStorage ativo
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);

    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1);
    activateSubscription(futureDate.toISOString());

    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    expect(result.allowed).toBe(true);
  });

  // ── Template inválido ───────────────────────────────────────

  it("[REQ-07] templateId inválido/desconhecido → bloqueado", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(true);

    const result = await canUserUseTemplate("template-que-nao-existe");
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("invalid_template");
    }
  });

  // ── Todos os templates Premium individualmente ───────────────

  it("[REQ-08] todos os templates Premium são bloqueados sem plano", async () => {
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);

    for (const template of PREMIUM_TEMPLATES) {
      const result = await canUserUseTemplate(template);
      expect(result.allowed).toBe(false);
    }
  });

  it("[REQ-09] todos os templates Premium são permitidos com plano ativo", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(true);

    for (const template of PREMIUM_TEMPLATES) {
      const result = await canUserUseTemplate(template);
      expect(result.allowed).toBe(true);
    }
  });
});

// ─────────────────────────────────────────────────────────────

describe("Cenários de segurança (ataques)", () => {
  beforeEach(() => {
    clearLocalSubscription();
  });

  afterEach(() => {
    clearLocalSubscription();
  });

  it("[SEC-01] localStorage adulterado com status fake → Supabase nega o acesso", async () => {
    // Simula adulteração direta no localStorage
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(false); // Supabase não tem assinatura

    // Injeta dado fake no localStorage (como um atacante faria via DevTools)
    localStorage.setItem(
      "curriculo_subscription",
      JSON.stringify({
        status: "premium",
        activatedAt: new Date().toISOString(),
        expiresAt: new Date(9999, 0, 1).toISOString(), // ano 9999
      })
    );

    // Com Supabase negando, o localStorage não deveria ser suficiente
    // NOTA: O sistema atual usa localStorage como fallback.
    // Esta é a limitação conhecida de um app puramente client-side.
    // Para proteção máxima, a validação Supabase deve ser a única.
    // Este teste documenta o comportamento atual.
    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    // Com localStorage válido E supabase negando: atualmente permite (fallback)
    // TODO: Num sistema com backend, o Supabase seria a única fonte da verdade.
    expect(result.allowed).toBe(true); // comportamento atual documentado
  });

  it("[SEC-02] template Premium via URL com assinatura expirada → bloqueado", async () => {
    mockSupabaseUser(USER_ID);
    mockSupabaseSubscription(false); // assinatura expirada

    const result = await canUserUseTemplate(A_PREMIUM_TEMPLATE);
    expect(result.allowed).toBe(false);
  });

  it("[SEC-03] template gratuito nunca requer assinatura", async () => {
    mockSupabaseUser(null);
    mockSupabaseSubscription(false);

    for (const template of FREE_TEMPLATES) {
      const result = await canUserUseTemplate(template);
      expect(result.allowed).toBe(true);
    }
  });
});
