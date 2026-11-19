// Gera páginas estáticas para que URLs de produto funcionem em hospedagens sem fallback SPA.
// Uso: node scripts/generate-product-pages.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const domain = 'https://cubicmaker.com';
const pageTemplate = fs.readFileSync(path.join(root, 'catalogo.html'), 'utf8');
const productWindow = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'products.js'), 'utf8'), { window:productWindow });
const products = productWindow.CUBIC_PRODUCTS;
const categoryGroups = productWindow.CUBIC_CATEGORY_GROUPS || [];
const categories = categoryGroups.flatMap(group => group.categories.map(category => ({ ...category, groupTitle:group.title, groupIntro:group.intro })));
const homeDecorGroup = categoryGroups.find(group => group.title === 'Casa e decoração');
if (homeDecorGroup) categories.push({
  name:homeDecorGroup.title, slug:'casa-e-decoracao', groupTitle:homeDecorGroup.title,
  groupIntro:homeDecorGroup.intro, image:'ogimage/cubic-maker-compartilhamento.webp'
});
const ids = new Set();

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}
function replaceMeta(html, selector, value, attribute = 'content') {
  const escaped = escapeHTML(value);
  const expression = new RegExp(`<meta(?=[^>]*${selector})[^>]*>`, 'i');
  const existing = html.match(expression);
  if (existing) {
    const replacement = existing[0].replace(new RegExp(`${attribute}="[^"]*"`, 'i'), `${attribute}="${escaped}"`);
    return html.replace(existing[0], replacement);
  }
  return html.replace('</head>', `  <meta ${selector} ${attribute}="${escaped}">\n</head>`);
}
function productPage(product) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id)) throw new Error(`ID inválido para URL: ${product.id}`);
  if (ids.has(product.id)) throw new Error(`ID duplicado: ${product.id}`);
  ids.add(product.id);
  const url = `${domain}/catalogo/${product.id}`;
  const title = `${product.name} | Cubic Maker`;
  const description = String(product.fullDescription || product.description || product.name).replace(/\s+/g, ' ').trim().slice(0, 300);
  const imagePath = product.images?.[0] || product.image || product.cardImage;
  const image = imagePath ? new URL(imagePath, `${domain}/`).href : `${domain}/ogimage/cubic-maker-compartilhamento.webp`;
  let html = pageTemplate;
  // Cada página estática em /catalogo/{id}/index.html aponta recursos para a raiz.
  html = html.replace(/<base href="[^"]*">/i, '<base href="../../">');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHTML(title)}</title>`);
  html = replaceMeta(html, 'name="description"', description);
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="og:type"', 'product');
  html = replaceMeta(html, 'property="og:description"', description);
  html = replaceMeta(html, 'property="og:url"', url);
  html = replaceMeta(html, 'property="og:image"', image);
  html = replaceMeta(html, 'property="og:image:secure_url"', image);
  html = replaceMeta(html, 'property="og:image:alt"', product.imageAlt || product.name);
  html = replaceMeta(html, 'name="twitter:title"', title);
  html = replaceMeta(html, 'name="twitter:description"', description);
  html = replaceMeta(html, 'name="twitter:image"', image);
  html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${url}">`);
  const schema = {
    '@context':'https://schema.org', '@type':'Product', name:product.name, description,
    image:[image], url, brand:{ '@type':'Brand', name:'Cubic Maker' }
  };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n  ${JSON.stringify(schema)}\n  </script>`);
  return { html, url };
}
function routePage({ route, title, description, imagePath, baseHref }) {
  const url = `${domain}${route}`;
  const image = imagePath ? new URL(imagePath, `${domain}/`).href : `${domain}/ogimage/cubic-maker-compartilhamento.webp`;
  let html = pageTemplate.replace(/<base href="[^"]*">/i, `<base href="${baseHref}">`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHTML(title)}</title>`);
  html = replaceMeta(html, 'name="description"', description);
  html = replaceMeta(html, 'property="og:type"', 'website');
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="og:description"', description);
  html = replaceMeta(html, 'property="og:url"', url);
  html = replaceMeta(html, 'property="og:image"', image);
  html = replaceMeta(html, 'property="og:image:secure_url"', image);
  html = replaceMeta(html, 'property="og:image:alt"', title);
  html = replaceMeta(html, 'name="twitter:title"', title);
  html = replaceMeta(html, 'name="twitter:description"', description);
  html = replaceMeta(html, 'name="twitter:image"', image);
  html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${url}">`);
  const schema = { '@context':'https://schema.org', '@type':'CollectionPage', name:title, description, url, inLanguage:'pt-BR' };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n  ${JSON.stringify(schema)}\n  </script>`);
  return html;
}

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/cubicmaker\.com\/(?:produtos\/[^<]+|catalogo\/(?!<\/loc>)[^<]+)<\/loc>[\s\S]*?<\/url>/g, '');
sitemap = sitemap.replace('https://cubicmaker.com/catalogo.html', 'https://cubicmaker.com/catalogo');
const catalogUrl = `${domain}/catalogo`;
let catalogIndex = pageTemplate.replace(/<base href="[^"]*">/i, '<base href="../">');
catalogIndex = catalogIndex.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${catalogUrl}">`);
catalogIndex = replaceMeta(catalogIndex, 'property="og:url"', catalogUrl);
const catalogOutput = path.join(root, 'catalogo', 'index.html');
fs.mkdirSync(path.dirname(catalogOutput), { recursive:true });
fs.writeFileSync(catalogOutput, catalogIndex);
const entries = [`  <url><loc>${catalogUrl}/nossos-produtos</loc></url>`];
const allProductsPage = routePage({
  route:'/catalogo/nossos-produtos', title:'Nossos Produtos | Cubic Maker',
  description:'Conheça as peças impressas em 3D da Cubic Maker. Explore produtos para decorar, organizar e presentear.',
  baseHref:'../../'
});
const allProductsOutput = path.join(root, 'catalogo', 'nossos-produtos', 'index.html');
fs.mkdirSync(path.dirname(allProductsOutput), { recursive:true });
fs.writeFileSync(allProductsOutput, allProductsPage);
for (const category of categories) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug)) throw new Error(`Slug de categoria inválido: ${category.slug}`);
  const route = `/catalogo/nossos-produtos/${category.slug}`;
  const description = `${category.groupIntro || `Explore produtos da categoria ${category.name}`} Descubra opções em impressão 3D da Cubic Maker.`.replace(/\s+/g, ' ').trim().slice(0, 300);
  const categoryPage = routePage({
    route, title:`${category.name} | Nossos Produtos | Cubic Maker`, description,
    imagePath:category.image, baseHref:'../../../'
  });
  const categoryOutput = path.join(root, 'catalogo', 'nossos-produtos', category.slug, 'index.html');
  fs.mkdirSync(path.dirname(categoryOutput), { recursive:true });
  fs.writeFileSync(categoryOutput, categoryPage);
  entries.push(`  <url><loc>${domain}${route}</loc></url>`);
}
for (const product of products) {
  const { html, url } = productPage(product);
  for (const routeFolder of ['catalogo', 'produtos']) {
    const output = path.join(root, routeFolder, product.id, 'index.html');
    fs.mkdirSync(path.dirname(output), { recursive:true });
    fs.writeFileSync(output, html);
  }
  entries.push(`  <url><loc>${url}</loc></url>`);
}
sitemap = sitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`Geradas as rotas do catálogo, ${categories.length} categorias, ${products.length} rotas canônicas, ${products.length} páginas legadas e sitemap.xml.`);
