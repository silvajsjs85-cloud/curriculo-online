import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { createResume } from "@/lib/storage";
import type { Resume } from "@/types/resume";

const VALID_TEMPLATES: Resume["template"][] = ["modern", "classic", "minimal", "executive"];

function getTemplate(value: string | null): Resume["template"] {
  return VALID_TEMPLATES.includes(value as Resume["template"])
    ? (value as Resume["template"])
    : "modern";
}

export default function CreateResume() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const created = useRef(false);

  useEffect(() => {
    if (created.current) return;

    created.current = true;
    const resume = createResume(getTemplate(searchParams.get("template")));
    navigate(`/builder/${resume.id}`, { replace: true });
  }, [navigate, searchParams]);

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
          Preparando seu curriculo
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Abrindo o editor para voce comecar agora.
        </p>
      </div>
    </main>
  );
}
