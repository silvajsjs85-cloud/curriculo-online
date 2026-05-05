import { useEffect } from "react";
import { ArrowLeft, Clock, Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Contact() {
  useEffect(() => {
    document.title = "Contato | Currículo Fácil";
  }, []);

  return (
    <main
      className="min-h-[calc(100vh-4rem)] px-4 py-10 sm:px-6 sm:py-14"
      style={{ backgroundColor: "#F7F6F3" }}
    >
      <div className="mx-auto max-w-2xl">
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

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-9">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#0D9488" }}
            >
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                Currículo Fácil
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F2744] sm:text-4xl">
                Fale conosco
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                Tem alguma dúvida, sugestão ou precisa de ajuda? Entre em contato
                pelos canais abaixo.
              </p>
            </div>
          </div>

          {/* Channels */}
          <div className="space-y-4 mb-8">
            {/* Email */}
            <div
              className="rounded-2xl border border-gray-100 p-5"
              style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#0D948815" }}
                >
                  <Mail className="h-5 w-5 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F2744] mb-1">E-mail</h3>
                  <p className="text-sm text-gray-500 mb-3 break-all">
                    silva.js.js1000@gmail.com
                  </p>
                  <Button
                    asChild
                    className="btn-cta rounded-xl h-9 px-4 text-sm font-semibold"
                  >
                    <a href="mailto:silva.js.js1000@gmail.com">Enviar e-mail</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div
              className="rounded-2xl border border-gray-100 p-5"
              style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F2744] mb-1">WhatsApp</h3>
                  <p className="text-sm text-gray-500 mb-3">(69) 98133-6994</p>
                  <Button
                    asChild
                    className="rounded-xl h-9 px-4 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    <a
                      href="https://wa.me/5569981336994"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chamar no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div
              className="rounded-2xl border border-gray-100 p-5"
              style={{ boxShadow: "0 1px 8px rgba(15,39,68,0.05)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
                  }}
                >
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F2744] mb-1">Instagram</h3>
                  <p className="text-sm text-gray-500 mb-3">@joseap096</p>
                  <Button
                    asChild
                    className="rounded-xl h-9 px-4 text-sm font-semibold text-white border-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #f58529 0%, #dd2a7b 100%)",
                    }}
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
            </div>
          </div>

          {/* Response time */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-teal-600 shrink-0" />
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-[#0F2744]">
                Tempo médio de resposta:
              </span>{" "}
              até 24h
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
