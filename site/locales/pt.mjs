export default {
  label: "Português", htmlLang: "pt", ogLocale: "pt_BR",
  site: { title: "94 Tools — Ferramentas online grátis, prontas para usar", description: "Converta números em palavras em vietnamita, conte palavras e caracteres, crie figurinhas com fotos. Grátis, sem conta, processado no seu navegador.", tagline: "Utilidades para o dia a dia, grátis." },
  ui: {
    skip: "Ir para o conteúdo principal", menu: "Menu principal", language: "Idioma", home: "Início", allTools: "Todas as ferramentas", tools: "Ferramentas", blog: "Blog (vietnamita)", about: "Sobre", aboutFooter: "Sobre · Privacidade · Código-fonte",
    heroTitle: (b) => `Faça tudo mais rápido com ${b}`, heroDesc: "Aumente sua produtividade com o 94 Tools – ferramentas online gratuitas para concluir tarefas num instante! Converta números em palavras, conte palavras, crie figurinhas com fotos e muito mais, direto no navegador.",
    search: "Pesquisar ferramentas", searchPlaceholder: "Pesquisar todas as ferramentas", noResults: "Nenhum resultado", categories: "Categorias de ferramentas",
    seeAll: (c) => `Ver todas as ${c.toLowerCase()}`, tryTool: (t) => `Experimentar ${t}`, allOf: (c) => `Todas as ${c.toLowerCase()}`, searchIn: (c) => `Pesquisar em ${c.toLowerCase()}`, back: "Voltar ao início", categoryTitle: (c) => `${c} online grátis`,
    seeExamples: "Ver exemplos", options: "Opções da ferramenta", whatIs: (t) => `O que é ${t}?`, examples: (t) => `Exemplos: ${t}`, clickToTry: "Clique para experimentar!", tryExample: "Experimentar exemplo", moreTools: "Mais ferramentas para você",
    import: "Importar arquivo", clear: "Limpar", download: "Baixar", copy: "Copiar",
  },
  quick: ["Valor por extenso em vietnamita", "Contar palavras", "Criar figurinha", "Converter coluna do Excel", "Contar caracteres", "Remover fundo da imagem"],
  categories: [
    { name: "Ferramentas numéricas", description: "Ferramentas para números – converta valores em palavras em vietnamita e leia colunas inteiras do Excel para faturas, recibos, contratos e muito mais." },
    { name: "Ferramentas de texto", description: "Ferramentas para texto – conte palavras, caracteres com e sem espaços e linhas para artigos, trabalhos escolares, descrições de produtos e muito mais." },
    { name: "Ferramentas de imagem", description: "Ferramentas para imagens – remova o fundo, adicione contorno e texto e crie figurinhas PNG no navegador, sem instalar nada." },
  ],
  tools: [
    {
      name: "Números por extenso em vietnamita", short: "Escreva valores por extenso em vietnamita", keywords: "numero por extenso vietnamita valor dong fatura excel",
      description: "Escreva valores por extenso em vietnamita. Cole uma coluna inteira do Excel e copie todos os resultados de uma vez.",
      title: "Números por extenso em vietnamita — Cole colunas do Excel", meta: "Conversor grátis que escreve números por extenso em vietnamita. Aceita valores em đồng, negativos, decimais e várias linhas do Excel; mantém números grandes exatos.",
      info: "O conversor de números por extenso em vietnamita transforma um número – como o valor de uma fatura, recibo ou contrato – na sua forma escrita em vietnamita. Digite um número ou cole uma coluna do Excel, escolha o formato dos separadores e a unidade e copie ou baixe o resultado. A saída é sempre em vietnamita.",
      prose: `<h2>Como converter números por extenso em vietnamita</h2><ol><li>Escolha o formato vietnamita ou internacional de acordo com seus dados.</li><li>Digite um número ou cole uma coluna de números do Excel na caixa à esquerda.</li><li>Confira o resultado, clique em <strong>Copiar</strong> abaixo dele e cole na planilha ou documento.</li></ol><p>Por exemplo, <code>1.250.000</code> no formato vietnamita é lido como <strong>một triệu hai trăm năm mươi nghìn đồng</strong> (um milhão duzentos e cinquenta mil đồng). Para ler apenas o número, escolha “Sem unidade”.</p><h2>Como o ponto e a vírgula são interpretados?</h2><p>No formato vietnamita, o ponto separa os milhares e a vírgula marca os decimais: <code>1.234,5</code>. O formato internacional inverte os dois: <code>1,234.5</code>. Os grupos de milhar devem ter exatamente três dígitos; a ferramenta não adivinha entradas erradas.</p><h2>Perguntas frequentes</h2><details><summary>Números grandes e negativos são aceitos?</summary><p>Sim. A entrada é mantida como texto, sem perder dígitos no limite de inteiros do JavaScript. Números negativos são lidos com o prefixo “âm”.</p></details><details><summary>Como a parte decimal é lida?</summary><p>A parte decimal é lida após a palavra “phẩy”, seguida da unidade escolhida. A ferramenta não converte frações em centavos nem arredonda valores.</p></details><details><summary>Posso usar em faturas?</summary><p>Você pode copiar o resultado para seus documentos. Confira sempre o valor, os separadores e a unidade conforme as exigências do documento.</p></details>`,
    },
    {
      name: "Contador de palavras e caracteres", short: "Conte palavras, caracteres e linhas", keywords: "contador de palavras contar caracteres letras linhas tamanho texto",
      description: "Confira palavras, caracteres e linhas enquanto digita. Funciona com acentos, todos os idiomas e emoji.",
      title: "Contador de palavras e caracteres online grátis", meta: "Conte palavras, caracteres com e sem espaços e linhas enquanto digita. Funciona com acentos e emoji; seu texto não sai do navegador.",
      info: "O contador de palavras e caracteres mostra na hora quantas palavras, caracteres com e sem espaços e linhas seu texto tem. Útil para escrever com limite de palavras, criar descrições de produtos, títulos de SEO ou posts para redes sociais.",
      prose: `<h2>Como funciona o contador de palavras?</h2><p>Cole o texto na caixa <strong>Texto</strong>. As contagens são atualizadas ao vivo para você conferir o tamanho de artigos, trabalhos, descrições ou posts.</p><h2>Regras de contagem claras</h2><ul><li><strong>Palavras separadas por espaços:</strong> cada grupo separado por espaços, tabulações ou quebras de linha com pelo menos uma letra ou dígito conta como um. “Olá mundo muito grande” conta 4.</li><li><strong>Caracteres:</strong> caracteres visíveis (grafemas Unicode), incluindo espaços e quebras de linha. Um emoji de família combinado conta como 1.</li><li><strong>Caracteres sem espaços:</strong> exclui espaços, tabulações e quebras de linha.</li><li><strong>Linhas:</strong> conforme as quebras de linha digitadas; a quebra automática na tela não cria linhas. Uma caixa vazia tem 0 linhas.</li></ul><p>As palavras são contadas pelos espaços, não por análise linguística; por isso, idiomas escritos sem espaços (como chinês ou japonês) contam cada bloco de texto como uma palavra. Pontuação ou emoji isolados não são palavras.</p><h2>Perguntas frequentes</h2><details><summary>Por que a contagem difere do Word ou de uma rede social?</summary><p>Cada plataforma separa palavras e conta emoji de um jeito. Use o contador da plataforma de destino se precisar respeitar um limite específico.</p></details><details><summary>Meu texto é salvo em algum servidor?</summary><p>Não. A contagem acontece no navegador e nada é enviado. A caixa não é salva ao recarregar a página.</p></details>`,
    },
    {
      name: "Criar figurinhas com fotos", short: "Remova o fundo, adicione contorno e exporte PNG", keywords: "criar figurinha sticker remover fundo png contorno recortar transparente",
      description: "Remova o fundo, adicione contorno e texto e exporte em PNG. Transforme sua foto em figurinha direto no navegador.",
      title: "Criar figurinhas com fotos online — Remover fundo", meta: "Crie figurinhas com suas fotos grátis no navegador. Remova o fundo, adicione contornos e texto e baixe em PNG com o editor Sticker Canvas.",
      info: "O criador de figurinhas transforma uma foto em figurinha: remove o fundo no seu dispositivo, adiciona contorno branco, insere texto e baixa um arquivo PNG. Sem instalar apps ou criar conta; sua foto não é enviada a um servidor para remover o fundo.",
      prose: `<h2>Como criar uma figurinha com uma foto</h2><ol><li>Clique em <strong>Abrir criador de figurinhas</strong> e use o botão de envio ou arraste uma foto para a tela.</li><li>Selecione a foto na tela e escolha <strong>Remove background</strong> no painel de edição.</li><li>Ajuste o contorno (Outline), o tamanho ou adicione texto com a ferramenta de texto.</li><li>Use o botão PNG da imagem selecionada para baixar só a figurinha; o download do menu da tela exporta todo o layout.</li></ol><h2>Remoção de fundo no seu dispositivo</h2><p>O modelo de imagem roda no navegador. As fotos não são enviadas a nenhuma API de remoção de fundo. O primeiro uso baixa os arquivos de processamento; o navegador pode guardá-los em cache.</p><p>Fotos nítidas, com o objeto bem separado do fundo, funcionam melhor. Cabelos, objetos transparentes e fundos complexos podem deixar bordas ou perder detalhes. Confira o resultado antes de baixar.</p><h2>Perguntas frequentes</h2><details><summary>O PNG baixado tem fundo transparente?</summary><p>Depois de remover o fundo, salvar a imagem selecionada cria um PNG de figurinha. Exportar a tela inteira inclui o fundo de papel e todos os elementos; as duas exportações são diferentes.</p></details><details><summary>Funciona no celular?</summary><p>Sim, a interface se adapta a telas pequenas. A remoção de fundo exige memória e tempo; aparelhos mais novos oferecem uma experiência melhor.</p></details><details><summary>Cria pacotes de figurinhas do WhatsApp ou Zalo?</summary><p>No momento, cria e baixa imagens PNG. Importá-las como pacote depende dos recursos e requisitos do seu app de mensagens.</p></details>`,
    },
  ],
  number: {
    label: "Converter números por extenso", input: "Números", result: "Resultado por extenso em vietnamita", placeholder: "Um número por linha, ex.: 1250000", resultPlaceholder: "O resultado aparecerá aqui…",
    help: "Até 30.000 caracteres, 300 por número. Linhas vazias são mantidas para colar de volta no Excel.", noscript: "Ative o JavaScript para converter números no seu dispositivo.",
    groups: [
      { title: "Formato numérico", choices: [["Vietnamita: 1.234.567,89", "O ponto separa os milhares e a vírgula vem antes dos decimais."], ["Internacional: 1,234,567.89", "A vírgula separa os milhares e o ponto vem antes dos decimais."]] },
      { title: "Unidade no final", choices: [["Đồng (VND)", "Adiciona “đồng” após o resultado, para valores em dinheiro."], ["Sem unidade", "Lê apenas o número."]] },
    ],
    examples: [
      ["Valor de fatura", "Valor no formato vietnamita, com pontos entre os milhares e a unidade đồng no final."],
      ["Colar uma coluna do Excel", "Um número por linha. Linhas vazias são mantidas para que cada resultado corresponda à sua célula."],
      ["Decimal internacional", "Vírgula entre os milhares e ponto antes dos decimais. Lê só o número, sem unidade."],
    ],
  },
  counter: {
    label: "Contador de texto", input: "Texto", stats: "Estatísticas", placeholder: "Digite ou cole seu texto aqui…", help: "Até 100.000 caracteres. As regras de contagem são explicadas abaixo.", noscript: "Ative o JavaScript para ver a contagem de palavras e caracteres.",
    labels: { words: "Palavras separadas por espaços", characters: "Caracteres", withoutSpaces: "Caracteres sem espaços", lines: "Linhas" },
    examples: [
      ["Saudação com emoji", "Um emoji conta como um caractere, mas não como palavra.", "Olá, mundo! 👋\nPequenas ferramentas deixam o dia mais leve."],
      ["Descrição de produto", "Confira o tamanho da descrição antes de anunciar num marketplace.", "Camiseta 100% algodão, modelagem ampla e fresca. Entrega em 2–3 dias."],
      ["Título de artigo", "Títulos de SEO devem ser curtos; conte os caracteres para não serem cortados nos resultados de busca.", "Como escrever valores por extenso corretamente em faturas"],
    ],
  },
  sticker: {
    label: "Criador de figurinhas", input: "Imagem de entrada", result: "Resultado", open: "Abrir criador de figurinhas", editor: "Abrir editor",
    drop: "Clique para escolher uma foto ou arraste-a para cá. Ela abre no criador de figurinhas.",
    note: "A primeira remoção de fundo baixa um modelo de cerca de 46 MB. O tempo depende do dispositivo; o editor está em inglês.",
  },
  about: {
    title: "Sobre, privacidade e código-fonte", description: "Sobre o 94 Tools, como seus dados são processados no navegador e os projetos de código aberto que usamos.",
    h1: "Ferramentas pequenas. Código aberto.", lead: "O 94 Tools reúne utilidades simples para você resolver tarefas do dia a dia direto no navegador.",
    html: `<h2>Grátis e sem conta</h2><p>Todas as ferramentas atuais são gratuitas. O site é feito com projetos de código aberto e recursos padrão do navegador.</p><h2>Seus dados</h2><p>Textos, números e imagens são processados no seu dispositivo e não são enviados a um servidor para conversão. O editor de figurinhas salva seu trabalho no armazenamento do navegador para você reabrir depois. Em computadores compartilhados, apague os dados do site nas configurações do navegador ao terminar.</p><p>O servidor ainda recebe pedidos de páginas, JavaScript e do modelo, com informações técnicas como seu endereço IP. Esta versão não tem anúncios nem ferramentas de análise de terceiros.</p><h2>Código aberto e licenças</h2>`,
    feedback: `<h2>Sugestões e relatos de erros</h2><p>Você pode relatar problemas técnicos no <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a>. Use conteúdo de exemplo em vez de valores ou fotos pessoais.</p>`,
  },
  credits: { source: "Código-fonte do site e do Sticker Canvas", fork: "fork de", license: "Licença", counter: "Usado como referência; o contador deste site segue as regras de espaços e Unicode descritas na página da ferramenta.", ui: "Interface inspirada no", cards: "Reescrita em HTML e CSS estáticos; o fundo da página inicial vem do OmniTools. Cards de artigos inspirados no", font: "Fonte", icons: "Ícones via", model: "O modelo IS-Net de remoção de fundo usa a licença Apache-2.0. O decodificador HEIC inclui componentes ISC/LGPLv3.", notices: "Avisos de terceiros", modelLicense: "Licença do modelo" },
  js: { line: "Linha", format: "O número ou os separadores não correspondem ao formato escolhido.", length: "Cada número pode ter no máximo 300 caracteres.", errors: "{n} linha(s) precisam de correção. Confira o formato numérico em Opções da ferramenta.", copied: "Copiado.", selected: "Conteúdo selecionado. Pressione Ctrl+C ou escolha Copiar no celular.", segmenter: "Atualize seu navegador para contar caracteres Unicode e emoji com precisão.", file: "numeros-por-extenso-vietnamita.txt" },
};
