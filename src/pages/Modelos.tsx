import { Button } from "@/components/ui/button";
import { Layout, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ResumePreview } from "@/components/editor/ResumePreview";
import { sampleResumeData } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ModelosPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Layout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Currículo Fácil</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/editor">
              <Button size="sm">Criar meu currículo grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-20">
        <div className="container px-4 md:px-6">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para o início
          </Link>

          {/* Intro Block */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Escolha seu modelo de currículo
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium">
              Modelos profissionais, modernos e aprovados por especialistas em RH.
            </p>
          </div>

          {/* Grid of Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {([
              { 
                id: "modern", 
                name: "Moderno", 
                desc: "Design equilibrado com linha do tempo, colunas e visual profissional.", 
                tag: "Mais usado",
                color: "#3b82f6",
                featured: true
              },
              { 
                id: "classic", 
                name: "Clássico", 
                desc: "Formato formal, conservador e altamente legível para processos seletivos.", 
                tag: "Executivo",
                color: "#0f172a",
                featured: false
              },
              { 
                id: "creative", 
                name: "Criativo", 
                desc: "Layout ousado com barra lateral escura, ideal para causar impacto.", 
                tag: "Destaque",
                color: "#8b5cf6",
                featured: false
              }
            ] as const).map((modelo, i) => (
              <div 
                key={i} 
                className={cn(
                  "group relative bg-white rounded-[20px] border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full",
                  modelo.featured && "ring-2 ring-primary/20 shadow-lg"
                )}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-full shadow-sm backdrop-blur-md",
                    modelo.featured ? "bg-primary text-white" : "bg-white/90 text-slate-900 border border-slate-200"
                  )}>
                    {modelo.tag}
                  </span>
                </div>

                {/* Preview Container */}
                <div className="aspect-[1/1.414] bg-slate-200/50 relative overflow-hidden flex items-center justify-center p-8 group-hover:p-6 transition-all duration-500">
                  <div className="w-full h-full relative shadow-2xl transition-transform duration-500 group-hover:scale-[1.05] rounded-sm overflow-hidden bg-white origin-center border border-slate-100">
                    <div className="absolute inset-0 pointer-events-none origin-top-left" style={{ width: '333%', height: '333%', transform: 'scale(0.3)' }}>
                      <ResumePreview 
                        data={{ 
                          ...sampleResumeData, 
                          template: modelo.id,
                          themeColor: modelo.color
                        }} 
                        className="shadow-none border-none p-0"
                      />
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-bold text-2xl text-slate-900 mb-2">{modelo.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                    {modelo.desc}
                  </p>
                  <Link to="/editor" className="block w-full">
                    <Button 
                      className={cn(
                        "w-full h-12 text-base font-bold transition-all duration-300 shadow-md bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-95"
                      )}
                    >
                      Usar este modelo
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container px-4 md:px-6 text-center text-sm text-slate-500">
          <p>© 2024 Currículo Fácil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ModelosPage;
