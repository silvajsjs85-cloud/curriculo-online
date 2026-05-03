import { Link } from "react-router-dom";
import { FileText, Download, Zap, Shield, Star } from "lucide-react";
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
                desc: "Seus dados ficam salvos com segurança. Acesse de qualquer dispositivo.",
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
        <p className="text-primary-foreground/80 mb-8 text-lg">Comece agora gratuitamente</p>
        <Button size="lg" variant="secondary" asChild className="text-base px-8">
          <Link to="/dashboard">Começar agora</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 bg-gray-50 border-t">
        © 2024 Currículo Fácil · curriculos.fun
      </footer>
    </div>
  );
}
