/* Catálogo afiliado separado de products.js (produtos próprios da Cubic Maker). */
window.CUBIC_AFFILIATE_CATEGORIES = [
  'Casa e Organização',
  'Decoração',
  'Acessórios',
  'Ferramentas e Maker',
  'Impressão 3D',
  'Outros'
];

/*
 * Os itens com status 'draft' são exemplos de navegação, não produtos reais.
 * Substitua os dados, a foto e o link antes de usar status 'published'.
 * Para ocultar sem apagar, use status 'hidden'.
 */
window.CUBIC_AFFILIATE_PRODUCTS = [
  { id:'modelo-organizador', name:'Organizador modular de mesa', description:'Uma ideia para reunir pequenos itens de papelaria e manter a área de trabalho mais organizada.', category:'Casa e Organização', image:'assets/photos/categories/escritorio.webp', imageAlt:'Organizador de mesa em ambiente de escritório.', affiliateUrl:'', status:'draft' },
  { id:'modelo-luminaria', name:'Luminária decorativa compacta', description:'Exemplo de indicação para complementar a iluminação e a decoração de um ambiente.', category:'Decoração', image:'assets/photos/categories/iluminarias.webp', imageAlt:'Luminária decorativa compacta para ambientes internos.', affiliateUrl:'', status:'draft' },
  { id:'modelo-suporte-celular', name:'Suporte ajustável para celular', description:'Uma opção para apoiar o celular sobre a mesa durante chamadas, vídeos ou leitura.', category:'Acessórios', image:'assets/photos/categories/tecnologia-e-informatica.webp', imageAlt:'Suporte para celular sobre uma mesa.', affiliateUrl:'', status:'draft' },
  { id:'modelo-kit-precisao', name:'Kit de ferramentas de precisão', description:'Exemplo de ferramenta para pequenos ajustes e projetos de montagem e manutenção.', category:'Ferramentas e Maker', image:'assets/photos/categories/oficinas-e-industrias.webp', imageAlt:'Ferramentas de precisão para pequenos projetos.', affiliateUrl:'', status:'draft' },
  { id:'modelo-filamento-pla', name:'Filamento PLA para impressão 3D', description:'Material para projetos de impressão 3D. Confira especificações e compatibilidade na loja.', category:'Impressão 3D', image:'assets/photos/categories/personalizados.webp', imageAlt:'Projeto de impressão 3D em andamento.', affiliateUrl:'', status:'draft' },
  { id:'modelo-base-corte', name:'Base de corte para projetos criativos', description:'Uma sugestão de acessório para apoiar atividades manuais e trabalhos de bancada.', category:'Outros', image:'assets/photos/categories/outras-ideias.webp', imageAlt:'Base de corte para projetos criativos.', affiliateUrl:'', status:'draft' },
  { id:'modelo-caixa-cabos', name:'Caixa organizadora de cabos', description:'Exemplo de produto para agrupar cabos e acessórios próximos à mesa ou aos eletrônicos.', category:'Casa e Organização', image:'assets/photos/categories/organizacao-da-casa.webp', imageAlt:'Caixa organizadora para cabos e acessórios.', affiliateUrl:'', status:'draft' },
  { id:'modelo-vaso', name:'Vaso decorativo para interiores', description:'Uma ideia de decoração para compor prateleiras, mesas e outros espaços internos.', category:'Decoração', image:'assets/photos/categories/vasos-decorativos.webp', imageAlt:'Vaso decorativo para ambientes internos.', affiliateUrl:'', status:'draft' },
  // {
  //   id: '',                  // obrigatório; único, sem espaços
  //   name: '',                // obrigatório
  //   description: '',         // obrigatório; breve e baseada em informação confirmada
  //   category: '',            // uma das categorias acima; opcional
  //   image: '',               // caminho local ou URL HTTPS da foto real do produto
  //   imageAlt: '',            // texto alternativo objetivo
  //   affiliateUrl: '',        // URL completa fornecida pelo programa; preserve todos os parâmetros
  //   status: 'hidden',        // 'published', 'draft' ou 'hidden'
  //   internalNotes: ''        // opcional; não aparece publicamente
  // }
];
