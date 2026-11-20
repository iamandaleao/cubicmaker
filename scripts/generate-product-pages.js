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
  groupIntro:homeDecorGroup.intro, memberNames:homeDecorGroup.categories.map(category => category.name),
  image:'ogimage/cubic-maker-compartilhamento.webp'
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
function productCategories(product) {
  const names = new Set(product.categories || [product.category]);
  return categories.filter(category => category.memberNames
    ? [...names].some(name => category.memberNames.includes(name))
    : names.has(category.name));
}
function productPage(product, categorySlug, { baseHref, canonicalRoute } = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id)) throw new Error(`ID inválido para URL: ${product.id}`);
  const route = categorySlug
    ? `/catalogo/${categorySlug}/${product.id}`
    : `/catalogo/${product.id}`;
  const url = `${domain}${canonicalRoute || route}`;
  const title = `${product.name} | Cubic Maker`;
  const description = String(product.fullDescription || product.description || product.name).replace(/\s+/g, ' ').trim().slice(0, 300);
  const imagePath = product.images?.[0] || product.image || product.cardImage;
  const image = imagePath ? new URL(imagePath, `${domain}/`).href : `${domain}/ogimage/cubic-maker-compartilhamento.webp`;
  let html = pageTemplate;
  // A profundidade da rota varia; o base href mantém os recursos relativos à raiz do site.
  html = html.replace(/<base href="[^"]*">/i, `<base href="${baseHref}">`);
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
  return html;
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
let productRouteCount = 0;
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
  const route = `/catalogo/${category.slug}`;
  const description = `${category.groupIntro || `Explore produtos da categoria ${category.name}`} Descubra opções em impressão 3D da Cubic Maker.`.replace(/\s+/g, ' ').trim().slice(0, 300);
  const categoryPage = routePage({
    route, title:`${category.name} | Nossos Produtos | Cubic Maker`, description,
    imagePath:category.image, baseHref:'../../'
  });
  const categoryOutput = path.join(root, 'catalogo', category.slug, 'index.html');
  fs.mkdirSync(path.dirname(categoryOutput), { recursive:true });
  fs.writeFileSync(categoryOutput, categoryPage);
  // Mantém a URL anterior acessível; o app a normaliza para /catalogo/{categoria}.
  const legacyCategoryOutput = path.join(root, 'catalogo', 'nossos-produtos', category.slug, 'index.html');
  fs.mkdirSync(path.dirname(legacyCategoryOutput), { recursive:true });
  fs.writeFileSync(legacyCategoryOutput, categoryPage.replaceAll(`<base href="../../">`, `<base href="../../../">`));
  entries.push(`  <url><loc>${domain}${route}</loc></url>`);
}
for (const product of products) {
  if (ids.has(product.id)) throw new Error(`ID duplicado: ${product.id}`);
  ids.add(product.id);
  const matchedCategories = productCategories(product);
  const primaryCategory = matchedCategories[0] || null;
  const primaryRoute = primaryCategory
    ? `/catalogo/${primaryCategory.slug}/${product.id}`
    : `/catalogo/${product.id}`;
  const routeCategories = matchedCategories.length ? matchedCategories : [null];
  for (const category of routeCategories) {
    const slug = category?.slug || null;
    const route = slug ? `/catalogo/${slug}/${product.id}` : `/catalogo/${product.id}`;
    const html = productPage(product, slug, {
      baseHref:slug ? '../../../' : '../../',
      canonicalRoute:route
    });
    const output = slug
      ? path.join(root, 'catalogo', slug, product.id, 'index.html')
      : path.join(root, 'catalogo', product.id, 'index.html');
    fs.mkdirSync(path.dirname(output), { recursive:true });
    fs.writeFileSync(output, html);
    if (slug) {
      const legacyOutput = path.join(root, 'catalogo', 'nossos-produtos', slug, product.id, 'index.html');
      fs.mkdirSync(path.dirname(legacyOutput), { recursive:true });
      fs.writeFileSync(legacyOutput, html.replaceAll(`<base href="../../../">`, `<base href="../../../../">`));
    }
    productRouteCount++;
  }
  const allProductsProductRoute = `/catalogo/nossos-produtos/${product.id}`;
  const allProductsProductPage = productPage(product, null, {
    baseHref:'../../../', canonicalRoute:allProductsProductRoute
  });
  const allProductsProductOutput = path.join(root, 'catalogo', 'nossos-produtos', product.id, 'index.html');
  fs.mkdirSync(path.dirname(allProductsProductOutput), { recursive:true });
  fs.writeFileSync(allProductsProductOutput, allProductsProductPage);
  const canonicalHtml = productPage(product, primaryCategory?.slug || null, {
    baseHref:'../../', canonicalRoute:primaryRoute
  });
  for (const routeFolder of ['catalogo', 'produtos']) {
    const output = path.join(root, routeFolder, product.id, 'index.html');
    fs.mkdirSync(path.dirname(output), { recursive:true });
    fs.writeFileSync(output, canonicalHtml);
  }
  entries.push(`  <url><loc>${domain}${primaryRoute}</loc></url>`);
}
sitemap = sitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`Geradas as rotas do catálogo, ${categories.length} categorias, ${productRouteCount} rotas de produto por categoria, ${products.length} aliases legados e sitemap.xml.`);
