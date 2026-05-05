export interface SeoModel {
  slug: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  content: {
    heading: string;
    text: string;
  }[];
  keywords: string[];
}

export const seoModels: Record<string, SeoModel> = {
  "curriculo-administrativo": {
    slug: "curriculo-administrativo",
    title: "Modelo de Currículo para Auxiliar Administrativo | Currículo Fácil",
    description: "Crie um currículo perfeito para Auxiliar Administrativo. Veja o que colocar, exemplos de resumo profissional e modelos prontos para usar.",
    h1: "Currículo para Auxiliar e Assistente Administrativo",
    subtitle: "Aprenda a destacar suas habilidades em rotinas de escritório, atendimento e organização.",
    content: [
      {
        heading: "Como fazer um bom currículo administrativo?",
        text: "A área administrativa valoriza muita organização e habilidades com ferramentas de escritório (Pacote Office, sistemas de gestão). Certifique-se de destacar sua capacidade de lidar com múltiplas tarefas e atendimento ao público.",
      },
      {
        heading: "O que colocar no Resumo Profissional?",
        text: "Exemplo: 'Profissional com mais de 2 anos de experiência em rotinas administrativas, faturamento e atendimento ao cliente. Habilidade em planilhas Excel e elaboração de relatórios. Busco oportunidade para contribuir com a organização e eficiência do setor.'",
      },
      {
        heading: "Principais Habilidades (Skills)",
        text: "Pacote Office (Excel, Word, PowerPoint), Atendimento Telefônico, Organização de Arquivos, Redação de E-mails, Emissão de Notas Fiscais e Agendamento de Reuniões.",
      }
    ],
    keywords: ["auxiliar administrativo", "assistente administrativo", "currículo administrativo", "exemplo de currículo administrativo"]
  },
  "primeiro-emprego": {
    slug: "primeiro-emprego",
    title: "Modelo de Currículo para Primeiro Emprego | Jovem Aprendiz | Currículo Fácil",
    description: "Como fazer um currículo para o primeiro emprego sem ter experiência? Veja dicas, modelos e exemplos de como destacar suas habilidades e cursos.",
    h1: "Currículo para Primeiro Emprego (Sem Experiência)",
    subtitle: "Não tem experiência? Mostre seu potencial, cursos e vontade de aprender.",
    content: [
      {
        heading: "O que colocar quando não se tem experiência?",
        text: "Se você ainda não trabalhou, o foco do seu currículo deve ser em Cursos (inclusive online e gratuitos), Formação Acadêmica e Habilidades interpessoais (Soft Skills), além de trabalhos voluntários ou projetos escolares.",
      },
      {
        heading: "Resumo Profissional para Primeiro Emprego",
        text: "Exemplo: 'Estudante do Ensino Médio proativo e com facilidade de aprendizado. Possuo curso de Informática Básica e busco minha primeira oportunidade no mercado de trabalho como Jovem Aprendiz para desenvolver minhas habilidades e contribuir com o crescimento da empresa.'",
      },
      {
        heading: "A importância das Soft Skills",
        text: "Destaque características como: Comunicação clara, Trabalho em equipe, Vontade de aprender, Pontualidade e Resolução de problemas.",
      }
    ],
    keywords: ["primeiro emprego", "currículo sem experiência", "jovem aprendiz", "modelo de currículo primeiro emprego"]
  },
  "curriculo-atendimento-vendas": {
    slug: "curriculo-atendimento-vendas",
    title: "Modelo de Currículo para Vendedor e Atendimento | Currículo Fácil",
    description: "Quer trabalhar com vendas e atendimento ao cliente? Veja como criar um currículo focado em resultados, metas e comunicação.",
    h1: "Currículo para Vendas e Atendimento ao Cliente",
    subtitle: "Destaque suas habilidades de comunicação, negociação e alcance de metas.",
    content: [
      {
        heading: "Como se destacar na área de Vendas?",
        text: "Empresas buscam vendedores que trazem resultados. Se você tem experiência, mencione números: quantos clientes você atendia por dia? Qual era sua média de vendas? Bateu metas? Os números chamam muita atenção.",
      },
      {
        heading: "Resumo Profissional para Vendas",
        text: "Exemplo: 'Profissional de vendas com 3 anos de experiência em varejo. Histórico de superação de metas mensais em 15%. Especialista em atendimento ao cliente e fechamento de vendas. Busco um ambiente dinâmico para aplicar minhas técnicas de persuasão.'",
      },
      {
        heading: "Palavras-chave importantes",
        text: "Fidelização de Clientes, Negociação, CRM, Fechamento de Vendas, Comunicação Interpessoal, Metas e Resultados.",
      }
    ],
    keywords: ["currículo vendas", "currículo vendedor", "currículo atendimento ao cliente", "exemplo currículo vendedor"]
  }
};
