import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";
import { getPublicResume, type PublicResume } from "@/lib/public-resume";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicResumePage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PublicResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      const result = await getPublicResume(slug);
      setData(result);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3]">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F6F3] p-4 text-center">
        <h1 className="text-2xl font-bold text-[#0F2744] mb-2">Currículo não encontrado</h1>
        <p className="text-slate-600 mb-6">Este link de currículo pode ter expirado ou não existe.</p>
        <Button asChild className="bg-[#0F2744] text-white hover:bg-[#1a3a5e] rounded-xl">
          <Link to="/">
            Criar o seu currículo
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-[#0F2744] flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm">
              CF
            </span>
            Currículo Fácil
          </Link>
        </div>
        <div>
          <Button asChild variant="outline" className="rounded-xl h-9 border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800">
            <Link to="/criar">
              Crie o seu também
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-[210mm] shadow-2xl rounded-sm overflow-hidden bg-white">
          <ResumePreview
            data={data.resume_data}
            template={data.template as any}
            id="public-resume-preview"
          />
        </div>
      </main>
    </div>
  );
}
