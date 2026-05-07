import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function LegalLayout({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: "terms" | "privacy";
  children: ReactNode;
}) {
  const Icon = icon === "privacy" ? ShieldCheck : FileText;

  return (
    <main
      className="min-h-[calc(100vh-4rem)] px-4 py-10 sm:px-6 sm:py-14"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 52%, #F8FAFC 100%)" }}
    >
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

        <section className="soft-surface rounded-xl p-6 sm:p-9">
          <div className="mb-8 flex flex-col gap-5 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#0D9488" }}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-teal-700">
                Currículo Fácil
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-[#0F2744] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="legal-content space-y-8 text-slate-700">
            {children}
          </div>

          <div className="mt-10 rounded-lg border border-teal-100 bg-teal-50/80 p-5">
            <p className="text-sm font-bold text-[#0F2744]">Contato do responsável</p>
            <p className="mt-1 text-sm text-slate-600">Jose Aparecido da Silva</p>
            <a
              href="mailto:silva.js.js1000@gmail.com"
              className="mt-3 inline-flex items-center gap-2 break-all text-sm font-semibold text-teal-700 hover:text-teal-900"
            >
              <Mail className="h-4 w-4 shrink-0" />
              silva.js.js1000@gmail.com
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-extrabold text-[#0F2744]">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}

export function TermsPage() {
  useEffect(() => {
    document.title = "Termos de Uso | Currículo Fácil";
  }, []);

  return (
    <LegalLayout
      title="Termos de Uso"
      subtitle="Leia as condições gerais para usar o Currículo Fácil e criar seus documentos com clareza e segurança."
      icon="terms"
    >
      <Section title="1. O que é o Currículo Fácil">
        <p>
          O Currículo Fácil é uma ferramenta gratuita para criar, editar,
          visualizar e baixar currículos profissionais em PDF, diretamente pelo
          navegador, sem necessidade de cadastro.
        </p>
        <p>
          Os modelos disponíveis são ferramentas de apoio para a construção de
          currículos. Eles não garantem, por si só, aprovação em processos
          seletivos, chamadas para entrevistas ou contratação.
        </p>
      </Section>

      <Section title="2. Responsabilidade do usuário">
        <p>
          Ao usar o site, você declara que as informações inseridas no currículo
          são verdadeiras e são de sua exclusiva responsabilidade.
        </p>
        <p>
          Você deve revisar o conteúdo do currículo antes de enviá-lo a
          empresas, recrutadores ou terceiros. O Currículo Fácil não se
          responsabiliza por erros, imprecisões ou informações inseridas pelo
          usuário.
        </p>
      </Section>

      <Section title="3. Sem garantia de resultados">
        <p>
          O Currículo Fácil não garante contratação, entrevistas, aprovação em
          processos seletivos ou qualquer outro resultado profissional decorrente
          do uso da ferramenta.
        </p>
      </Section>

      <Section title="4. Dados salvos no navegador">
        <p>
          As informações que você digita no editor ficam salvas no armazenamento
          local do seu navegador (localStorage), neste dispositivo. Você pode
          editar ou excluir seus currículos a qualquer momento pelo painel do
          site.
        </p>
      </Section>

      <Section title="5. Uso aceitável">
        <p>
          É proibido usar o Currículo Fácil para criar documentos com
          informações falsas, enganosas ou que violem direitos de terceiros.
        </p>
        <p>
          O site pode ser atualizado, ajustado ou ter recursos modificados a
          qualquer momento, com o objetivo de melhorar a experiência dos
          usuários.
        </p>
      </Section>

      <Section title="6. Limitação de responsabilidade">
        <p>
          O Currículo Fácil é oferecido sem garantias expressas ou implícitas.
          Não nos responsabilizamos por perdas, danos ou prejuízos decorrentes
          do uso ou da incapacidade de uso da ferramenta.
        </p>
      </Section>

      <Section title="7. Contato">
        <p>
          Para dúvidas sobre estes termos, fale pelo e-mail{" "}
          <a
            className="font-semibold text-teal-700 hover:text-teal-900"
            href="mailto:silva.js.js1000@gmail.com"
          >
            silva.js.js1000@gmail.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Política de Privacidade | Currículo Fácil";
  }, []);

  return (
    <LegalLayout
      title="Política de Privacidade"
      subtitle="Entenda como o Currículo Fácil trata as informações usadas para montar seu currículo, de forma transparente e simples."
      icon="privacy"
    >
      <Section title="1. Quais dados você informa">
        <p>
          Para criar seu currículo, você pode inserir dados pessoais como nome,
          e-mail, telefone, cidade, experiências profissionais, formação
          acadêmica, habilidades, idiomas e outras informações que decidir
          incluir no documento.
        </p>
        <p>
          Essas informações são usadas exclusivamente para gerar, editar,
          visualizar e baixar o seu currículo.
        </p>
      </Section>

      <Section title="2. Onde os dados ficam salvos">
        <p>
          Os currículos criados no site são salvos no armazenamento local do seu
          próprio navegador (localStorage), no dispositivo que você está usando.
          Esses dados não são enviados para servidores externos e não ficam
          acessíveis a terceiros.
        </p>
        <p>
          Se você limpar os dados do navegador, trocar de dispositivo ou usar
          outro navegador, os currículos salvos localmente podem não aparecer.
        </p>
      </Section>

      <Section title="3. Compartilhamento de dados">
        <p>
          O Currículo Fácil não vende, não compartilha e não exibe seus dados
          pessoais publicamente. O PDF gerado é de uso exclusivo seu.
        </p>
        <p>
          Links externos presentes no site, como WhatsApp e Instagram, seguem as
          políticas de privacidade das respectivas plataformas.
        </p>
      </Section>

      <Section title="4. Como apagar suas informações">
        <p>
          Você pode excluir currículos diretamente no painel do site. Também
          pode limpar os dados do navegador para remover todas as informações
          salvas localmente no dispositivo.
        </p>
      </Section>

      <Section title="5. Cookies e analytics">
        <p>
          O site pode utilizar ferramentas de análise de tráfego para entender
          como os usuários navegam nas páginas. Esses dados são gerais e
          anônimos — não incluem o conteúdo do currículo nem informações
          pessoais identificáveis.
        </p>
      </Section>

      <Section title="6. Mensagens de contato">
        <p>
          Se você entrar em contato por e-mail, WhatsApp ou Instagram, as
          informações fornecidas serão usadas apenas para responder à sua
          mensagem. Elas não serão compartilhadas com terceiros.
        </p>
      </Section>

      <Section title="7. Dúvidas">
        <p>
          Para qualquer dúvida sobre privacidade ou para solicitar a exclusão de
          dados, entre em contato pelo e-mail{" "}
          <a
            className="font-semibold text-teal-700 hover:text-teal-900"
            href="mailto:silva.js.js1000@gmail.com"
          >
            silva.js.js1000@gmail.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
