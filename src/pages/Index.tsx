import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Layout, Edit, Globe, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ResumePreview } from "@/components/editor/ResumePreview";
import { sampleResumeData } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { session } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Layout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Currículo Fácil</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#inicio" className="hover:text-primary transition-colors">Início</a>
            <Link to="/modelos" className="hover:text-primary transition-colors">Modelos</Link>
            <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
            <a href="#precos" className="hover:text-primary transition-colors">Preços</a>
          </nav>
          <div className="flex gap-4">
            {session ? (
              <Link to="/dashboard">
                <Button size="sm">Ir para o Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/editor">
                  <Button size="sm">Criar meu currículo grátis</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section id="inicio" className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Crie um currículo profissional em <span className="text-primary">poucos minutos</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Preencha seus dados, escolha um modelo e baixe seu currículo pronto em PDF. Aumente suas chances de conquistar a vaga dos seus sonhos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/editor">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2">
                    Começar agora <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/modelos">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold">
                    Ver modelos
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span>Mais de <span className="font-bold text-foreground">10.000 currículos</span> criados esta semana</span>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="w-full h-[500px] bg-secondary/30 relative overflow-hidden">
                   <div className="absolute inset-0 pointer-events-none origin-top-left" style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}>
                      <ResumePreview 
                        data={{ 
                          ...sampleResumeData, 
                          template: "modern"
                        }} 
                        className="shadow-none border-none p-0"
                      />
                    </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-xl shadow-lg animate-bounce z-10">
                <span className="font-bold">✓ 100% PDF Profissional</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Tudo o que você precisa para se destacar</h2>
              <p className="text-lg text-muted-foreground">Funcionalidades pensadas para simplificar sua vida e impressionar os recrutadores.</p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { icon: Edit, title: "Fácil de usar", desc: "Interface intuitiva passo a passo." },
                { icon: Layout, title: "Modelos profissionais", desc: "Design aprovado por recrutadores." },
                { icon: Download, title: "Download em PDF", desc: "Pronto para enviar em segundos." },
                { icon: Globe, title: "Edição rápida", desc: "Altere dados a qualquer momento." },
                { icon: Star, title: "Visualização real", desc: "Veja o resultado enquanto escreve." }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modelos Section */}
        <section id="modelos" className="py-24 bg-[#F8FAFC]">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Escolha o modelo ideal para você
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-medium">
                Escolha um modelo profissional aprovado por especialistas em RH.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[
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
              ].map((modelo, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "group relative bg-white rounded-[20px] border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full",
                    modelo.featured && "ring-2 ring-primary ring-offset-2"
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
                  <div className="aspect-[1/1.3] bg-slate-100 relative overflow-hidden flex items-center justify-center p-6 group-hover:p-4 transition-all duration-500">
                    <div className="w-full h-full relative shadow-2xl transition-transform duration-500 group-hover:scale-[1.05] rounded-sm overflow-hidden bg-white origin-center">
                      <div className="absolute inset-0 pointer-events-none origin-top-left" style={{ width: '400%', height: '400%', transform: 'scale(0.25)' }}>
                        <ResumePreview 
                          data={{ 
                            ...sampleResumeData, 
                            template: modelo.id as any,
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
                          "w-full h-12 text-base font-bold transition-all duration-300 shadow-md",
                          modelo.featured 
                            ? "bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-95" 
                            : "bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-95"
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
        </section>

        {/* How It Works */}
        <section id="como-funciona" className="py-20 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 -z-10"></div>
              {[
                { step: "1", title: "Preencha seus dados", desc: "Insira suas experiências, formação e habilidades no nosso formulário simples." },
                { step: "2", title: "Escolha um modelo", desc: "Selecione entre diversos designs profissionais que combinam com seu perfil." },
                { step: "3", title: "Baixe seu currículo", desc: "Exporte seu currículo em PDF de alta qualidade e pronto para o mercado." }
              ].map((step, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border space-y-4 relative">
                  <div className="absolute -top-6 left-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-background">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold pt-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precos" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Planos simples para todos</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="flex flex-col">
                <CardContent className="p-8 space-y-6 flex-1">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-center">Grátis</h3>
                    <div className="text-4xl font-bold text-center">R$ 0<span className="text-base font-normal text-muted-foreground">/mês</span></div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Criar 1 currículo</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> 3 modelos disponíveis</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Download em PDF</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-auto">Começar agora</Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col border-primary relative overflow-hidden">
                <div className="absolute top-4 right-[-35px] bg-primary text-white px-10 py-1 rotate-45 text-xs font-bold uppercase">Recomendado</div>
                <CardContent className="p-8 space-y-6 flex-1">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-center">Premium</h3>
                    <div className="text-4xl font-bold text-center">R$ 19,90<span className="text-base font-normal text-muted-foreground">/mês</span></div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Currículos ilimitados</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Todos os modelos exclusivos</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Sem marca d'água</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Cores e fontes personalizadas</li>
                  </ul>
                  <Button className="w-full mt-auto">Assinar Premium</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 py-12 border-t">
        <div className="container grid md:grid-cols-4 gap-12">
          <div className="space-y-4 col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Layout className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">Currículo Fácil</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Ajudando profissionais a conquistarem seu lugar no mercado de trabalho com currículos incríveis.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <h4 className="font-bold">Plataforma</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/modelos" className="hover:text-primary transition-colors">Modelos</Link></li>
              <li><a href="#precos" className="hover:text-primary transition-colors">Preços</a></li>
              <li><Link to="/editor" className="hover:text-primary transition-colors">Criar Currículo</Link></li>
            </ul>
          </div>
          <div className="space-y-4 text-sm">
            <h4 className="font-bold">Suporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 Currículo Fácil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
