import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seoModels } from "@/data/seo-models";
import { SEO } from "@/components/SEO";

export default function ModelosProfissao() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? seoModels[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return <Navigate to="/modelos" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      <SEO 
        title={data.title}
        description={data.description}
        canonical={`https://curriculos.fun/modelos/${data.slug}`}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#0F2744] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link to="/modelos" className="inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors mb-8 text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              Ver todos os modelos
            </Link>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-normal mb-4 leading-tight">
              {data.h1}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl">
              {data.subtitle}
            </p>
            
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-xl h-12 px-8 font-bold bg-[#0D9488] hover:bg-[#0f766e] text-white">
                <Link to="/criar">
                  Criar meu currículo agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2 space-y-10">
              {data.content.map((section, index) => (
                <section key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold text-[#0F2744] mb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <span className="text-teal-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    {section.heading}
                  </h2>
                  <div className="text-slate-600 leading-relaxed space-y-4">
                    {section.text.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                  <FileText className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F2744] mb-2">
                    Pronto para se destacar?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Use a nossa ferramenta gratuita para criar um currículo com design aprovado por recrutadores em menos de 5 minutos.
                  </p>
                  <Button asChild className="rounded-xl bg-[#0F2744] hover:bg-[#1a3a5e] text-white">
                    <Link to="/criar">
                      Fazer Currículo Grátis
                    </Link>
                  </Button>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-[#0F2744] mb-4">Por que usar o Currículo Fácil?</h3>
                <ul className="space-y-3">
                  {[
                    "100% Gratuito",
                    "Sem marcas d'água",
                    "Formatos aprovados por RH",
                    "Baixe em PDF na hora",
                    "Não precisa criar conta"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" />
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-[#0F2744] mb-4">Outros Guias</h3>
                <div className="space-y-2 flex flex-col">
                  {Object.values(seoModels)
                    .filter(m => m.slug !== data.slug)
                    .map(m => (
                    <Link 
                      key={m.slug} 
                      to={`/modelos/${m.slug}`}
                      className="text-sm text-teal-600 hover:underline py-1"
                    >
                      {m.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      
      {/* Footer can be the global footer if it's extracted, but since it's hardcoded in Contact, 
          we probably want to use the global footer if there is one. 
          Assuming Navbar handles header. We'll leave it as is or add a simple footer */}
    </div>
  );
}
