import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  canonical?: string;
}

export function SEO({
  title = "Currículo Fácil | Crie um Currículo Profissional Grátis",
  description = "Faça seu currículo online em poucos minutos com o Currículo Fácil. Ferramenta simples, rápida e gratuita para conquistar sua próxima vaga de emprego.",
  type = "website",
  name = "Currículo Fácil",
  canonical = "https://curriculos.fun",
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph tags / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content="https://curriculos.fun/og-image.jpg" />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://curriculos.fun/og-image.jpg" />
    </Helmet>
  );
}
