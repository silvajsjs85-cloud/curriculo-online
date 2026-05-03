import { Link } from "react-router-dom";
import { FileText, Download, Zap, Shield, Star, ClipboardList, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-fade-in max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="h-3.5 w-3.5" />
            100% grátis e sem limite
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Crie seu currículo
            <span className="text-primary"> profissional</span>
            <br />em minutos
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
            Modelos modernos, preview em tempo real e download em PDF — tudo em um só lugar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild className="text-base px-8">
              <Link to="/dashboard">Criar meu currículo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8">
              <Link to="/dashboard">Ver modelos</Link>
            </Button>
          </div>
        </div>

        {/* App mockup */}
        <div className="mt-16 w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <div className="bg-gray-100 border-b px-4 py-2.5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 font-mono">curriculos.fun/builder</span>
          </div>
          <div className="flex h-56 sm:h-72">
            {/* Form side */}
            <div className="w-2/5 border-r bg-gray-50 p-4 space-y-3">
              <div className="flex gap-1 mb-3">
                {["Pessoal", "Exp.", "Form.", "Hab.", "Idiomas"].map((t, i) => (
                  <span key={t} className={`text-xs px-2 py-1 rounded font-medium ${i === 0 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>{t}</span>
                ))}
              </div>
              {[["Nome completo", "João Silva"], ["E-mail", "joao@email.com"], ["Telefone", "(11) 99999-9999"], ["Localização", "São Paulo, SP"]].map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="bg-white border rounded px-2 py-1 text-xs text-gray-600">{val}</div>
                </div>
              ))}
            </div>
            {/* Preview side */}
            <div className="flex-1 p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between border-b-2 border-blue-500 pb-2 mb-1">
                <div>
                  <div className="h-3 w-32 bg-gray-800 rounded mb-1" />
                  <div className="flex gap-2">
                    <div className="h-2 w-20 bg-gray-300 rounded" />
                    <div className="h-2 w-16 bg-gray-300 rounded" />
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200" />
              </div>
              <div className="h-2 w-24 bg-blue-400 rounded mb-1" />
              <div className="space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-5/6 bg-gray-100 rounded" />
                <div className="h-2 w-4/6 bg-gray-100 rounded" />
              </div>
              <div className="h-2 w-24 bg-blue-400 rounded mt-2 mb-1" />
              <div className="space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-3/4 bg-gray-100 rounded" />
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {["React", "TypeScript", "Node.js"].map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-4 bg-gray-50 border-y">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Como funciona?</h2>
          <p className="text-gray-500 text-center mb-14">Em 3 passos simples, seu currículo profissional está pronto</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
                step: "1",
                title: "Preencha seus dados",
                desc: "Informe suas experiências, formação, habilidades e idiomas no editor intuitivo.",
              },
              {
                icon: <Eye className="h-8 w-8 text-indigo-600" />,
                step: "2",
                title: "Escolha um modelo",
                desc: "Selecione entre Moderno, Clássico ou Minimalista e veja o resultado em tempo real.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                step: "3",
                title: "Baixe em PDF",
                desc: "Exporte seu currículo em PDF de alta qualidade, pronto para enviar aos recrutadores.",
              },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-md flex items-center justify-center border">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Por que escolher o Currículo Fácil?</h2>
          <p className="text-gray-500 text-center mb-12">Tudo que você precisa para se destacar no mercado de trabalho</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-7 w-7 text-yellow-500" />,
                title: "Rápido e simples",
                desc: "Crie um currículo completo em menos de 10 minutos com nosso editor intuitivo.",
              },
              {
                icon: <FileText className="h-7 w-7 text-blue-500" />,
                title: "3 modelos profissionais",
                desc: "Moderno, Clássico e Minimalista — escolha o que melhor representa você.",
              },
              {
                icon: <Download className="h-7 w-7 text-green-500" />,
                title: "Download em PDF",
                desc: "Exporte seu currículo em PDF de alta qualidade, pronto para enviar.",
              },
              {
                icon: <Shield className="h-7 w-7 text-purple-500" />,
                title: "Salvamento automático",
                desc: "Seus dados ficam salvos automaticamente enquanto você digita.",
              },
              {
                icon: <Star className="h-7 w-7 text-orange-500" />,
                title: "Preview em tempo real",
                desc: "Veja como fica seu currículo enquanto preenche as informações.",
              },
              {
                icon: <Zap className="h-7 w-7 text-indigo-500" />,
                title: "Completamente grátis",
                desc: "Sem planos pagos, sem marcas d'água. Crie e baixe quantos quiser.",
              },
            ].map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para criar seu currículo?</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">Comece agora gratuitamente — leva menos de 10 minutos</p>
        <Button size="lg" variant="secondary" asChild className="text-base px-8">
          <Link to="/dashboard">Começar agora</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 bg-gray-50 border-t">
        © 2026 Currículo Fácil · curriculos.fun
      </footer>
    </div>
  );
}
