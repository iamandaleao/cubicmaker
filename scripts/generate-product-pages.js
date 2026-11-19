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
  const url = `${domain}/produtos/${product.id}/`;
  const title = `${product.name} | Cubic Maker`;
  const description = String(product.fullDescription || product.description || product.name).replace(/\s+/g, ' ').trim().slice(0, 300);
  const imagePath = product.images?.[0] || product.image || product.cardImage;
  const image = imagePath ? new URL(imagePath, `${domain}/`).href : `${domain}/ogimage/cubic-maker-compartilhamento.webp`;
  let html = pageTemplate;
  // A base relativa permite abrir o catálogo em file:// e mantém os recursos na raiz
  // nas páginas estáticas /produtos/{id}/, inclusive em hospedagens sem rewrite.
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

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/cubicmaker\.com\/produtos\/[^<]+<\/loc>[\s\S]*?<\/url>/g, '');
const entries = [];
for (const product of products) {
  const { html, url } = productPage(product);
  const output = path.join(root, 'produtos', product.id, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive:true });
  fs.writeFileSync(output, html);
  entries.push(`  <url><loc>${url}</loc></url>`);
}
sitemap = sitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`Geradas ${products.length} páginas de produto e atualizados sitemap.xml.`);
