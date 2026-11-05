/*
 * Produtos atuais mantidos. Os registros demo-* são exemplos de demonstração, não ofertas confirmadas.
 * Para produtos reais, troque os dados e mantenha cada peça em um único registro.
 * Um produto pode aparecer em várias páginas pelo array `categories`.
 * A propriedade `sizes` não gera seletor; opções especiais de tamanho devem ser configuradas explicitamente em `variantOptions`.
 */
window.CUBIC_PRODUCTS = [
  { id:'kit-porta-foto-polaroid-coracao', name:'Kit Porta-Foto Polaroid Coração', cardTitleSingleLine:true, imageFitContain:true, cardImage:'assets/photos/products/suporte-fotos-polaroid/1 - suporte-porta-foto-coracao-medidas.png', category:'Presentes e Hobbies', categories:['Lembrancinhas'], price:20, description:'Kit de suportes porta-foto em formato de coração para destacar lembranças e decorar com fotos estilo Polaroid ou Instax.', fullDescription:'Kit de suportes porta-foto em formato de coração, ideal para destacar lembranças e transformar fotos em parte da decoração. Perfeito para casamentos, festas, lembrancinhas, noivados, eventos e composições decorativas com fotos estilo Polaroid ou Instax.', detailContent:{paragraphs:['Kit de suportes porta-foto em formato de coração, ideal para destacar lembranças e transformar fotos em parte da decoração.','Perfeito para casamentos, festas, lembrancinhas, noivados, eventos e composições decorativas com fotos estilo Polaroid ou Instax.'],sections:[{title:'Opções disponíveis',items:['Kit com 5 unidades: R$ 20,00','Kit com 10 unidades: R$ 40,00','Kit com 20 unidades: R$ 60,00']}],note:'Selecione a quantidade desejada para consultar o preço do kit.'}, image:'assets/photos/products/suporte-fotos-polaroid/1 - suporte-porta-foto-coracao-medidas.png', imageAlt:'Suporte porta-foto de coração com medidas aproximadas', imageAlts:['Suporte porta-foto de coração com medidas aproximadas','Kit de suportes porta-foto coração com foto de casamento'], images:['assets/photos/products/suporte-fotos-polaroid/1 - suporte-porta-foto-coracao-medidas.png','assets/photos/products/suporte-fotos-polaroid/2 - kit-suportes-porta-foto-coracao-casamento.png'], dimensions:null, variantLabel:'Quantidade', orderFieldsAfterSection:'Opções disponíveis', variantPriceBeforeColor:true, hideVariantColorSelector:false, colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'], variantPriceInline:false, variantOptions:[{value:'5',label:'5 unidades',price:20},{value:'10',label:'10 unidades',price:40},{value:'20',label:'20 unidades',price:60}], demonstrative:false },
  // Temporariamente pausados; remova os comentários para reativar os produtos.
  //  { id:'demo-01', name:'Vaso modular', category:'Decoração', categories:['Vasos decorativos','Decoração'], price:39.90, description:'Um volume geométrico para dar destaque a pequenos arranjos e composições.', fullDescription:'Exemplo demonstrativo de peça decorativa. A forma modular cria um ponto de interesse em estantes, mesas e aparadores. As dimensões, o material e as opções de acabamento devem ser confirmados antes do cadastro como produto real.', image:'assets/photos/categories/vasos-decorativos.webp', dimensions:{height:120,width:90,depth:90}, material:'PLA (exemplo)', colors:['Areia','Terracota','Preto'],  leadTime:'Consulte disponibilidade', featured:1 },
  //  { id:'demo-02', name:'Organizador de mesa', category:'Organização', categories:['Organização da casa','Escritórios','Identificação e organização profissional'], price:34.90, description:'Compartimentos práticos para deixar seus pequenos itens sempre à mão.', fullDescription:'Exemplo demonstrativo para organização de mesa. Uma peça com divisórias que pode ser adaptada às necessidades do espaço. Medidas e configuração final devem ser avaliadas antes da produção.', image:'assets/photos/categories/organizacao-da-casa.webp', dimensions:{height:45,width:180,depth:100}, material:'PLA (exemplo)', colors:['Branco','Cinza','Verde oliva'],  leadTime:'Consulte disponibilidade', featured:2 },
  //  { id:'demo-03', name:'Suporte para celular', category:'Suportes', categories:['Suportes e acessórios','Tecnologia e informática'], price:24.90, description:'Inclinação confortável para acompanhar chamadas e conteúdos no dia a dia.', fullDescription:'Exemplo demonstrativo de suporte para celular. A compatibilidade pode variar conforme o aparelho e a capa utilizada. Confirme as dimensões necessárias ao solicitar um orçamento.', image:'assets/photos/categories/suportes-e-acessorios.webp', dimensions:{height:85,width:75,depth:95}, colors:['Preto','Azul','Areia'],  leadTime:'Consulte disponibilidade', featured:3 },
  //  { id:'demo-04', name:'Gancho multiuso', category:'Banheiro', categories:['Banheiro','Organização da casa'], price:14.90, description:'Uma solução compacta para pendurar acessórios e aproveitar melhor a parede.', fullDescription:'Exemplo demonstrativo de gancho multiuso. O método de fixação, a superfície indicada e a capacidade de carga precisam ser confirmados para cada projeto.', image:'assets/photos/categories/banheiro.webp', dimensions:{height:65,width:40,depth:55}, colors:['Branco','Preto'],  leadTime:'Consulte disponibilidade', featured:4 },
  //  { id:'demo-05', name:'Porta-temperos', category:'Cozinha', categories:['Cozinha','Organização da casa'], price:49.90, description:'Organize seus temperos com uma peça funcional que também compõe a bancada.', fullDescription:'Exemplo demonstrativo de organizador para cozinha. Não inclui recipientes, salvo confirmação. Dimensões e material devem ser validados para o local de uso e as necessidades do cliente.', image:'assets/photos/categories/cozinha.webp', dimensions:{height:95,width:220,depth:75}, material:'PLA (exemplo)', colors:['Areia','Preto','Verde oliva'],  leadTime:'Consulte disponibilidade', featured:5 },
  //  { id:'demo-06', name:'Porta-cartões', category:'Escritório', categories:['Escritório','Escritórios','Lojas e comércio'], price:19.90, description:'Deixe cartões e pequenos lembretes organizados e à vista.', fullDescription:'Exemplo demonstrativo de acessório de escritório. A capacidade e as dimensões podem ser ajustadas após avaliação do uso desejado.', image:'assets/photos/categories/escritorio.webp', dimensions:{height:40,width:100,depth:70}, colors:['Preto','Branco','Azul'],  featured:6 },
  //  { id:'demo-07', name:'Chaveiro geométrico', category:'Presentes', categories:['Presentes criativos','Brindes corporativos','Personalizados'], price:9.90, description:'Uma pequena peça personalizável para presentear ou identificar suas chaves.', fullDescription:'Exemplo demonstrativo de lembrança. Formato, cor e possibilidade de personalização dependem de avaliação. Preço apresentado apenas para demonstração.', image:'assets/photos/categories/presentes-criativos.webp', dimensions:{height:45,width:35,depth:8}, colors:['Terracota','Azul','Verde oliva'],  featured:7 },
  //  { id:'demo-08', name:'Peça sob medida', category:'Personalizados', categories:['Personalizados','Outras ideias'], price:null, description:'Tem uma ideia? Conte os detalhes e vamos avaliar juntos.', fullDescription:'Este item é apenas uma chamada demonstrativa para projetos personalizados. Cada pedido depende de avaliação de viabilidade, dimensões, material, acabamento e prazo. O preço será definido após avaliação.', image:'assets/photos/categories/personalizados.webp', dimensions:null, colors:['Preto','Branco','Areia','Azul'],  featured:8 },
  { id:'rena-natalina', name:'Rena Natalina - 13,5cm', category:'Natal', categories:['Natal'], price:20.00, description:'Rena natalina canelada em impressão 3D. Disponível em 13,5 cm por R$ 20,00, 17,5 cm por R$ 30,00 ou kit com uma rena grande e uma pequena por R$ 45,00.', cardDescription:'Rena natalina canelada para decorar a casa ou presentear. Disponível em tamanhos individuais e em kit.', fullDescription:'Adicione um toque especial à sua decoração de Natal com esta rena impressa em 3D. Seu design minimalista e textura canelada combinam elegância e modernidade, tornando-a ideal para decorar mesas, estantes, aparadores e outros ambientes. Uma peça versátil que combina com diferentes estilos de decoração e também é uma ótima opção para presentear. Produzida por impressão 3D, com design minimalista e textura canelada, acabamento moderno e decorativo. Disponível em 13,5 cm, 17,5 cm ou kit com uma rena grande e uma rena pequena.', detailContent:{paragraphs:['Adicione um toque especial à sua decoração de Natal com esta rena impressa em 3D. Seu design minimalista e textura canelada combinam elegância e modernidade, tornando-a ideal para decorar mesas, estantes, aparadores e outros ambientes.','Uma peça versátil que combina com diferentes estilos de decoração e também é uma ótima opção para presentear.'],features:['Produzida por impressão 3D.','Design minimalista com textura canelada.','Acabamento moderno e decorativo.','Ideal para decoração natalina e presentes criativos.'],sections:[{title:'Tamanhos disponíveis',items:['13,5 cm: Rena pequena.','17,5 cm: Rena grande.','Kit: 1 rena grande + 1 rena pequena.']}],note:'Escolha o tamanho ou kit desejado nas opções do produto.'}, image:'assets/photos/products/rena-natalina/rena-natalina-canelada-grupo-decoracao-natal.webp', imageAlt:'Três renas natalinas caneladas em cores diferentes, decoração em impressão 3D', imageAlts:['Três renas natalinas caneladas em cores diferentes','Rena natalina canelada dourada em cenário de Natal','Rena natalina canelada branca em decoração de Natal','Rena natalina canelada vermelha em decoração de Natal','Rena natalina canelada verde-oliva em decoração de Natal'], images:['assets/photos/products/rena-natalina/rena-natalina-canelada-grupo-decoracao-natal.webp','assets/photos/products/rena-natalina/rena-natalina-dourada-decoracao-natal.webp','assets/photos/products/rena-natalina/rena-natalina-branca-decoracao-natal.webp','assets/photos/products/rena-natalina/rena-natalina-vermelha-decoracao-natal.webp','assets/photos/products/rena-natalina/rena-natalina-verde-oliva-decoracao-natal.webp'], dimensions:null, variantOptions:[{value:'135mm',label:'13,5 cm — pequena',price:20},{value:'175mm',label:'17,5 cm — grande',price:30},{value:'kit-135-175',label:'Kit: 1 grande + 1 pequena',price:45}], colors:['Vermelho','Dourado','Branco','Verde oliva'],  demonstrative:false, cardNote:'Tamanhos disponíveis apenas: 13,5 cm, 17,5 cm ou kit com uma rena grande e uma pequena.', featured:9 },
  { id:'letreiro-feliz-natal-floco-neve', name:'Letreiro Feliz Natal com Floco de Neve – 14 cm', category:'Natal', categories:['Natal'], price:27.00, description:'Letreiro Feliz Natal em impressão 3D com delicado detalhe de floco de neve. Altura aprox. 14 cm e largura aprox. 13 cm.', fullDescription:'Deixe sua decoração natalina ainda mais especial com este letreiro decorativo Feliz Natal, produzido em impressão 3D e com delicado detalhe de floco de neve. Com design moderno e minimalista, é ideal para decorar mesas, estantes, aparadores, prateleiras, escritórios e vitrines, trazendo um toque festivo e acolhedor ao ambiente.', detailContent:{paragraphs:['Deixe sua decoração natalina ainda mais especial com este letreiro decorativo Feliz Natal, produzido em impressão 3D e com delicado detalhe de floco de neve.','Com design moderno e minimalista, é ideal para decorar mesas, estantes, aparadores, prateleiras, escritórios e vitrines, trazendo um toque festivo e acolhedor ao ambiente.'],features:['Produzido por impressão 3D.','Design Feliz Natal com detalhe de floco de neve.','Peça leve e resistente.','Ideal para decoração de mesa e ambientes natalinos.'],sections:[{title:'Dimensões aproximadas',items:['Altura: 14 cm.','Largura: 13 cm.']}]}, image:'assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-vermelho-frontal.webp', imageAlt:'Letreiro Feliz Natal vermelho com floco de neve, decoração impressa em 3D', imageAlts:['Letreiro Feliz Natal vermelho com floco de neve','Letreiro Feliz Natal vermelho em aparador decorado para o Natal','Letreiro Feliz Natal em outra cor, foto ilustrativa da peça','Letreiro Feliz Natal em outra cor, foto ilustrativa da peça','Letreiro Feliz Natal com indicação visual das medidas aproximadas'], images:['assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-vermelho-frontal.webp','assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-vermelho-aparador.webp','assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-verde.webp','assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-dourado.webp','assets/photos/products/letreiro-feliz-natal-floco-neve/letreiro-feliz-natal-floco-neve-medidas.webp'], dimensions:null, hideVersionSelector:true, colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'], colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],  demonstrative:false, featured:10 },
  { id:'arvore-natal-decorativa-3d-canelada', name:'Árvore de Natal Espiral Decorativa – 12,8 cm', cardTitleSingleLine:true, category:'Natal', categories:['Natal'], price:30.00, description:'Árvore de Natal espiral produzida em impressão 3D, com design minimalista. Altura aproximada de 12,8 cm sem estrela.', fullDescription:'Adicione um toque moderno e elegante à sua decoração natalina com esta árvore de Natal espiral, produzida em impressão 3D. Seu design minimalista com formato espiral cria um efeito visual delicado, ideal para decorar mesas, estantes, aparadores e outros ambientes. Produzida por impressão 3D, tem design moderno, é leve e decorativa, ideal para decoração natalina e presentes criativos. Altura aproximada de 12,8 cm sem estrela. Por ser produzida em impressão 3D, pode apresentar pequenas marcas características do processo de fabricação, sem comprometer a qualidade ou utilização da peça.', detailContent:{paragraphs:['Adicione um toque moderno e elegante à sua decoração natalina com esta árvore de Natal espiral, produzida em impressão 3D.','Seu design minimalista com formato espiral cria um efeito visual delicado, ideal para decorar mesas, estantes, aparadores e outros ambientes.'],features:['Produzida por impressão 3D.','Design moderno com formato espiral.','Peça leve e decorativa.','Ideal para decoração natalina e presentes criativos.'],sections:[{title:'Dimensões',items:['Altura: aproximadamente 12,8 cm sem estrela.']}],note:'Por ser produzida em impressão 3D, pode apresentar pequenas marcas características do processo de fabricação, sem comprometer a qualidade ou utilização da peça.'}, image:'assets/photos/products/arvore-natal-decorativa-3d-canelada/arvore-natal-canelada-vermelha-estrela-dourada.webp', imageAlt:'Árvore de Natal canelada vermelha impressa em 3D com estrela dourada', imageAlts:['Árvore de Natal canelada vermelha com estrela dourada','Árvore de Natal canelada verde-oliva com estrela dourada','Árvore de Natal canelada branca com estrela dourada','Árvore de Natal canelada cor areia com estrela dourada'], images:['assets/photos/products/arvore-natal-decorativa-3d-canelada/arvore-natal-canelada-vermelha-estrela-dourada.webp','assets/photos/products/arvore-natal-decorativa-3d-canelada/arvore-natal-canelada-verde-oliva-estrela-dourada.webp','assets/photos/products/arvore-natal-decorativa-3d-canelada/arvore-natal-canelada-branca-estrela-dourada.webp','assets/photos/products/arvore-natal-decorativa-3d-canelada/arvore-natal-canelada-areia-estrela-dourada.webp'], dimensions:null, hideVersionSelector:true, colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'], colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],  demonstrative:false, featured:11 }
  ,{
    id:'mini-jesus-sentado', name:'Mini Jesus Cristo para Monitor – 3,7 cm', whatsappName:'Mini Jesus Cristo para Monitor', category:'Religião', categories:['Religião'], price:25.00, cardPrice:25.00,
    description:'Leve um toque de fé e inspiração para sua rotina com esta delicada miniatura de Jesus Cristo. Compacta, é ideal para monitores, escrivaninhas e espaços de trabalho ou estudo.',
    fullDescription:'Leve um toque de fé e inspiração para sua rotina com esta delicada miniatura de Jesus Cristo. Com tamanho compacto, é ideal para decorar monitores, escrivaninhas e espaços de trabalho ou estudo. Produzido em impressão 3D com PLA, tem acabamento colorido com opção de personalização, altura aproximada de 3,7 cm e largura aproximada de 1,64 cm. Também disponível totalmente branco, sem pintura, para personalizar em casa, ou em outros tamanhos sob encomenda. Se desejar uma opção diferente, informe o tamanho ou acabamento desejado na caixa de observações abaixo.',
    detailContent:{
      paragraphs:['Leve um toque de fé e inspiração para sua rotina com esta delicada miniatura de Jesus Cristo.','Com tamanho compacto, é ideal para decorar monitores, escrivaninhas e espaços de trabalho ou estudo.'],
      features:['Produzido em impressão 3D com PLA.','Acabamento colorido, com opção de personalização.','Altura aproximada: 3,7 cm.','Largura aproximada: 1,64 cm.'],
      sections:[{title:'Personalização',items:['Também disponível totalmente branco, sem pintura, para personalizar em casa, ou em outros tamanhos sob encomenda.']}],
      note:'Se desejar uma opção diferente, informe o tamanho ou acabamento desejado na caixa de observações abaixo.'
    },
    image:'assets/photos/products/jesus/mini-jesus-sentado-faixa-vermelha-decoracao-religiosa.webp', imageAlt:'Mini Jesus sentado com o manto vermelho, peça religiosa impressa em 3D',
    imageAlts:['Mini Jesus sentado com o manto vermelho em cenário de decoração','Mini Jesus sentado branco sem pintura sobre uma tela','Mini Jesus sentado branco sem pintura em uma impressora 3D'],
    images:['assets/photos/products/jesus/mini-jesus-sentado-faixa-vermelha-decoracao-religiosa.webp','assets/photos/products/jesus/mini-jesus-sentado-sem-pintura-impressao-3d.webp','assets/photos/products/jesus/mini-jesus-sentado-branco-impressao-3d.webp'],
    material:'Material de impressão 3D', demonstrative:false,
    hideVersionSelector:true, colorFieldLabel:'Cor do manto', colorOptions:['Verde-oliva','Preto','Vermelho','Marrom','Areia'], colors:['Verde-oliva','Preto','Vermelho','Marrom','Areia'],
    featured:12
  },
  {
    id:'mini-jesus-no-trono',
    name:'Mini Jesus no Trono – Decoração Religiosa 3D',
    category:'Religião', categories:['Religião'],
    price:35.00, cardPrice:35.00,
    description:'Mini Jesus colorido com trono incluído, uma peça delicada para decorar cantinhos de oração e outros ambientes.',
    fullDescription:'Uma miniatura delicada e cheia de significado, ideal para decorar cantinhos de oração, aparadores, estantes e escritórios. O Mini Jesus possui detalhes coloridos, com túnica branca, faixa vermelha e um trono que acompanha a peça.',
    detailContent:{
      paragraphs:['Uma miniatura delicada e cheia de significado, ideal para decorar cantinhos de oração, aparadores, estantes e escritórios.','O Mini Jesus possui detalhes coloridos, com túnica branca, faixa vermelha e um trono que acompanha a peça.'],
      features:['Produzido em impressão 3D com PLA.','Mini Jesus colorido.','Acompanha trono e cadeira.','Peça decorativa com detalhes delicados.'],
      sections:[
        {title:'Dimensões aproximadas',items:['Altura: 4,7 cm.','Largura: 3 cm.']},
        {title:'O que acompanha',items:['1 Mini Jesus sentado.','1 trono na cor escolhida.']}
      ],
      note:'Produto vendido em conjunto, incluindo o Mini Jesus e o trono. Outras cores de cadeira podem ser solicitadas na caixa de observações.\n\nPor ser produzido em impressão 3D, pode apresentar pequenas marcas naturais do processo de fabricação, sem comprometer sua qualidade ou utilização.'
    },
    image:'assets/photos/products/mini-jesus-cadeira-reta/1-mini-jesus-no-trono-decoracao-religiosa-impressao-3d.webp',
    imageAlt:'Mini Jesus sentado em trono marrom, peça decorativa impressa em 3D',
    imageAlts:[
      'Mini Jesus sentado em cadeira reta marrom',
      'Mini Jesus e cadeira apresentados como conjunto de duas peças',
      'Mini Jesus no trono em ambiente de oração',
      'Dimensões e detalhes do Mini Jesus no trono'
    ],
    images:[
      'assets/photos/products/mini-jesus-cadeira-reta/1-mini-jesus-no-trono-decoracao-religiosa-impressao-3d.webp',
      'assets/photos/products/mini-jesus-cadeira-reta/2-mini-jesus-trono-cadeira-conjunto-duas-pecas.webp',
      'assets/photos/products/mini-jesus-cadeira-reta/3-mini-jesus-no-trono-decoracao-religiosa.webp',
      'assets/photos/products/mini-jesus-cadeira-reta/4-mini-jesus-no-trono-dimensoes-altura-largura.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false, hidePrintFinishNote:true,
    cardTitleSingleLine:true,
    colorChoices:[
      {key:'chairColor',label:'Cor da cadeira',partLabel:'altera somente o trono',options:['Marrom','Bege','Preto','Branco']},
      {key:'mantleColor',label:'Cor do manto',partLabel:'altera somente o manto do Mini Jesus',options:['Vermelho','Verde-oliva','Preto','Marrom','Areia']}
    ],
    featured:13
  },
  {
    id:'rena-natal-geometrica-20cm',
    name:'Rena de Natal Geométrica – 20 cm',
    category:'Natal', categories:['Natal'],
    price:60.00,
    description:'Rena geométrica facetada produzida em impressão 3D. Opções individuais e kits a partir de R$ 60,00.',
    cardDescription:'Rena geométrica facetada com galhos imponentes para composições natalinas modernas.',
    fullDescription:'Adicione elegância à sua decoração natalina com esta rena geométrica produzida em impressão 3D. Seu design moderno e facetado, com galhos imponentes, traz personalidade e sofisticação para qualquer ambiente. Ideal para decorar mesas, estantes, aparadores e composições natalinas. Também é uma ótima opção para presentear.',
    detailContent:{
      paragraphs:['Adicione elegância à sua decoração natalina com esta rena geométrica produzida em impressão 3D. Seu design moderno e facetado, com galhos imponentes, traz personalidade e sofisticação para qualquer ambiente.','Ideal para decorar mesas, estantes, aparadores e composições natalinas. Também é uma ótima opção para presentear.'],
      features:['Produzida por impressão 3D.','Design geométrico com acabamento facetado.','Estilo moderno e minimalista.','Disponível em diferentes cores.','Ideal para decoração natalina e presentes criativos.'],
      sections:[{title:'Tamanhos das peças',items:['Rena individual: 20 cm de altura.','Kit com 2 renas: ambas com 20 cm de altura.','Kit misto: uma rena de 20 cm e uma rena de 10 cm.']}]
    },
    image:'assets/photos/products/Rena de Natal – Elegante Feriado Grande 20cm/rena-grande-e-peq-20 e 10cm.webp',
    imageAlt:'Rena geométrica de Natal em 20 cm e rena menor de 10 cm, impressas em 3D',
    images:['assets/photos/products/Rena de Natal – Elegante Feriado Grande 20cm/rena-grande-e-peq-20 e 10cm.webp'],
    dimensions:null,
    variantLabel:'Tamanho e quantidade',
    variantOptions:[
      {value:'rena-20',label:'1 rena de 20 cm — R$ 60,00',price:60},
      {value:'kit-2x20',label:'Kit com 2 renas de 20 cm — R$ 120,00',price:120},
      {value:'kit-20-10',label:'Kit com 1 rena de 20 cm + 1 rena de 10 cm — R$ 75,00',price:75}
    ],
    colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    demonstrative:false,
    featured:13
  },
  {
    id:'presepio-natal-sagrada-familia',
    name:'Presépio de Natal Decorativo – Sagrada Família 15 cm',
    category:'Natal', categories:['Natal'],
    price:42.00,
    cardTitleSingleLine:true,
    description:'Presépio natalino em impressão 3D com acabamento texturizado e representação da Sagrada Família, Reis Magos e animais.',
    fullDescription:'Celebre o verdadeiro significado do Natal com este presépio decorativo produzido em impressão 3D. Com acabamento texturizado e design delicado, representa o nascimento de Jesus com a Sagrada Família, os Reis Magos, animais e uma estrutura em arco com estrela no topo. Ideal para decorar mesas, aparadores, estantes e outros ambientes, trazendo um toque de fé e tradição à decoração natalina.',
    detailContent:{
      paragraphs:['Celebre o verdadeiro significado do Natal com este presépio decorativo produzido em impressão 3D.','Com acabamento texturizado e design delicado, representa o nascimento de Jesus com a Sagrada Família, os Reis Magos, animais e uma estrutura em arco com estrela no topo.','Ideal para decorar mesas, aparadores, estantes e outros ambientes, trazendo um toque de fé e tradição à decoração natalina.'],
      features:['Produzido em impressão 3D com PLA.','Design detalhado com acabamento texturizado.','Peça decorativa com representação do nascimento de Jesus.','Dimensões aproximadas do tamanho pequeno: 17 cm de largura e 15 cm de altura.'],
      sections:[{title:'Tamanhos disponíveis',items:['Pequeno: 15 cm.','Grande: 20 cm.']}],
      note:'Importante: Por ser produzido em impressão 3D, pode apresentar pequenas marcas características do processo de fabricação. Evite exposição a altas temperaturas.'
    },
    image:'assets/photos/products/presepio-de-natal/branco.webp',
    imageAlt:'Presépio de Natal decorativo branco com Sagrada Família, Reis Magos e animais',
    imageAlts:[
      'Presépio de Natal branco com a Sagrada Família, Reis Magos e animais',
      'Presépio de Natal verde-oliva com acabamento texturizado',
      'Presépio de Natal bege com estrela no topo do arco'
    ],
    images:[
      'assets/photos/products/presepio-de-natal/branco.webp',
      'assets/photos/products/presepio-de-natal/verde-oliva.webp',
      'assets/photos/products/presepio-de-natal/bege.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    variantLabel:'Tamanho', variantOptions:[
      {value:'pequeno',label:'Pequeno',price:42.00},
      {value:'grande',label:'Grande',price:80.00}
    ],
    colorOptions:['Branco','Verde-oliva','Bege','Areia'],
    hidePrintFinishNote:true,
    colors:['Branco','Verde-oliva','Bege','Areia'],
    featured:14
  },
  {
    id:'presepio-asa-anjo-iluminado-3d',
    name:'Presépio Asa Anjo Iluminado 3D - 10cm',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:45.00,
    description:'Presépio decorativo com asas abertas envolvendo a cena do nascimento de Jesus, produzido em impressão 3D e compatível com iluminação LED.',
    cardDescription:'Presépio com asas angelicais e espaço para iluminação.',
    fullDescription:'Presépio decorativo com asas abertas envolvendo a cena do nascimento de Jesus. Produzido em impressão 3D, possui detalhes em relevo e espaço para iluminação, criando um ambiente acolhedor e especial. Ideal para decorar mesas, aparadores, cantinhos de oração e outros ambientes.',
    detailContent:{
      paragraphs:[
        'Presépio decorativo com asas abertas envolvendo a cena do nascimento de Jesus. Produzido em impressão 3D, possui detalhes em relevo e espaço para iluminação, criando um ambiente acolhedor e especial.',
        'Ideal para decorar mesas, aparadores, cantinhos de oração e outros ambientes.'
      ],
      features:[
        'Material: PLA.',
        'Fabricação por impressão 3D.',
        'Iluminação compatível com LED MH001 e vela Tea Light.'
      ],
      sections:[
        {title:'Dimensões aproximadas',items:['Altura: 10 cm.','Largura: 10 cm.','Profundidade: 8,5 cm.','Peso: aproximadamente 82 g.']},
        {title:'Informações importantes',items:['A vela e o LED não acompanham o produto.','Produto destinado à decoração.','Pequenas variações de acabamento são características da impressão 3D.']}
      ],
      note:'Não encontrou a cor desejada? Informe sua preferência no campo de observações para consultar a disponibilidade.'
    },
    image:'assets/photos/products/presepio-iluminado/presepio-asa-anjo-iluminado-natal-3d-branco.webp',
    imageAlt:'Presépio branco com asas de anjo iluminado em decoração de Natal',
    imageAlts:[
      'Presépio branco com asas de anjo iluminado em decoração de Natal',
      'Presépio Asa Anjo iluminado com LED e vela Tea Light sobre uma mesa'
    ],
    images:[
      'assets/photos/products/presepio-iluminado/presepio-asa-anjo-iluminado-natal-3d-branco.webp',
      'assets/photos/products/presepio-iluminado/presepio-asa-anjo-iluminado-3d-com-led-tea-light.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    colorChoices:[
      {key:'nativityColor',label:'Cor do presépio',partLabel:'presépio',options:['Branco','Areia','Verde-oliva']}
    ],
    hidePrintFinishNote:true,
    featured:25
  },
  {
    id:'centro-mesa-chapeu-papai-noel-16cm',
    name:'Centro de Mesa Chapéu de Papai Noel – 16 cm',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:80.00,
    description:'Centro de mesa natalino em formato de chapéu de Papai Noel, com espaço interno para pequenos objetos e lembrancinhas.',
    fullDescription:'Deixe sua decoração natalina ainda mais especial com este centro de mesa em formato de chapéu de Papai Noel. Produzido em impressão 3D, combina as cores tradicionais vermelho e branco com um design criativo e delicado. Além de decorar, possui espaço interno que pode ser utilizado para guardar pequenos objetos e lembrancinhas.',
    detailContent:{
      paragraphs:['Deixe sua decoração natalina ainda mais especial com este centro de mesa em formato de chapéu de Papai Noel. Produzido em impressão 3D, combina as cores tradicionais vermelho e branco com um design criativo e delicado.','Além de decorar, possui espaço interno que pode ser utilizado para guardar pequenos objetos e lembrancinhas.'],
      features:['Produzido em PLA por impressão 3D.','Cores vermelho e branco.','Altura aproximada de 16 cm.','Possui espaço interno para pequenos objetos.','Acompanha 1 unidade.'],
      note:'Importante: Produto fabricado por impressão 3D, podendo apresentar pequenas marcas naturais do processo. Não é indicado para contato direto com alimentos. Evite exposição ao sol intenso e a temperaturas elevadas.'
    },
    image:'assets/photos/products/Chapéu de Natal Tigela & Decoração/br-11134207-820m3-muu1cpgb60oy16@resize_w450_nl.webp',
    imageAlt:'Centro de mesa em formato de chapéu de Papai Noel vermelho e branco com espaço interno',
    images:['assets/photos/products/Chapéu de Natal Tigela & Decoração/br-11134207-820m3-muu1cpgb60oy16@resize_w450_nl.webp'],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, hideOrderSelectors:true, hidePrintFinishNote:true,
    colors:['Vermelho','Branco'],
    featured:15
  },
  {
    id:'kit-presepio-sagrada-familia-arvore-bandeja',
    name:'Kit Presépio Sagrada Família, Árvore de Natal e Bandeja Decorativa',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:33.00,
    description:'Peças natalinas minimalistas em impressão 3D, disponíveis avulsas ou em kit completo, a partir de R$ 33,00.',
    cardDescription:'Peças natalinas minimalistas para compor mesas, aparadores e cantinhos especiais.',
    fullDescription:'Encante sua decoração natalina com este conjunto de peças decorativas com design minimalista e moderno. Ideal para mesas, aparadores, estantes, altares e cantinhos de oração, trazendo delicadeza e significado ao ambiente. O conjunto é composto por escultura da Sagrada Família de 10 cm, pinheiro decorativo de 13 cm e bandeja decorativa de 20 cm. Produzidas em impressão 3D, as peças possuem visual delicado e versátil, combinando com diferentes estilos de decoração. Também são uma ótima opção de presente religioso.',
    detailContent:{
      paragraphs:['Encante sua decoração natalina com este conjunto de peças decorativas com design minimalista e moderno. Ideal para mesas, aparadores, estantes, altares e cantinhos de oração, trazendo delicadeza e significado ao ambiente.','Produzidas em impressão 3D, as peças possuem visual delicado e versátil, combinando com diferentes estilos de decoração. Também são uma ótima opção de presente religioso.'],
      features:['Produzido em impressão 3D com PLA.'],
      sections:[
        {title:'Peças do conjunto',items:['Escultura da Sagrada Família: 10 cm.','Pinheiro decorativo: 13 cm.','Bandeja decorativa: 20 cm.']}
      ]
    },
    image:'assets/photos/products/sagrada-familia/1-kit-presepio-sagrada-familia-arvore-natal-bandeja-decorativa.webp',
    imageAlt:'Kit decorativo de Natal com Sagrada Família, pinheiro e bandeja',
    imageAlts:[
      'Kit completo com escultura da Sagrada Família, pinheiro e bandeja decorativa',
      'Escultura da Sagrada Família, pinheiro verde e bandeja em impressão 3D',
      'Conjunto natalino com pinheiro, bandeja e Sagrada Família em cenário decorativo'
    ],
    images:[
      'assets/photos/products/sagrada-familia/1-kit-presepio-sagrada-familia-arvore-natal-bandeja-decorativa.webp',
      'assets/photos/products/sagrada-familia/2-escultura-sagrada-familia-pinheiro-bandeja-impressao-3d.webp',
      'assets/photos/products/sagrada-familia/3-kit-sagrada-familia-arvore-bandeja-natal-impressao-3d.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    variantLabel:'Escolha sua opção', hideVariantColorSelector:true,
    variantOptions:[
      {value:'pinheiro',label:'Pinheiro',price:38.00},
      {value:'bandeja',label:'Bandeja',price:38.00},
      {value:'escultura-sagrada-familia',label:'Escultura Sagrada Família',price:33.00},
      {value:'kit-completo',label:'Kit completo',price:80.00}
    ],
    featured:16
  },
  {
    id:'soldadinho-quebra-nozes-natalino-3d-20-cm',
    name:'Soldadinho Quebra-Nozes Natalino 3D – 20 cm',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:35.00, cardPrice:35.00,
    description:'Soldadinho Quebra-Nozes em impressão 3D, com opções de tamanho, acabamento e cor. A partir de R$ 35,00.',
    cardDescription:'Soldadinho Quebra-Nozes com acabamento à escolha e cores personalizáveis.',
    fullDescription:'Deixe sua decoração de Natal mais charmosa com este soldadinho Quebra-Nozes de design clássico e delicado. Produzido em impressão 3D, é ideal para decorar aparadores, mesas, estantes e outros ambientes natalinos. Disponível em diferentes cores, tamanhos e acabamentos, permitindo personalizar a peça conforme sua preferência.',
    detailContent:{
      paragraphs:[
        'Deixe sua decoração de Natal mais charmosa com este soldadinho Quebra-Nozes de design clássico e delicado. Produzido em impressão 3D, é ideal para decorar aparadores, mesas, estantes e outros ambientes natalinos.',
        'Disponível em diferentes cores, tamanhos e acabamentos, permitindo personalizar a peça conforme sua preferência.'
      ],
      features:[
        'Produzido em PLA por impressão 3D.',
        'Disponível nos acabamentos canelado e texturizado.',
        'Opções de cores personalizáveis.',
        'Ideal para decoração natalina e para presentear.'
      ],
      sections:[{title:'Tamanhos e valores',items:['16 cm: R$ 35,00.','22 cm: R$ 40,00.']}],
      note:'Também podemos produzir em outros tamanhos, como 11 cm, 14 cm e 17 cm. Caso deseje alguma dessas medidas ou um kit com mais de uma peça, informe sua preferência no campo de observações para consultar disponibilidade e valores.'
    },
    image:'assets/photos/products/decoracao-quebra-nozes/soldadinho-quebra-nozes-natalino-impressao-3d-vista-principal.webp',
    imageAlt:'Soldadinho Quebra-Nozes natalino produzido em impressão 3D',
    imageAlts:[
      'Soldadinho Quebra-Nozes natalino em impressão 3D, vista principal',
      'Soldadinho Quebra-Nozes natalino em impressão 3D, segunda vista',
      'Soldadinho Quebra-Nozes natalino em impressão 3D, terceira vista',
      'Soldadinho Quebra-Nozes natalino em impressão 3D, quarta vista'
    ],
    images:[
      'assets/photos/products/decoracao-quebra-nozes/soldadinho-quebra-nozes-natalino-impressao-3d-vista-principal.webp',
      'assets/photos/products/decoracao-quebra-nozes/soldadinho-quebra-nozes-natalino-impressao-3d-segunda-vista.webp',
      'assets/photos/products/decoracao-quebra-nozes/soldadinho-quebra-nozes-natalino-impressao-3d-terceira-vista.webp',
      'assets/photos/products/decoracao-quebra-nozes/soldadinho-quebra-nozes-natalino-impressao-3d-quarta-vista.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    orderOptions:{
      sizeOptions:['16 cm','22 cm'],
      sizePrices:{'16 cm':35.00,'22 cm':40.00},
      finishes:[
        {value:'canelado',label:'Canelado'},
        {value:'texturizado',label:'Texturizado'}
      ],
      colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],
      colorFieldLabel:'Cor',
      alwaysShowColor:true
    },
    featured:17
  },
  {
    id:'bandeja-decorativa-ore-e-confie-22-cm',
    name:'Bandeja Decorativa Ore e Confie – 22 cm',
    cardTitleSingleLine:true,
    category:'Bandejas', categories:['Bandejas'],
    price:40.00, cardPrice:40.00,
    description:'Bandeja decorativa canelada em impressão 3D, com 22 cm e cores personalizáveis. R$ 40,00.',
    cardDescription:'Bandeja canelada com cores independentes para a peça, as letras e os pezinhos.',
    fullDescription:'Leve delicadeza e significado para sua decoração com a Bandeja Decorativa Ore e Confie. Com design moderno e acabamento canelado, é uma peça versátil que combina decoração e funcionalidade. Ideal para organizar pequenos objetos e compor mesas, aparadores, estantes e cantinhos especiais da casa.',
    detailContent:{
      paragraphs:[
        'Leve delicadeza e significado para sua decoração com a Bandeja Decorativa Ore e Confie. Com design moderno e acabamento canelado, é uma peça versátil que combina decoração e funcionalidade.',
        'Ideal para organizar pequenos objetos e compor mesas, aparadores, estantes e cantinhos especiais da casa.'
      ],
      features:[
        'Produzida em impressão 3D.',
        'Design com acabamento canelado.',
        'Personalização de cores.',
        'Ideal para decoração e organização de pequenos objetos.'
      ],
      sections:[{title:'Dimensões aproximadas',items:['Comprimento: 22 cm.','Largura: 22,11 cm.','Altura: 2 cm.']}],
      note:'Não encontrou a cor desejada? Informe no campo de observações qual cor gostaria de encomendar. Vamos consultar a disponibilidade.'
    },
    image:'assets/photos/products/bandeja-ore-e-confie/Bandeja Ore e Confie com Essenciais.png',
    imageAlt:'Bandeja decorativa Ore e Confie canelada com pezinhos',
    imageAlts:[
      'Bandeja decorativa Ore e Confie canelada com pezinhos em ambiente de casa',
      'Bandeja Ore e Confie branca vista de cima',
      'Bandeja Ore e Confie canelada vista de lado'
    ],
    images:[
      'assets/photos/products/bandeja-ore-e-confie/Bandeja Ore e Confie com Essenciais.png',
      'assets/photos/products/bandeja-ore-e-confie/2.webp',
      'assets/photos/products/bandeja-ore-e-confie/3.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    colorChoices:[
      {key:'trayColor',label:'Cor da bandeja',partLabel:'bandeja',options:['Preto','Branco','Areia','Verde oliva','Vermelho']},
      {key:'letterColor',label:'Cor da letra',partLabel:'letra',options:['Preto','Branco','Areia','Verde oliva','Vermelho']},
      {key:'feetColor',label:'Cor dos pezinhos',partLabel:'pezinhos',options:['Preto','Branco','Areia','Verde oliva','Vermelho']}
    ],
    hidePrintFinishNote:true,
    featured:18
  },
  {
    id:'tigela-arvore-de-natal-decorativa-3d-17-cm',
    name:'Tigela Árvore de Natal Decorativa 3D – 17 cm',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:20.00, cardPrice:20.00,
    description:'Tigela empilhável em formato de árvore de Natal, vendida por unidade. R$ 20,00 cada.',
    cardDescription:'Tigela empilhável em formato de árvore de Natal, vendida por unidade.',
    fullDescription:'Deixe sua decoração natalina ainda mais especial com esta tigela em formato de árvore de Natal. Produzida em impressão 3D, possui design criativo e empilhável, sendo ideal para decorar mesas, organizar pequenas lembrancinhas e apresentar doces embalados.',
    detailContent:{
      paragraphs:[
        'Deixe sua decoração natalina ainda mais especial com esta tigela em formato de árvore de Natal. Produzida em impressão 3D, possui design criativo e empilhável, sendo ideal para decorar mesas, organizar pequenas lembrancinhas e apresentar doces embalados.'
      ],
      features:[
        'Produzida em impressão 3D.',
        'Formato de árvore de Natal.',
        'Design empilhável.',
        'Venda por unidade.',
        'Cor personalizável.'
      ],
      sections:[{title:'Dimensões aproximadas',items:['Comprimento: 17 cm.','Largura: 17,56 cm.','Altura: 2,88 cm.']}],
      note:'Não indicado para contato direto com alimentos sem embalagem. Por ser produzido em impressão 3D, pode apresentar pequenas marcas naturais do processo de fabricação. Evite exposição a temperaturas elevadas. Não encontrou a cor desejada? Informe no campo de observações para consultar a disponibilidade.'
    },
    image:'assets/photos/products/tigela-arvore-natal/tigela-arvore-natal-vermelha-doces-embalados.webp',
    imageAlt:'Tigela individual em formato de árvore de Natal com doces embalados',
    imageAlts:[
      'Tigela individual em formato de árvore de Natal com doces embalados',
      'Tigelas natalinas em formato de árvore com doces embalados',
      'Tigelas de árvore de Natal com lembrancinhas embaladas em uma composição festiva',
      'Tigelas em formato de árvore de Natal em composição de mesa',
      'Tigelas natalinas empilhadas com detalhes do acabamento de impressão 3D'
    ],
    images:[
      'assets/photos/products/tigela-arvore-natal/tigela-arvore-natal-vermelha-doces-embalados.webp',
      'assets/photos/products/tigela-arvore-natal/tigelas-arvore-natal-sortidas-doces-embalados.webp',
      'assets/photos/products/tigela-arvore-natal/tigelas-arvore-natal-empilhaveis-decoracao.webp',
      'assets/photos/products/tigela-arvore-natal/tigelas-arvore-natal-lembrancinhas.webp',
      'assets/photos/products/tigela-arvore-natal/tigelas-arvore-natal-empilhadas-detalhes-impressao-3d.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, colorFieldLabel:'Cor',
    colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    hidePrintFinishNote:true,
    featured:19
  },
  {
    id:'cesto-noel-encantado-porta-panetone-3d',
    name:'Cesto Noel Encantado – Porta-Panetone 3D',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:95.00,
    description:'Cesto natalino texturizado para presentear com panetone e reutilizar na decoração. R$ 95,00.',
    cardDescription:'Cesto natalino texturizado para presentear com panetone e reutilizar na decoração.',
    fullDescription:'Transforme um simples panetone em um presente de Natal especial com o Cesto Noel Encantado. Produzido em impressão 3D, possui design inspirado na roupa do Papai Noel, com detalhes em vermelho, branco, preto e fivela dourada. Ideal para acomodar panetones, montar kits natalinos e criar presentes personalizados. Após o Natal, também pode ser reutilizado como recipiente decorativo ou porta-objetos.',
    detailContent:{
      paragraphs:[
        'Transforme um simples panetone em um presente de Natal especial com o Cesto Noel Encantado. Produzido em impressão 3D, possui design inspirado na roupa do Papai Noel, com detalhes em vermelho, branco, preto e fivela dourada.',
        'Ideal para acomodar panetones, montar kits natalinos e criar presentes personalizados. Após o Natal, também pode ser reutilizado como recipiente decorativo ou porta-objetos.'
      ],
      features:[
        'Produzido em impressão 3D.',
        'Acabamento texturizado e detalhes natalinos.',
        'Espaço interno para panetones de até aproximadamente 13,5 cm de diâmetro.',
        'Reutilizável em outras ocasiões.'
      ],
      sections:[
        {title:'Dimensões aproximadas',items:['Largura: 17,5 cm.','Profundidade: 17,5 cm.','Altura: 13 cm.']},
        {title:'Conteúdo',items:['1 cesto decorativo.']}
      ],
      note:'Panetone, chocotone, laços, doces e demais itens decorativos não acompanham o produto. As medidas são aproximadas e podem apresentar pequenas variações.'
    },
    image:'assets/photos/products/cesto-panetone/1.webp',
    imageAlt:'Cesto Noel Encantado vermelho e branco com fivela dourada e panetone',
    imageAlts:[
      'Cesto Noel Encantado vermelho e branco com fivela dourada e panetone',
      'Cesto porta-panetone natalino sem conteúdo, com acabamento texturizado'
    ],
    images:[
      'assets/photos/products/cesto-panetone/1.webp',
      'assets/photos/products/cesto-panetone/2.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, hideOrderSelectors:true, hidePrintFinishNote:true,
    featured:20
  },
  {
    id:'rena-puxando-treno-natalino-3d-18cm',
    name:'Rena Puxando Trenó Natalino 3D – 18 cm',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:35.00,
    description:'Rena decorativa puxando um trenó organizador, produzido em impressão 3D.',
    cardDescription:'Rena natalina com trenó organizador para pequenos objetos.',
    fullDescription:'Uma peça decorativa natalina criativa e cheia de personalidade! A rena puxando o trenó traz um toque especial à decoração de mesas, aparadores, estantes e outros ambientes. O trenó também pode ser utilizado para acomodar pequenos objetos decorativos e itens leves.',
    detailContent:{
      paragraphs:[
        'Uma peça decorativa natalina criativa e cheia de personalidade! A rena puxando o trenó traz um toque especial à decoração de mesas, aparadores, estantes e outros ambientes.',
        'O trenó também pode ser utilizado para acomodar pequenos objetos decorativos e itens leves.'
      ],
      features:[
        'Fabricação por impressão 3D.',
        'Material: PLA.',
        'Produto destinado à decoração.'
      ],
      sections:[
        {title:'O que acompanha',items:['1 rena decorativa.','1 trenó organizador.']},
        {title:'Dimensões aproximadas',items:['Comprimento: 18,12 cm.','Largura: 7,51 cm.','Altura: 12,49 cm.']}
      ],
      note:'Os objetos decorativos das fotos não acompanham o produto. Pequenas variações de acabamento são características da impressão 3D.'
    },
    image:'assets/photos/products/rena-treno/rena-puxando-treno-decoracao-natalina-18cm-01.webp',
    imageAlt:'Rena branca puxando trenó decorativo com doces em composição de Natal',
    imageAlts:[
      'Rena branca puxando trenó decorativo em composição natalina',
      'Rena dourada puxando trenó decorativo para o Natal',
      'Rena verde puxando trenó organizador decorativo'
    ],
    images:[
      'assets/photos/products/rena-treno/rena-puxando-treno-decoracao-natalina-18cm-01.webp',
      'assets/photos/products/rena-treno/rena-puxando-treno-decoracao-natalina-18cm-02.webp',
      'assets/photos/products/rena-treno/rena-puxando-treno-decoracao-natalina-18cm-03.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, colorFieldLabel:'Cor',
    colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    colors:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    hidePrintFinishNote:true,
    featured:26
  },
  {
    id:'tigela-decorativa-papai-noel-3d',
    name:'Tigela Decorativa Papai Noel 3D',
    cardTitleSingleLine:true,
    category:'Natal', categories:['Natal'],
    price:28.00,
    description:'Tigela decorativa natalina com detalhes em relevo, que combina decoração e funcionalidade.',
    cardDescription:'Tigela natalina para decorar e acomodar doces embalados ou pequenos objetos.',
    fullDescription:'Deixe sua decoração natalina ainda mais encantadora com a Tigela Decorativa Papai Noel! Com design temático e detalhes em relevo, é uma peça criativa que combina decoração e funcionalidade. Ideal para compor a mesa de Natal, decorar aparadores e acomodar doces embalados, biscoitos e pequenos objetos.',
    detailContent:{
      paragraphs:[
        'Deixe sua decoração natalina ainda mais encantadora com a Tigela Decorativa Papai Noel! Com design temático e detalhes em relevo, é uma peça criativa que combina decoração e funcionalidade.',
        'Ideal para compor a mesa de Natal, decorar aparadores e acomodar doces embalados, biscoitos e pequenos objetos.'
      ],
      features:[
        'Material: PLA.',
        'Fabricação por impressão 3D.',
        'Conteúdo: 1 tigela decorativa.'
      ],
      sections:[
        {title:'Dimensões aproximadas',items:['Largura: 10,16 cm.','Profundidade: 10,16 cm.','Altura: 8,13 cm.']}
      ],
      note:'Doces e itens das fotos não acompanham o produto. Para contato com alimentos, utilize embalagens ou recipientes apropriados. Outros tamanhos podem ser solicitados; informe sua preferência nas observações para cotarmos.'
    },
    image:'assets/photos/products/tigela-papai-noel/tigela-decorativa-papai-noel-3d-natal-01.webp',
    imageAlt:'Tigela natalina decorativa do Papai Noel com relevo e doces embalados',
    imageAlts:[
      'Tigela decorativa Papai Noel 3D com doces embalados',
      'Tigela de Natal em formato de Papai Noel com panetone'
    ],
    images:[
      'assets/photos/products/tigela-papai-noel/tigela-decorativa-papai-noel-3d-natal-01.webp',
      'assets/photos/products/tigela-papai-noel/tigela-papai-noel-decorativa-3d-doces-02.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, hideOrderSelectors:true, hidePrintFinishNote:true,
    featured:27
  },
  {
    id:'placa-ele-vive-coroa-de-espinhos',
    name:'Placa Ele Vive com a Coroa de Espinhos',
    cardTitleSingleLine:true,
    category:'Religião', categories:['Religião'],
    price:40.00,
    description:'Placa decorativa “Ele Vive” com letras em relevo e coroa de espinhos. Cores personalizáveis.',
    fullDescription:'Peça decorativa produzida em impressão 3D, com a mensagem “Ele Vive”, letras em relevo e detalhes da coroa de espinhos. Ideal para decorar cantinhos de oração, estantes, aparadores e outros ambientes.',
    detailContent:{
      paragraphs:['Peça decorativa produzida em impressão 3D, com a mensagem “Ele Vive”, letras em relevo e detalhes da coroa de espinhos. Ideal para decorar cantinhos de oração, estantes, aparadores e outros ambientes.'],
      features:[
        'Material: PLA.',
        'Largura aproximada: 15 cm.',
        'Altura aproximada: 8 cm.',
        'Acabamento fosco.',
        'Peça decorativa com base estável.',
        'Conteúdo: 1 unidade.'
      ],
      note:'Deseja outra combinação de cores ou tamanho? Informe sua preferência no campo de observações.'
    },
    image:'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-decoracao-religiosa-01.webp',
    imageAlt:'Placa Ele Vive com coroa de espinhos em impressão 3D',
    imageAlts:[
      'Placa Ele Vive com coroa de espinhos e dimensão aproximada de 15 cm',
      'Detalhe das letras em relevo e da coroa de espinhos na placa Ele Vive',
      'Placa Ele Vive branca e marrom com base estável',
      'Placa Ele Vive em combinação azul e dourado',
      'Placa Ele Vive em cinco combinações de cores disponíveis'
    ],
    images:[
      'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-decoracao-religiosa-01.webp',
      'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-letras-em-relevo-02.webp',
      'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-base-estavel-03.webp',
      'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-azul-dourado-04.webp',
      'assets/photos/products/ele-vive/placa-ele-vive-coroa-espinhos-opcoes-de-cores-05.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, colorFieldLabel:'Cor',
    colorOptions:['Azul / Dourado','Verde / Bege','Preto / Branco','Marrom / Branco','Branco / Marrom'],
    hidePrintFinishNote:true,
    featured:21
  },
  {
    id:'kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja',
    name:'Kit Decoração Wabi-Sabi Japonês – Vaso, Porta-Velas e Bandeja',
    cardTitleSingleLine:true,
    category:'Casa e Decoração', categories:['Kits'],
    price:70.00,
    description:'Conjunto minimalista Wabi-Sabi com vaso, porta-velas e bandeja canelados.',
    cardDescription:'Conjunto canelado Wabi-Sabi com vaso, porta-velas e bandeja.',
    fullDescription:'Conjunto decorativo inspirado no estilo Wabi-Sabi japonês, com design minimalista e acabamento canelado. Uma combinação de formas e texturas que traz elegância e aconchego para salas, quartos, aparadores e mesas.',
    detailContent:{
      paragraphs:['Conjunto decorativo inspirado no estilo Wabi-Sabi japonês, com design minimalista e acabamento canelado. Uma combinação de formas e texturas que traz elegância e aconchego para salas, quartos, aparadores e mesas.'],
      features:[
        'Material: PLA.',
        'Fabricação por impressão 3D.',
        'Design moderno e minimalista.',
        'Acabamento canelado.',
        'Peças leves e decorativas.'
      ],
      sections:[
        {title:'O kit contém',items:['1 vaso decorativo canelado.','1 porta-velas canelado.','1 bandeja redonda decorativa.']},
        {title:'Dimensões das bandejas',items:['Bandeja grande redonda: diâmetro de 220 mm.','Bandeja pequena redonda: diâmetro de 178 mm.','Bandeja elíptica: 182 × 95 mm.']}
      ],
      note:'A vela e as flores secas não acompanham o produto. O porta-velas é indicado para velas LED com até 38 mm de diâmetro. Use o campo de observações para solicitar outras cores ou tamanhos.'
    },
    image:'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-01-bege.webp',
    imageAlt:'Kit Wabi-Sabi bege com vaso, porta-velas e bandeja redonda canelados',
    imageAlts:[
      'Kit Wabi-Sabi bege com vaso, porta-velas e bandeja redonda canelados',
      'Conjunto decorativo Wabi-Sabi bege em ambiente minimalista',
      'Kit Wabi-Sabi branco com vaso, porta-velas e bandeja canelados',
      'Porta-velas LED e vaso decorativo Wabi-Sabi em bandeja redonda',
      'Conjunto Wabi-Sabi bege com vaso, porta-velas e bandeja',
      'Conjunto Wabi-Sabi preto com vaso, porta-velas e bandeja redonda',
      'Kit Wabi-Sabi bege com bandeja oval, vaso e porta-velas canelado'
    ],
    images:[
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-01-bege.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-02-bege-minimalista.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-03-branco-canelado.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-04-vela-led-flores-secas.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-05-kit-bege.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-06-kit-preto.webp',
      'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-bandeja-oval-redonda-porta-velas-bege.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    hideVersionSelector:true, colorFieldLabel:'Cor',
    colorOptions:['Verde oliva','Branco','Preto','Cinza','Areia'],
    hidePrintFinishNote:true,
    featured:22
  },
  {
    id:'vaso-espiral-decorativo-3d',
    name:'Vaso Espiral Decorativo 3D – 15 cm',
    cardTitleSingleLine:true,
    category:'Casa e Decoração', categories:['Vasos decorativos'],
    price:30.00,
    description:'Vaso decorativo de 15 cm com design espiral, produzido em impressão 3D.',
    cardDescription:'Vaso espiral moderno para decorar salas, escritórios, estantes e mesas.',
    fullDescription:'Vaso decorativo com design espiral moderno, produzido em impressão 3D. Ideal para decorar salas, escritórios, estantes e mesas, combinando beleza e originalidade.',
    detailContent:{
      paragraphs:['Vaso decorativo com design espiral moderno, produzido em impressão 3D. Ideal para decorar salas, escritórios, estantes e mesas, combinando beleza e originalidade.'],
      features:[
        'Altura: 15 cm.',
        'Largura: 8 cm.',
        'Diâmetro da boca: 5 cm.',
        'Diâmetro da base: 8 cm.',
        'Capacidade aproximada: 500 ml.',
        'Material: PLA.',
        'Acabamento espiral.'
      ],
      sections:[
        {title:'Tamanho e valores',items:['Vaso de 15 cm: R$ 30,00.','Vaso de 18 cm: R$ 45,00.','Kit com 1 vaso de 15 cm e 1 vaso de 18 cm: R$ 70,00.']},
        {title:'Personalização',items:['O tamanho padrão é 15 cm. Escolha o tamanho ou kit e a cor nos seletores.']}
      ],
      note:'Indicado para decoração com flores, folhagens e plantas naturais ou artificiais. Produzido por impressão 3D; pequenas variações de acabamento são características do processo de fabricação.'
    },
    image:'assets/photos/products/vaso-espiral/vaso-espiral-decorativo-3d-15cm-01-ambiente-elegante.png',
    imageAlt:'Vasos espirais decorativos em ambiente elegante',
    imageAlts:[
      'Vasos espirais decorativos em ambiente elegante',
      'Vasos espirais decorativos pretos em tamanhos diferentes',
      'Vaso espiral decorativo branco de 15 cm produzido em impressão 3D'
    ],
    images:[
      'assets/photos/products/vaso-espiral/vaso-espiral-decorativo-3d-15cm-01-ambiente-elegante.png',
      'assets/photos/products/vaso-espiral/vasos-espirais-decorativos-3d-02-preto.webp',
      'assets/photos/products/vaso-espiral/vaso-espiral-decorativo-15cm-03-branco-impressao-3d.webp'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    variantLabel:'Tamanho',
    variantPriceBeforeColor:true,
    variantOptions:[
      {value:'vaso-15cm',label:'Vaso 15 cm',price:30.00},
      {value:'vaso-18cm',label:'Vaso 18 cm',price:45.00},
      {value:'kit-15cm-18cm',label:'1 vaso 15 cm + 1 vaso 18 cm',price:70.00}
    ],
    colorOptions:['Preto','Branco','Areia','Verde oliva','Vermelho'],
    hideVariantColorSelector:false, hideVersionSelector:true, hidePrintFinishNote:true,
    featured:23
  },
  {
    id:'kit-decorativo-japandi-coracao-vaso-bandeja-porta-vela',
    name:'Kit Decorativo Japandi – Vaso, Bandeja e Porta-Vela',
    cardTitleSingleLine:true,
    category:'Casa e Decoração', categories:['Kits'],
    price:90.00,
    description:'Kit Japandi minimalista com vaso, bandeja e porta-vela para decorar a casa.',
    cardDescription:'Composição Japandi de três peças para mesas, aparadores e estantes.',
    fullDescription:'Kit Decorativo Japandi, uma composição delicada e minimalista que combina três peças para trazer harmonia e aconchego ao ambiente. Ideal para decorar mesas, aparadores, estantes e cantinhos especiais da sua casa.',
    detailContent:{
      paragraphs:['Kit Decorativo Japandi, uma composição delicada e minimalista que combina três peças para trazer harmonia e aconchego ao ambiente.','Ideal para decorar mesas, aparadores, estantes e cantinhos especiais da sua casa.'],
      features:[
        'Material: PLA.',
        'Fabricação por impressão 3D.',
        'Estilo Japandi e acabamento minimalista.'
      ],
      sections:[
        {title:'O kit contém',items:['1 vaso decorativo.','1 bandeja.','1 porta-vela.']},
        {title:'Dimensões das peças',items:['Bandeja: 24,5 × 11,5 × 2 cm.','Vaso: 9,5 × 9,5 × 12 cm.','Porta-vela: 6,9 × 6,9 × 4,2 cm.']}
      ],
      note:'Kit produzido sob demanda e destinado à decoração. A vela e os itens decorativos das fotos não acompanham o produto. Pequenas variações de tonalidade e acabamento são características da impressão 3D.'
    },
    image:'assets/photos/products/kit-vaso-3peças/IMG_0558.PNG',
    imageAlt:'Kit decorativo Japandi em tons areia e verde oliva com vaso, bandeja e porta-vela',
    imageAlts:[
      'Kit decorativo Japandi em tons areia e verde oliva com vaso, bandeja e porta-vela',
      'Kit decorativo Japandi preto com vaso, bandeja e porta-vela'
    ],
    images:[
      'assets/photos/products/kit-vaso-3peças/IMG_0558.PNG',
      'assets/photos/products/kit-vaso-3peças/IMG_0560.PNG'
    ],
    dimensions:null, material:'PLA', demonstrative:false,
    colorChoices:[
      {key:'trayColor',label:'Cor da bandeja',partLabel:'bandeja',options:['Preto','Branco','Areia','Verde oliva','Vermelho']},
      {key:'vaseColor',label:'Cor do vaso',partLabel:'vaso',options:['Preto','Branco','Areia','Verde oliva','Vermelho']},
      {key:'candleHolderColor',label:'Cor do porta-vela',partLabel:'porta-vela',options:['Preto','Branco','Areia','Verde oliva','Vermelho']},
    ],
    hidePrintFinishNote:true,
    featured:24
  }
];

/*
 * Produtos ilustrativos para preencher as categorias ainda sem itens.
 * Nomes, descrições, medidas, opções e valores abaixo são demonstrativos;
 * confirme ou substitua por dados comerciais antes de divulgar como oferta.
 * Cada produto continua sendo cadastrado uma só vez e usa a foto da categoria.
 */
const CUBIC_DEMO_CATEGORY_PRODUCTS = {
  // Exemplos de categorias pausadas permanecem comentados para uso futuro.
  natal: [],
  //  'ano-novo': [['Topo decorativo de Ano-Novo','Peça temática para decorar mesas e ambientes na virada do ano.'],['Marcador de taça festivo','Identificador decorativo para taças em encontros e celebrações.']],
  //  pascoa: [['Enfeite de Páscoa','Peça temática para decorar mesas, cestas e ambientes.'],['Suporte para doces de Páscoa','Base demonstrativa para organizar pequenos doces e lembranças.']],
  //  'dia-das-maes': [['Vaso decorativo para presente','Peça demonstrativa para compor um presente especial.'],['Porta-retrato afetivo','Moldura decorativa de mesa para guardar uma lembrança.']],
  //  'dia-dos-pais': [['Suporte de mesa personalizado','Acessório demonstrativo para organizar pequenos objetos.'],['Chaveiro com inicial','Lembrança personalizável com letra ou símbolo sujeito à avaliação.']],
  //  'dia-dos-namorados': [['Porta-recado com coração','Peça decorativa para bilhetes e mensagens especiais.'],['Enfeite de mesa romântico','Objeto temático para compor uma decoração a dois.']],
  //  'dia-dos-professores': [['Organizador de material escolar','Peça demonstrativa para separar canetas e itens pequenos.'],['Porta-recados para mesa','Acessório de mesa para lembretes ou mensagens.']],
  //  'dia-do-trabalhador': [['Organizador de ferramentas pequenas','Peça demonstrativa para separar acessórios de trabalho.'],['Suporte de identificação','Base para exibir etiquetas ou identificação, sujeita à avaliação.']],
  //  'dia-das-criancas': [['Brinquedo articulado decorativo','Modelo demonstrativo; material, idade indicada e segurança devem ser avaliados antes de qualquer produção.'],['Porta-lápis divertido','Organizador temático para lápis e itens de desenho.']],
  //  halloween: [['Enfeite de abóbora','Peça temática para decorar mesas e ambientes.'],['Porta-doces de Halloween','Recipiente decorativo demonstrativo para pequenas lembranças.']],
  //  aniversarios: [['Topo de bolo personalizado','Peça decorativa com texto ou tema a confirmar no orçamento.'],['Suporte para lembrancinhas','Base demonstrativa para organizar pequenos brindes da festa.']],
  //  'cha-revelacao': [['Plaquinha para chá revelação','Peça decorativa temática para compor a mesa do evento.'],['Enfeite de mesa para chá revelação','Objeto decorativo demonstrativo em cores a consultar.']],
  //  casamentos: [['Porta-alianças decorativo','Peça demonstrativa para apresentação das alianças, sujeita à avaliação de tamanho.'],['Marcador de mesa para casamento','Identificador de mesa com texto e acabamento a confirmar.']],
  //  lembrancinhas: [['Mini lembrança personalizada','Peça demonstrativa que pode receber nome ou símbolo após avaliação.'],['Chaveiro para evento','Lembrança de evento em formato e cores a combinar.']],
  //  formaturas: [['Topo de bolo de formatura','Peça temática demonstrativa para decoração da comemoração.'],['Suporte para foto de formatura','Base de mesa para exibir uma fotografia ou mensagem.']],
  //  decoracao: [['Escultura geométrica de mesa','Objeto demonstrativo para estantes, aparadores e mesas.'],['Vaso de linhas orgânicas','Peça decorativa demonstrativa para composição de ambientes.']],
  //  iluminarias: [['Luminária decorativa','Peça de iluminação demonstrativa. Formato, material, instalação e viabilidade elétrica devem ser avaliados antes de qualquer produção.'],['Abajur geométrico','Exemplo demonstrativo de luminária decorativa; funcionamento e componentes elétricos dependem de avaliação técnica.']],
  //  'vasos-decorativos': [['Vaso texturizado','Modelo de mesa demonstrativo; uso com água depende de material e acabamento.'],['Cachepô compacto','Peça decorativa demonstrativa para pequenos vasos.']],
  //  'mesa-posta': [['Porta-guardanapo geométrico','Acessório decorativo de mesa em formato demonstrativo.'],['Identificador de lugar','Peça para identificar lugares em refeições e eventos.']],
  //  'organizacao-da-casa': [['Divisória para gaveta','Peça organizadora demonstrativa com dimensões a confirmar.'],['Bandeja organizadora','Base para agrupar pequenos objetos em casa.']],
  //  cozinha: [['Suporte para utensílios','Acessório demonstrativo para organizar itens leves na bancada.'],['Clipe organizador de embalagens','Peça demonstrativa para ajudar a fechar e identificar embalagens.']],
  //  banheiro: [['Organizador de bancada','Peça demonstrativa para agrupar pequenos acessórios de banheiro.'],['Porta-escovas de mesa','Acessório organizador cujas dimensões e limpeza devem ser avaliadas.']],
  //  escritorio: [['Porta-canetas modular','Organizador demonstrativo para canetas e itens de mesa.'],['Suporte para celular de mesa','Base inclinada demonstrativa; compatibilidade a confirmar.']],
  //  'suportes-e-acessorios': [['Suporte articulado compacto','Modelo demonstrativo para pequenos dispositivos; compatibilidade a confirmar.'],['Gancho multiuso de parede','Acessório demonstrativo; fixação e capacidade devem ser avaliadas.']],
  //  'presentes-criativos': [['Chaveiro com nome','Lembrança demonstrativa com texto e cores a combinar.'],['Mini escultura personalizada','Objeto decorativo demonstrativo sujeito à avaliação do desenho.']],
  //  'geek-e-games': [['Suporte para controle de videogame','Base demonstrativa; formato e compatibilidade a confirmar.'],['Organizador de acessórios gamer','Peça demonstrativa para itens pequenos de jogos e tecnologia.']],
  //  pets: [['Suporte para identificação pet','Plaquinha demonstrativa com nome; formato e fixação a confirmar.'],['Organizador de acessórios pet','Peça demonstrativa para guardar itens leves de passeio.']],
  //  personalizados: [['Plaquinha personalizada','Peça demonstrativa com texto, formato e tamanho sob avaliação.'],['Peça sob medida personalizada','Projeto de exemplo, sujeito a análise do arquivo, medidas e viabilidade técnica.']],
  //  'tecnologia-e-informatica': [['Suporte para celular','Base demonstrativa para mesa; compatibilidade com aparelho a confirmar.'],['Organizador de cabos','Acessório demonstrativo para agrupar cabos em espaços de trabalho.']],
  //  farmacias: [['Organizador de balcão','Peça demonstrativa para separar itens leves em balcão ou gaveta.'],['Expositor de produtos compacto','Base demonstrativa para exposição; medidas e estabilidade a avaliar.']],
  //  'clinicas-e-consultorios': [['Organizador de bancada clínica','Peça demonstrativa para pequenos itens não críticos.'],['Suporte para identificação de sala','Base de mesa para placas ou etiquetas, sob consulta.']],
  //  'lojas-e-comercio': [['Expositor de balcão','Base demonstrativa para exibir pequenos produtos.'],['Porta-preços de mesa','Suporte demonstrativo para etiquetas de preço ou identificação.']],
  //  escritorios: [['Organizador modular de mesa','Módulo demonstrativo para agrupar objetos de escritório.'],['Suporte para cartões de visita','Acessório demonstrativo para balcão ou mesa de atendimento.']],
  //  'restaurantes-e-cafeterias': [['Porta-comanda de balcão','Acessório demonstrativo para organização de comandas.'],['Suporte para cardápio de mesa','Base demonstrativa; dimensões e uso no ambiente devem ser avaliados.']],
  //  'oficinas-e-industrias': [['Organizador de bancada','Peça demonstrativa para separar componentes leves.'],['Suporte para ferramentas pequenas','Acessório demonstrativo; carga e ambiente de uso a confirmar.']],
  //  'brindes-corporativos': [['Chaveiro com marca','Brinde demonstrativo com logotipo sujeito à análise do arquivo.'],['Plaquinha de identificação corporativa','Peça demonstrativa com nome ou marca a validar.']],
  //  'identificacao-e-organizacao-profissional': [['Etiqueta identificadora','Peça demonstrativa com texto e sistema de fixação a combinar.'],['Organizador de componentes','Acessório demonstrativo com divisórias e dimensões a confirmar.']],
  //  'outras-ideias': [['Peça funcional sob consulta','Exemplo demonstrativo para uma necessidade específica, sujeito à avaliação técnica.'],['Objeto decorativo sob consulta','Projeto demonstrativo a definir conforme ideia, medidas e viabilidade.']]
};

/* Imagens ilustrativas locais; substitua somente o caminho `image` para usar imagens próprias. */
window.CUBIC_CATEGORY_GROUPS = [
  { title:'Datas comemorativas', intro:'Ideias para celebrar momentos especiais.', categories:[
    {name:'Natal',slug:'natal',image:'assets/photos/categories/capa-categoria-natal-arvore-iluminada.webp',alt:'Árvore de Natal iluminada com luzes douradas',icon:'🎄',illustrative:false},
  //    {name:'Ano-Novo',slug:'ano-novo',image:'assets/photos/categories/ano-novo.webp',alt:'Foto ilustrativa de celebração de Ano-Novo',icon:'🎆'},
  //    {name:'Páscoa',slug:'pascoa',image:'assets/photos/categories/pascoa.webp',alt:'Foto ilustrativa de ovo decorativo de Páscoa',icon:'🐣'},
  //    {name:'Dia das Mães',slug:'dia-das-maes',image:'assets/photos/categories/dia-das-maes.webp',alt:'Foto ilustrativa de presente floral para o Dia das Mães',icon:'🌷'},
  //    {name:'Dia dos Pais',slug:'dia-dos-pais',image:'assets/photos/categories/dia-dos-pais.webp',alt:'Foto ilustrativa de presente personalizado para o Dia dos Pais',icon:'🎁'},
  //    {name:'Dia dos Namorados',slug:'dia-dos-namorados',image:'assets/photos/categories/dia-dos-namorados.webp',alt:'Foto ilustrativa romântica de corações e presente',icon:'💝'},
  //    {name:'Dia dos Professores',slug:'dia-dos-professores',image:'assets/photos/categories/dia-dos-professores.webp',alt:'Foto ilustrativa de materiais de escritório para professores',icon:'📚'},
  //    {name:'Dia do Trabalhador',slug:'dia-do-trabalhador',image:'assets/photos/categories/dia-do-trabalhador.webp',alt:'Foto ilustrativa de ferramentas e item profissional',icon:'🛠️'},
  //    {name:'Dia das Crianças',slug:'dia-das-criancas',image:'assets/photos/categories/dia-das-criancas.webp',alt:'Foto ilustrativa de brinquedo colorido para crianças',icon:'🧸'},
  //    {name:'Halloween',slug:'halloween',image:'assets/photos/categories/halloween.webp',alt:'Foto ilustrativa de abóbora decorativa de Halloween',icon:'🎃'}
  ]},
  { title:'Festas e eventos', intro:'Detalhes personalizados para guardar na memória.', categories:[
    {name:'Lembrancinhas',slug:'lembrancinhas',image:'assets/photos/categories/lembrancinhas.webp',alt:'Lembrancinhas personalizadas para festas e eventos',icon:'🎀',illustrative:false}
  ]},
  { title:'Casa e decoração', intro:'Peças funcionais e detalhes para os ambientes.', categories:[
    {name:'Bandejas',slug:'bandejas',image:'assets/photos/products/bandeja-ore-e-confie/Bandeja Ore e Confie com Essenciais.png',alt:'Bandeja decorativa Ore e Confie canelada com pezinhos',icon:'▱',illustrative:false},
    {name:'Religião',slug:'religiao',image:'assets/photos/products/jesus/mini-jesus-sentado-faixa-vermelha-decoracao-religiosa.webp',alt:'Mini Jesus sentado com o manto vermelho, peça religiosa impressa em 3D',icon:'✝️',illustrative:false},
    {name:'Kits',slug:'kits',image:'assets/photos/products/conjunto-decoração/kit-decoracao-wabi-sabi-japones-vaso-porta-velas-bandeja-01-bege.webp',alt:'Conjunto decorativo com vaso, porta-velas e bandeja',icon:'▤',illustrative:false},
    {name:'Vasos decorativos',slug:'vasos-decorativos',image:'assets/photos/products/vaso-espiral/vaso-espiral-decorativo-15cm-03-branco-impressao-3d.webp',alt:'Vaso espiral branco decorativo de 15 cm produzido em impressão 3D',icon:'♧',illustrative:false}
  ]},
  //  { title:'Presentes e hobbies', intro:'Peças criativas para presentear e aproveitar seus interesses.', categories:[
  //    {name:'Presentes criativos',slug:'presentes-criativos',image:'assets/photos/categories/presentes-criativos.webp',alt:'Foto ilustrativa de presente decorativo criativo',icon:'🎁'},
  //    {name:'Geek e games',slug:'geek-e-games',image:'assets/photos/categories/geek-e-games.webp',alt:'Foto ilustrativa de controle para videogame',icon:'🎮'},
  //    {name:'Pets',slug:'pets',image:'assets/photos/categories/pets.webp',alt:'Foto ilustrativa de pata e acessórios para pets',icon:'🐾'},
  //    {name:'Personalizados',slug:'personalizados',image:'assets/photos/categories/personalizados.webp',alt:'Foto ilustrativa de peça personalizada em impressão 3D',icon:'✨'}
  //  ]},
  //  { title:'Empresas e profissionais', intro:'Possibilidades de suportes, organizadores, expositores, brindes e peças personalizadas, sempre sujeitas à avaliação de viabilidade técnica.', categories:[
  //    {name:'Tecnologia e informática',slug:'tecnologia-e-informatica',image:'assets/photos/categories/tecnologia-e-informatica.webp',alt:'Foto ilustrativa de suportes para celulares e controles',icon:'📱'},
  //    {name:'Farmácias',slug:'farmacias',image:'assets/photos/categories/farmacias.webp',alt:'Foto ilustrativa de organizadores para balcão de farmácia',icon:'💊'},
  //    {name:'Clínicas e consultórios',slug:'clinicas-e-consultorios',image:'assets/photos/categories/clinicas-e-consultorios.webp',alt:'Foto ilustrativa de organizador para clínica e consultório',icon:'🩺'},
  //    {name:'Lojas e comércio',slug:'lojas-e-comercio',image:'assets/photos/categories/lojas-e-comercio.webp',alt:'Foto ilustrativa de expositor para loja e comércio',icon:'🏬'},
  //    {name:'Escritórios',slug:'escritorios',image:'assets/photos/categories/escritorios.webp',alt:'Foto ilustrativa de organizadores para escritórios',icon:'📎'},
  //    {name:'Restaurantes e cafeterias',slug:'restaurantes-e-cafeterias',image:'assets/photos/categories/restaurantes-e-cafeterias.webp',alt:'Foto ilustrativa de itens para restaurante e cafeteria',icon:'☕'},
  //    {name:'Oficinas e indústrias',slug:'oficinas-e-industrias',image:'assets/photos/categories/oficinas-e-industrias.webp',alt:'Foto ilustrativa de ferramenta e peça industrial',icon:'⚙️'},
  //    {name:'Brindes corporativos',slug:'brindes-corporativos',image:'assets/photos/categories/brindes-corporativos.webp',alt:'Foto ilustrativa de brinde corporativo personalizado',icon:'🏷️'},
  //    {name:'Identificação e organização profissional',slug:'identificacao-e-organizacao-profissional',image:'assets/photos/categories/identificacao-e-organizacao-profissional.webp',alt:'Foto ilustrativa de etiquetas e organizadores profissionais',icon:'🗂️'}
  //  ]},
  //  { title:'Outras possibilidades', intro:'Não encontrou a categoria certa? Conte sua ideia para a gente.', categories:[
  //    {name:'Outras ideias',slug:'outras-ideias',image:'assets/photos/categories/outras-ideias.webp',alt:'Foto ilustrativa abstrata que representa novas ideias',icon:'💡'}
  //  ]}
];
window.CUBIC_CATEGORIES = ['Todas','Natal','Religião']; // Temporariamente pausados: ['Decoração','Organização','Cozinha','Banheiro','Escritório','Suportes','Presentes','Personalizados']

let demoProductIndex = 100;
for (const group of window.CUBIC_CATEGORY_GROUPS) {
  for (const category of group.categories) {
    const examples = CUBIC_DEMO_CATEGORY_PRODUCTS[category.slug] || [];
    examples.forEach((example, variantIndex) => {
      const [name, description] = example;
      const price = Math.round((19.9 + ((demoProductIndex * 7.37) % 69) + variantIndex * 8.5) * 100) / 100;
const colors = ['Preto','Branco','Areia','Azul'];
      const dimensions = { height:50 + (demoProductIndex % 7) * 10, width:60 + (demoProductIndex % 5) * 10, depth:40 + (demoProductIndex % 4) * 10 };
      window.CUBIC_PRODUCTS.push({
        id:`demo-cat-${category.slug}-${variantIndex + 1}`,
        name,
        category:category.name,
        categories:[category.name],
        price,
        description,
        fullDescription:`${description} Este registro, as dimensões, as opções de cor e o preço são demonstrativos. A Cubic Maker deve confirmar disponibilidade, material, medidas finais, prazo e viabilidade antes da produção.`,
        image:category.image,
        dimensions,
        material:'PLA (exemplo demonstrativo)',
        colors:colors.slice(0, variantIndex === 0 ? 3 : 4),
        leadTime:'Consulte disponibilidade',
        featured:demoProductIndex++
      });
    });
  }
}
