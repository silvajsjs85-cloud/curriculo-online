/**
 * CreateResume.tsx
 * ─────────────────────────────────────────────────────────────
 * Rota intermediária /criar?template=X
 *
 * CORREÇÃO DE SEGURANÇA:
 * Antes de criar o currículo, verifica se o template solicitado é
 * Premium e se o usuário tem permissão. Se não tiver, redireciona
 * para /precos em vez de abrir o builder com template Premium.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText, Lock } from "lucide-react";
import { createResume } from "@/lib/storage";
import { RESUME_TEMPLATE_IDS, type Resume } from "@/types/resume";
import { canUserUseTemplate } from "@/lib/templateAccess";

const VALID_TEMPLATES = RESUME_TEMPLATE_IDS;

function getTemplate(value: string | null): Resume["template"] {
  return VALID_TEMPLATES.includes(value as Resume["template"])
    ? (value as Resume["template"])
    : "modern";
}

type State = "checking" | "blocked" | "creating";

export default function CreateResume() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const created = useRef(false);
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    if (created.current) return;
    created.current = true;

    const templateParam = searchParams.get("template");
    const template = getTemplate(templateParam);

    // ── Verificação de acesso ao template ──────────────────────
    canUserUseTemplate(template).then((result) => {
      if (!result.allowed) {
        // Template Premium sem permissão → bloquear e redirecionar
        setState("blocked");
        // Redireciona para planos após breve delay para mostrar feedback
        setTimeout(() => {
          navigate("/precos?blocked=" + template, { replace: true });
        }, 1500);
        return;
      }

      // Acesso permitido → criar e redirecionar para o builder
      setState("creating");
      const resume = createResume(template);
      navigate(`/builder/${resume.id}`, { replace: true });
    });
  }, [navigate, searchParams]);

  if (state === "blocked") {
    return (
      <main
        className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 text-center"
        style={{ backgroundColor: "#F7F6F3" }}
      >
        <div>
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#F59E0B" }}
          >
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F2744]">
            Template Premium
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Este modelo é exclusivo do plano Premium.
            <br />
            Redirecionando para a página de planos…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 text-center"
      style={{ backgroundColor: "#F7F6F3" }}
    >
      <div>
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#0D9488" }}
        >
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F2744]">
          Preparando seu currículo
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Verificando acesso e abrindo o editor…
        </p>
      </div>
    </main>
  );
}
