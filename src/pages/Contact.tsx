import { useEffect } from "react";
import { ArrowLeft, Clock, Instagram, Mail, MessageCircle, FileText, HelpCircle, FileWarning, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Contact() {
  useEffect(() => {
    document.title = "Contato | Currículo Fácil";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Button
            asChild
            variant="ghost"
            className="mb-8 rounded-xl text-slate-600 hover:bg-white hover:text-[#0F2744]"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para a home
            </Link>
          </Button>

          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-10 mb-10">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-5 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "#0D9488" }}
              >
                <Mail className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                  Currículo Fácil
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F2744] sm:text-4xl">
                  Fale com o Currículo Fácil
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Tire dúvidas sobre criação, edição ou download do seu currículo. Respondemos o mais breve possível.
                </p>
              </div>
            </div>

            {/* Podemos ajudar com */}
            <div className="mb-10">
              <h2 className="font-bold text-[#0F2744] mb-4 text-lg">Podemos ajudar com:</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Dúvidas para criar seu currículo</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <FileWarning className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Problemas ao baixar o PDF</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Sugestões ou melhorias para o site</span>
                </div>
              </div>
            </div>

            {/* Channels */}
            <h2 className="font-bold text-[#0F2744] mb-4 text-lg">Canais de atendimento:</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {/* Email */}
              <div
                className="group rounded-2xl border border-gray-100 p-6 bg-white hover:border-teal-100 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
              >
                <div className="flex flex-col items-start gap-4 mb-5 flex-1">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-teal-50"
                    style={{ backgroundColor: "#0D948815" }}
                  >
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-[#0F2744] mb-1">E-mail</h3>
                    <p className="text-sm text-gray-500 break-all w-full">
                      silva.js.js1000@gmail.com
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full rounded-xl h-10 font-semibold text-white bg-[#0D9488] hover:bg-[#0f766e] transition-colors mt-auto"
                >
                  <a href="mailto:silva.js.js1000@gmail.com">Enviar e-mail</a>
                </Button>
              </div>

              {/* WhatsApp */}
              <div
                className="group rounded-2xl border border-gray-100 p-6 bg-white hover:border-teal-100 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
              >
                <div className="flex flex-col items-start gap-4 mb-5 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2744] mb-1">WhatsApp</h3>
                    <p className="text-sm text-gray-500">(69) 98133-6994</p>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full rounded-xl h-10 font-semibold text-white bg-[#0D9488] hover:bg-[#0f766e] transition-colors mt-auto"
                >
                  <a
                    href="https://wa.me/5569981336994"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chamar no Whats
                  </a>
                </Button>
              </div>

              {/* Instagram */}
              <div
                className="group rounded-2xl border border-gray-100 p-6 bg-white hover:border-teal-100 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
              >
                <div className="flex flex-col items-start gap-4 mb-5 flex-1">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
                    }}
                  >
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2744] mb-1">Instagram</h3>
                    <p className="text-sm text-gray-500">@joseap096</p>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full rounded-xl h-10 font-semibold text-white bg-[#0D9488] hover:bg-[#0f766e] transition-colors mt-auto"
                >
                  <a
                    href="https://instagram.com/joseap096"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver Instagram
                  </a>
                </Button>
              </div>
            </div>

            {/* Response time and Responsável */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-teal-600 shrink-0" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-[#0F2744]">
                    Atendimento:
                  </span>{" "}
                  respondemos normalmente em até 24h.
                </p>
              </div>

              {/* Responsável Card */}
              <div className="rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 transition-all hover:shadow-md" style={{ boxShadow: "0 4px 20px rgba(15,39,68,0.04)" }}>
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-teal-600 rounded-3xl blur-md opacity-20 translate-y-2"></div>
                  <img 
                    src="/foto-responsavel.webp" 
                    alt="Jose Aparecido da Silva - Responsável pelo Currículo Fácil" 
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-sm border-4 border-white"
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1.5">
                    Responsável pelo atendimento
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0F2744]">
                    Jose Aparecido da Silva
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
                    Criador do Currículo Fácil. Atendimento para dúvidas, sugestões e suporte sobre o uso da ferramenta.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-6 pt-5 border-t border-slate-100 w-full">
                    <a href="mailto:silva.js.js1000@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                      <Mail className="h-4 w-4" />
                      silva.js.js1000@gmail.com
                    </a>
                    <a href="https://wa.me/5569981336994" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-600 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      (69) 98133-6994
                    </a>
                    <a href="https://instagram.com/joseap096" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">
                      <Instagram className="h-4 w-4" />
                      @joseap096
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-end gap-2 px-2 pt-2">
                <p className="text-xs text-slate-400 text-center sm:text-right">Suas informações de contato são usadas apenas para responder sua mensagem.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0a1828" }}>
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #0D9488, transparent)" }} />

        <div className="container mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 mb-10">

            {/* Brand */}
            <div className="min-w-0">
              <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold text-white text-lg mb-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0D9488" }}>
                  <FileText style={{ height: "18px", width: "18px", color: "white" }} />
                </div>
                Currículo Fácil
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                A ferramenta simples e gratuita para criar um currículo profissional em poucos minutos.
              </p>
              <p className="mt-4 text-sm font-semibold text-teal-300">
                curriculos.fun
              </p>
            </div>

            {/* Product */}
            <div className="min-w-0">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Produto</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Modelos de currículo", to: "/modelos" },
                  { label: "Como funciona", to: "/#como-funciona" },
                  { label: "Depoimentos", to: "/#depoimentos" },
                  { label: "Dicas de carreira", to: "/#dicas" },
                  { label: "Criar currículo", to: "/criar" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal and support */}
            <div className="min-w-0">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal e Suporte</h4>
              <ul className="space-y-2.5 break-words">
                <li>
                  <Link to="/termos-de-uso" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    Ajuda
                  </Link>
                </li>
                <li className="pt-2 text-sm text-gray-400">
                  Responsável: Jose Aparecido da Silva
                </li>
                <li>
                  <a
                    href="mailto:silva.js.js1000@gmail.com"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    E-mail: silva.js.js1000@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5569981336994"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    WhatsApp: (69) 98133-6994
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/joseap096"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    Instagram: @joseap096
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs text-gray-500">
              © 2026 Currículo Fácil · curriculos.fun · Todos os direitos reservados
            </p>
            <p className="text-xs text-gray-500">
              Feito para ajudar pessoas a criarem currículos melhores e conquistarem novas oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
