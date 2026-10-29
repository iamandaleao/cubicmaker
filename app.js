(() => {
  'use strict';
  const CONFIG = { WHATSAPP_NUMBER: '5547991611628', CONTACT_EMAIL: 'admcubicmaker@gmail.com', TRENDING_ENDPOINT: '' }; // Endpoint opcional: GET retorna {items:[{id,clicks}]} e POST recebe {productId,event}.
  const PRODUCT_COLORS = ['Preto','Branco','Areia','Verde oliva','Vermelho'];
  const PRODUCT_COLOR_SWATCHES = { 'Preto':'#272927','Branco':'#ffffff','Areia':'#cbb99a','Verde oliva':'#78825b','Vermelho':'#bd493e' };
  const PRODUCT_SIZES = ['P (8 cm)','M (12 cm)','G (16 cm)'];
  const products = Array.isArray(window.CUBIC_PRODUCTS) ? window.CUBIC_PRODUCTS : [];
  const categoryGroups = Array.isArray(window.CUBIC_CATEGORY_GROUPS) ? window.CUBIC_CATEGORY_GROUPS : [];
  const categoryEntries = categoryGroups.flatMap(group => group.categories.map(category => ({ ...category, groupTitle:group.title, groupIntro:group.intro })));
  const categoryBySlug = new Map(categoryEntries.map(category => [category.slug, category]));
  const STORAGE_KEY = 'cubicmaker-interest-v1';
  const TRENDING_STORAGE_KEY = 'cubicmaker-product-clicks-v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const productGrid = $('#productGrid');
  const trendingCarousel = $('#trendingCarousel');
  const trendingTrack = $('#trendingTrack');
  const isCatalogPage = Boolean($('#categoryGroups'));
  const cartPanel = $('#cartPanel');
  const overlay = $('#overlay');
  const dialog = $('#productDialog');
  const infoDialog = $('#infoDialog');
  let cart = loadCart();
  let customRequest = loadCustomRequest();
  let currentCategory = null;
  let toastTimer;
  let lastFocus = null;
  let productClickCounts = loadProductClickCounts();
  let sharedTrendingCounts = null;
  let trendingTimer = null;
  let trendingOpenerId = null;

  $$('[data-whatsapp-contact]').forEach(link => {
    if (!/^\d{12,13}$/.test(CONFIG.WHATSAPP_NUMBER)) return;
    const message = 'Olá! Gostaria de falar com a Cubic Maker sobre impressão 3D.';
    link.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  const whatsappSocialLink = $('[data-whatsapp-social]');
  if (whatsappSocialLink && /^\d{12,13}$/.test(CONFIG.WHATSAPP_NUMBER)) {
    whatsappSocialLink.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
    whatsappSocialLink.title = `WhatsApp · https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
    whatsappSocialLink.target = '_blank';
    whatsappSocialLink.rel = 'noopener noreferrer';
  }
  const emailSocialButton = $('.social-email');
  if (emailSocialButton && CONFIG.CONTACT_EMAIL.trim()) {
    const emailLink = document.createElement('a');
    emailLink.className = emailSocialButton.className;
    emailLink.href = `mailto:${CONFIG.CONTACT_EMAIL.trim()}`;
    emailLink.title = `E-mail · ${CONFIG.CONTACT_EMAIL.trim()}`;
    emailLink.setAttribute('aria-label', `Enviar e-mail para ${CONFIG.CONTACT_EMAIL.trim()}`);
    emailLink.innerHTML = emailSocialButton.innerHTML;
    emailSocialButton.replaceWith(emailLink);
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function money(value) {
    return Number(value).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
  }
  function versionName(version) { return version === 'reforcada' ? 'Reforçada' : 'Econômica'; }
  function versionDescription(version) { return version === 'reforcada' ? 'Mais material, paredes espessas e maior tempo de produção.' : 'Menor consumo de material, paredes mais finas e preço mais acessível.'; }
  function versionPrice(product, version = 'economica') {
    if (product?.price == null) return null;
    return Number(product.price) * (version === 'reforcada' ? 2 : 1);
  }
  function productSubtotal(product, quantity = 1, version = 'economica') {
    if (product?.price == null) return null;
    const count = Math.min(99, Math.max(1, Number.parseInt(quantity, 10) || 1));
    const multiplier = version === 'reforcada' ? 2 : 1;
    return product.bundleOffer && count === Number(product.bundleOffer.quantity)
      ? Number(product.bundleOffer.price) * multiplier
      : versionPrice(product, version) * count;
  }
  function configuredUnitPrice(product, item) {
    const options = product?.orderOptions;
    if (!options) return versionPrice(product, item?.version);
    if ((item?.size || options.fixedSize) !== options.pricedSize) return null;
    return options.finishes.find(finish => finish.value === item?.finish)?.price ?? null;
  }
  function configuredSubtotal(product, item) {
    const unitPrice = configuredUnitPrice(product,item);
    return unitPrice == null ? null : unitPrice * Math.min(99,Math.max(1,Number.parseInt(item?.quantity,10)||1));
  }
  function cartUnitPrice(product,item) { return product?.orderOptions ? configuredUnitPrice(product,item) : versionPrice(product,item?.version); }
  function cartSubtotal(product,item) { return product?.orderOptions ? configuredSubtotal(product,item) : productSubtotal(product,item?.quantity,item?.version); }
  function productImages(product) {
    const images = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
    return images.length ? images : (product?.image ? [product.image] : []);
  }
  function productColors(product) {
    return Array.isArray(product?.colorOptions) ? product.colorOptions : PRODUCT_COLORS;
  }
  function productDescriptionMarkup(product) {
    const content = product?.detailContent;
    if (!content) return `<p class="dialog-description">${escapeHTML(product.fullDescription || product.description || '')}</p>`;
    return `<div class="dialog-description dialog-description-structured">${(content.paragraphs || []).map(text => `<p>${escapeHTML(text)}</p>`).join('')}${content.features?.length ? `<section class="description-feature-block"><h3>Características</h3><ul>${content.features.map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ul></section>` : ''}${content.suggestion ? `<p class="description-suggestion"><strong>Sugestão de uso:</strong> ${escapeHTML(content.suggestion)}</p>` : ''}</div>`;
  }
  function colorSwatchStyle(color = '') {
    return `--swatch-color:${PRODUCT_COLOR_SWATCHES[color] || '#e7e9e3'}`;
  }
  function productPriceMarkup(product, version = 'economica') {
    if (product.orderOptions) {
      const prices = product.orderOptions.finishes.map(finish => Number(finish.price)).filter(Number.isFinite);
      if (!prices.length) return '';
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const priceText = min === max ? money(min) : `${money(min)} - ${money(max)}`;
      return `<span class="option-price-range">${priceText}</span>`;
    }
    if (product.price == null) return '<span class="price-consult">Consulte disponibilidade</span>';
    return money(versionPrice(product, version));
  }
  function normalizeSearch(value = '') {
    return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/\bpra\b/g, 'para').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function matchesSearch(product, query) {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const haystack = normalizeSearch(`${product.name} ${product.description} ${product.fullDescription || ''} ${product.category} ${(product.categories || []).join(' ')}`);
    const aliases = { telefone:['celular'], celular:['telefone','smartphone'], smartphone:['celular','telefone'] };
    return terms.every(term => haystack.includes(term) || (aliases[term] || []).some(alias => haystack.includes(alias)));
  }
  function getProduct(id) { return products.find(product => product.id === id); }
  function loadProductClickCounts() {
    try {
      const stored = JSON.parse(localStorage.getItem(TRENDING_STORAGE_KEY) || '{}');
      return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
    } catch { return {}; }
  }
  function getTrendingProducts() {
    const byFeatured = (a,b) => (a.featured || 999) - (b.featured || 999);
    let ranked;
    if (sharedTrendingCounts) {
      ranked = [...products].sort((a,b) => (sharedTrendingCounts[b.id] || 0) - (sharedTrendingCounts[a.id] || 0) || byFeatured(a,b));
    } else {
      ranked = [...products].filter(product => Number(productClickCounts[product.id]) > 0)
        .sort((a,b) => Number(productClickCounts[b.id]) - Number(productClickCounts[a.id]) || byFeatured(a,b));
      ranked.push(...products.filter(product => !ranked.includes(product)).sort(byFeatured));
    }
    return ranked.slice(0,10);
  }
  function renderTrendingCarousel() {
    if (trendingTrack) trendingTrack.innerHTML = getTrendingProducts().map(productCard).join('');
  }
  async function loadSharedTrending() {
    if (!CONFIG.TRENDING_ENDPOINT || !trendingTrack) return;
    try {
      const response = await fetch(CONFIG.TRENDING_ENDPOINT, { headers:{ Accept:'application/json' }, cache:'no-store' });
      if (!response.ok) return;
      const payload = await response.json();
      const items = Array.isArray(payload) ? payload : payload?.items;
      if (!Array.isArray(items)) return;
      sharedTrendingCounts = Object.fromEntries(items
        .filter(item => getProduct(item.id) && Number.isFinite(Number(item.clicks)))
        .map(item => [item.id, Math.max(0,Number(item.clicks))]));
      renderTrendingCarousel();
    } catch { /* Mantém a ordenação local se o serviço compartilhado não estiver disponível. */ }
  }
  function recordProductClick(id) {
    productClickCounts[id] = (Number(productClickCounts[id]) || 0) + 1;
    try { localStorage.setItem(TRENDING_STORAGE_KEY, JSON.stringify(productClickCounts)); } catch {}
    if (CONFIG.TRENDING_ENDPOINT) {
      fetch(CONFIG.TRENDING_ENDPOINT, {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ productId:id, event:'product-detail-opened' }), keepalive:true
      }).catch(() => {});
    }
  }
  function moveTrending(direction) {
    if (!trendingCarousel) return;
    const maxScroll = trendingCarousel.scrollWidth - trendingCarousel.clientWidth;
    if (maxScroll <= 2) return;
    const atStart = trendingCarousel.scrollLeft <= 3;
    const atEnd = trendingCarousel.scrollLeft >= maxScroll - 3;
    if (direction < 0 && atStart) trendingCarousel.scrollTo({ left:maxScroll, behavior:'smooth' });
    else if (direction > 0 && atEnd) trendingCarousel.scrollTo({ left:0, behavior:'smooth' });
    else trendingCarousel.scrollBy({ left:direction * Math.max(220,trendingCarousel.clientWidth * .82), behavior:'smooth' });
  }
  function stopTrendingAutoplay() { clearInterval(trendingTimer); trendingTimer = null; }
  function startTrendingAutoplay() {
    stopTrendingAutoplay();
    if (!trendingCarousel || matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) return;
    if (trendingCarousel.scrollWidth <= trendingCarousel.clientWidth + 2) return;
    trendingTimer = setInterval(() => moveTrending(1), 5500);
  }
  function initTrendingCarousel() {
    if (!trendingCarousel || !trendingTrack) return;
    $('#trendingPrev')?.addEventListener('click', () => moveTrending(-1));
    $('#trendingNext')?.addEventListener('click', () => moveTrending(1));
    trendingCarousel.addEventListener('pointerenter', stopTrendingAutoplay);
    trendingCarousel.addEventListener('pointerleave', startTrendingAutoplay);
    trendingCarousel.addEventListener('focusin', stopTrendingAutoplay);
    trendingCarousel.addEventListener('focusout', event => { if (!trendingCarousel.contains(event.relatedTarget)) startTrendingAutoplay(); });
    document.addEventListener('visibilitychange', () => document.hidden ? stopTrendingAutoplay() : startTrendingAutoplay());
    renderTrendingCarousel();
    loadSharedTrending();
    startTrendingAutoplay();
  }
  function loadCart() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const saved = Array.isArray(stored) ? stored : stored?.items;
      if (!Array.isArray(saved)) return [];
      return saved.filter(item => item && getProduct(item.productId)).map(item => {
        const product=getProduct(item.productId);
        const version=item.version === 'reforcada' ? 'reforcada' : 'economica';
        let color=String(item.color || '');
        let size=String(item.size || '');
        let finish=String(item.finish || '');
        let key=String(item.key || item.productId);
        if (product.orderOptions) {
          size=product.orderOptions.fixedSize;
          if (finish === 'branco') finish='sem-cor';
          if (finish === 'pintado') finish='colorido';
          if (finish === 'sem-cor') color='';
          key=`${item.productId}::${version}::${color}::${size}::${finish}`;
        }
        return { key, productId:item.productId, version, quantity:Math.max(1,Math.min(99,Number.parseInt(item.quantity,10)||1)), color, size, finish, note:String(item.note || '').slice(0,500) };
      });
    } catch { return []; }
  }
  function loadCustomRequest() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      const value = stored && !Array.isArray(stored) ? stored.customRequest : null;
      if (!value || typeof value !== 'object') return null;
      const clean = key => String(value[key] || '').slice(0, 500);
      const request = { idea:clean('idea'), dimensions:clean('dimensions'), color:clean('color') };
      return request.idea || request.dimensions || request.color ? request : null;
    } catch { return null; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ items:cart, customRequest })); }
    catch { showToast('Não foi possível salvar sua seleção neste dispositivo.'); }
  }
  function optionList(options, selected = '', placeholder = 'Consulte disponibilidade') {
    if (!Array.isArray(options) || !options.length) return `<option value="">${escapeHTML(placeholder)}</option>`;
    const values = selected && !options.includes(selected) ? [selected, ...options] : options;
    return `<option value="" ${selected ? '' : 'selected'}>${escapeHTML(placeholder)}</option>${values.map(value => `<option value="${escapeHTML(value)}" ${value === selected ? 'selected' : ''}>${escapeHTML(value)}</option>`).join('')}`;
  }
  function productCard(product) {
    const image = productImages(product)[0];
    const demonstrative = product.demonstrative !== false;
    const variations = product.orderOptions
      ? `<span>Opções: ${escapeHTML(product.orderOptions.finishes.map(finish => finish.label).join(', '))}</span>`
      : `<span>Cores: ${escapeHTML(productColors(product).join(', '))}</span><span>Opções: ${escapeHTML(PRODUCT_SIZES.join(', '))}</span>`;
    return `<article class="product-card">
      <div class="product-image-wrap"><button type="button" class="product-image-button" data-details="${escapeHTML(product.id)}" aria-label="Ver detalhes de ${escapeHTML(product.name)}">${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(product.imageAlt || product.name)}" loading="lazy" width="640" height="480">` : `<span class="product-image-placeholder" aria-hidden="true">Cubic Maker</span>`}${demonstrative ? '<span class="demo-tag">DEMONSTRAÇÃO</span>' : ''}</button><button type="button" class="quick-add" data-add="${escapeHTML(product.id)}" aria-label="Adicionar ${escapeHTML(product.name)} à lista">+</button></div>
      <div class="product-info"><div class="product-meta"><span>${escapeHTML(product.category)}</span><span class="product-code">CM / ${escapeHTML(String(product.featured || '01').padStart(2,'0'))}</span></div><h3><button type="button" class="product-title-link" data-details="${escapeHTML(product.id)}" aria-label="Ver detalhes de ${escapeHTML(product.name)}">${escapeHTML(product.name)}</button></h3><p>${escapeHTML(product.description || '')}</p>${product.cardNote ? `<p>${escapeHTML(product.cardNote)}</p>` : ''}<div class="product-variations">${variations}</div><div class="product-bottom"><div class="price">${productPriceMarkup(product)}</div><button class="details-link" type="button" data-details="${escapeHTML(product.id)}">Ver detalhes <span aria-hidden="true">↗</span></button></div></div>
    </article>`;
  }
  function renderCategoryGroups() {
    if (!isCatalogPage) return;
    $('#categoryGroups').innerHTML = categoryGroups.map(group => { const visibleCategories = group.categories.filter(category => !category.hidden); return `<section class="category-group" aria-labelledby="group-${escapeHTML(visibleCategories[0]?.slug || 'catalogo')}"><div class="category-group-heading"><div><p class="section-kicker">CATEGORIAS / ${escapeHTML(group.title.toLocaleUpperCase('pt-BR'))}</p><h2 id="group-${escapeHTML(visibleCategories[0]?.slug || 'catalogo')}">${escapeHTML(group.title)}</h2></div><p>${escapeHTML(group.intro)}</p></div><div class="category-card-grid">${visibleCategories.map(category => `<a class="category-card" href="#catalogo/${escapeHTML(category.slug)}" data-open-category="${escapeHTML(category.slug)}"><span class="category-card-image"><img src="${escapeHTML(category.image)}" alt="${escapeHTML(category.alt)}" loading="lazy" width="480" height="360"><span class="category-illustration-label">FOTO ILUSTRATIVA</span></span><span class="category-card-name">${escapeHTML(category.name)}<span aria-hidden="true">↗</span></span></a>`).join('')}</div></section>`; }).join('');
  }
  function renderCategories() {
    if (!isCatalogPage) return;
    if (!currentCategory) { $('#categoryFilters').innerHTML = ''; return; }
    const category = categoryBySlug.get(currentCategory);
    const group = categoryGroups.find(entry => entry.categories.some(item => item.slug === currentCategory));
    const siblings = group?.categories.filter(entry => !entry.hidden) || [category];
    $('#categoryFilters').innerHTML = siblings.map(entry => `<button class="category-chip ${entry.slug === currentCategory ? 'is-active' : ''}" type="button" data-category="${escapeHTML(entry.slug)}" aria-pressed="${entry.slug === currentCategory}">${escapeHTML(entry.name)}</button>`).join('');
  }
  function renderCatalogLanding() {
    if (!isCatalogPage) return;
    currentCategory = null;
    document.title = 'Catálogo de produtos em impressão 3D | Cubic Maker';
    document.body.classList.add('catalog-mode');
    $('#catalogLanding').hidden = false;
    $('#categoryProductsView').hidden = true;
    $('#catalogQuickSearchInput').value = '';
    $('#searchInput').value = '';
    renderCategoryGroups();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function showSearchResults(query) {
    if (!isCatalogPage) return;
    const term = String(query || '').trim();
    if (!term) { renderCatalogLanding(); return; }
    currentCategory = null;
    document.title = `Busca por ${term} — Catálogo | Cubic Maker`;
    document.body.classList.add('catalog-mode');
    $('#catalogLanding').hidden = true;
    $('#categoryProductsView').hidden = false;
    $('#breadcrumbCategory').textContent = 'Busca';
    $('#categoryGroupName').textContent = 'BUSCA / TODOS OS PRODUTOS';
    $('#categoryPageTitle').textContent = 'Resultados da busca';
    $('#categoryPageIntro').textContent = `Produtos relacionados a “${term}” em todas as categorias.`;
    $('#searchInput').value = term;
    renderCategories();
    renderProducts();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function searchCatalog(query) {
    const term = String(query || '').trim();
    if (!term) { showToast('Digite um produto ou uma ideia para buscar.'); $('#catalogQuickSearchInput').focus(); return; }
    const target = `#buscar/${encodeURIComponent(term)}`;
    if (location.hash !== target) history.pushState(null,'',target);
    showSearchResults(term);
  }
  function showCategory(slug) {
    if (!isCatalogPage) return;
    const category = categoryBySlug.get(slug);
    if (!category) { renderCatalogLanding(); return; }
    document.title = `${category.name} — Catálogo | Cubic Maker`;
    currentCategory = slug;
    document.body.classList.add('catalog-mode');
    $('#catalogLanding').hidden = true;
    $('#categoryProductsView').hidden = false;
    $('#breadcrumbCategory').textContent = category.name;
    $('#categoryGroupName').textContent = `CATÁLOGO / ${category.groupTitle.toLocaleUpperCase('pt-BR')}`;
    $('#categoryPageTitle').textContent = category.name;
    $('#categoryPageIntro').textContent = category.groupTitle === 'Empresas e profissionais' ? 'Possibilidades de suportes, organizadores, expositores, brindes e peças personalizadas, sujeitas à viabilidade técnica.' : category.groupIntro;
    renderCategories();
    renderProducts();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function openCategory(slug) {
    const target = `#catalogo/${slug}`;
    if (location.hash !== target) history.pushState(null,'',target);
    showCategory(slug);
  }
  function openCatalog() {
    if (location.hash !== '#catalogo') history.pushState(null,'','#catalogo');
    renderCatalogLanding();
  }
  function routeFromHash() {
    if (!isCatalogPage) return;
    const hash = location.hash.slice(1);
    if (hash === 'catalogo' || !hash) { renderCatalogLanding(); return; }
    if (hash.startsWith('catalogo/')) { showCategory(hash.slice('catalogo/'.length)); return; }
    if (hash.startsWith('buscar/')) {
      let query = '';
      try { query = decodeURIComponent(hash.slice('buscar/'.length)); } catch { query = hash.slice('buscar/'.length); }
      showSearchResults(query); return;
    }
    renderCatalogLanding();
  }
  function renderProducts() {
    if (!isCatalogPage) return;
    const search = $('#searchInput').value.trim();
    const sort = $('#sortSelect').value;
    const selected = currentCategory ? categoryBySlug.get(currentCategory) : null;
    let visible = products.filter(product => (!selected || (product.categories || [product.category]).includes(selected.name)) && matchesSearch(product, search));
    if (sort === 'asc' || sort === 'desc') visible.sort((a,b) => {
      if (a.price == null) return 1;
      if (b.price == null) return -1;
      return sort === 'asc' ? a.price - b.price : b.price - a.price;
    }); else visible.sort((a,b) => (a.featured || 999) - (b.featured || 999));
    productGrid.innerHTML = visible.map(productCard).join('');
    $('#resultCount').textContent = `${visible.length} ${visible.length === 1 ? 'peça encontrada' : 'peças encontradas'}`;
    $('#noResults').hidden = visible.length !== 0;
    productGrid.hidden = visible.length === 0;
    if (selected) {
      const categoryHasProducts = products.some(product => (product.categories || [product.category]).includes(selected.name));
      $('#emptyCategoryTitle').textContent = categoryHasProducts ? 'Nenhuma peça encontrada' : 'Ainda não há produtos nesta categoria';
      $('#emptyCategoryText').textContent = categoryHasProducts ? 'Tente outro termo ou fale com a Cubic Maker para pedir uma peça personalizada.' : 'Não encontrou o que procura? Conte sua ideia para a Cubic Maker!';
      $('#emptyCategoryRequest').hidden = false;
    } else if (search) {
      $('#emptyCategoryTitle').textContent = 'Nenhum produto encontrado';
      $('#emptyCategoryText').textContent = 'Tente outro termo ou conte sua ideia para a Cubic Maker.';
      $('#emptyCategoryRequest').hidden = false;
    }
  }
  function addProduct(product, opts = {}) {
    const color = opts.color || '';
    const size = opts.size || product.orderOptions?.fixedSize || '';
    const version = opts.version === 'reforcada' ? 'reforcada' : 'economica';
    const finish = opts.finish || '';
    const key = product.orderOptions ? `${product.id}::${version}::${color}::${size}::${finish}` : `${product.id}::${version}::${color}::${size}`;
    let existing = cart.find(item => item.key === key);
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + (Number(opts.quantity) || 1));
      if (opts.note) existing.note = opts.note.slice(0,500);
    } else cart.push({ key, productId:product.id, version, quantity:Math.min(99,Math.max(1,Number(opts.quantity)||1)), color, size, finish, note:(opts.note || '').slice(0,500) });
    saveCart(); renderCart(); showToast(`${product.name} adicionado à sua lista.`);
  }
  function renderCart() {
    const totalItems = cart.reduce((sum,item) => sum + item.quantity, 0) + (customRequest ? 1 : 0);
    $('#bagCount').textContent = totalItems;
    $('#openCart').setAttribute('aria-label', `Abrir lista de interesse, ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`);
    $('#cartTitleCount').textContent = `(${totalItems})`;
    if (!cart.length && !customRequest) {
      $('#cartContent').innerHTML = '<div class="empty-cart"><span class="empty-icon">＋</span><h3>Sua lista está vazia</h3><p>Explore o catálogo e adicione as peças que despertaram seu interesse.</p><button class="button button-dark" type="button" data-close-cart>Explorar catálogo</button></div>';
      $('#cartTotal').innerHTML = '';
      $('#requestQuote').disabled = true;
      return;
    }
    const productRows = cart.map(item => {
      const product = getProduct(item.productId);
      if (!product) return '';
      const subtotal = cartSubtotal(product,item);
      const image = productImages(product)[0];
      const orderOptions = product.orderOptions;
      const cartOptionMarkup = orderOptions
        ? `<div class="cart-options"><label>Acabamento<select data-field="finish" data-key="${escapeHTML(item.key)}"><option value="" ${item.finish ? '' : 'selected'}>Selecione uma opção</option>${orderOptions.finishes.map(finish => `<option value="${escapeHTML(finish.value)}" ${item.finish === finish.value ? 'selected' : ''}>${escapeHTML(finish.label)}</option>`).join('')}</select></label>${item.finish === 'colorido' ? `<label>Cor do manto<select data-field="color" data-key="${escapeHTML(item.key)}" required>${optionList(orderOptions.colors,item.color,'Selecione uma cor')}</select></label>` : ''}</div>`
        : `<div class="cart-options"><label>Versão<select data-field="version" data-key="${escapeHTML(item.key)}"><option value="economica" ${item.version !== 'reforcada' ? 'selected' : ''}>Econômica</option><option value="reforcada" ${item.version === 'reforcada' ? 'selected' : ''}>Reforçada</option></select></label><label class="cart-color-label">Cor<span class="color-select-wrap"><span class="color-swatch" data-color-swatch aria-hidden="true" style="${colorSwatchStyle(item.color)}"></span><select data-field="color" data-key="${escapeHTML(item.key)}">${optionList(productColors(product),item.color,'Selecione uma cor')}</select></span></label><label class="cart-size-label">Tamanho<select data-field="size" data-key="${escapeHTML(item.key)}">${optionList(PRODUCT_SIZES,item.size,'Selecione uma opção')}</select></label></div>`;
      const unitPrice = cartUnitPrice(product,item);
      const selectedFinish = orderOptions?.finishes.find(finish => finish.value === item.finish);
      const unitLabel = orderOptions ? (unitPrice == null ? '' : money(unitPrice)) : product.price == null ? 'Consulte disponibilidade' : `${versionName(item.version)} · ${money(versionPrice(product,item.version))} / un.${product.bundleOffer ? ` · ${product.bundleOffer.quantity} un. por ${money(product.bundleOffer.price * (item.version === 'reforcada' ? 2 : 1))}` : ''}${product.demonstrative !== false ? ' (demonstrativo)' : ''}`;
      return `<article class="cart-item" data-key="${escapeHTML(item.key)}">${image ? `<img src="${escapeHTML(image)}" alt="" loading="lazy" width="96" height="72">` : '<span class="cart-image-placeholder" aria-hidden="true">CM</span>'}<div class="cart-item-main"><div class="cart-item-head"><div><span class="cart-category">${escapeHTML(product.category)}</span><h3>${escapeHTML(product.name)}</h3></div><button class="remove-item" type="button" data-remove="${escapeHTML(item.key)}" aria-label="Remover ${escapeHTML(product.name)}">×</button></div>
        ${cartOptionMarkup}
        <label class="cart-note-label">Observações<textarea data-field="note" data-key="${escapeHTML(item.key)}" rows="2" maxlength="500" placeholder="Personalização ou detalhes">${escapeHTML(item.note)}</textarea></label>
        <div class="cart-item-bottom"><div class="quantity-field"><span>Qtd.</span><div class="quantity-stepper"><button type="button" data-quantity-step="-1" data-key="${escapeHTML(item.key)}" aria-label="Diminuir quantidade de ${escapeHTML(product.name)}">−</button><input data-field="quantity" data-key="${escapeHTML(item.key)}" type="number" min="1" max="99" value="${item.quantity}" aria-label="Quantidade de ${escapeHTML(product.name)}"><button type="button" data-quantity-step="1" data-key="${escapeHTML(item.key)}" aria-label="Aumentar quantidade de ${escapeHTML(product.name)}">+</button></div></div><span class="cart-unit">${escapeHTML(unitLabel)}</span><strong>${subtotal == null ? 'A consultar' : money(subtotal)}${product.demonstrative !== false && subtotal != null ? '¹' : ''}</strong></div></div></article>`;
    }).join('');
    const customHtml = customRequest ? `<article class="cart-item custom-cart-item"><div class="custom-cart-icon">✳</div><div class="cart-item-main"><div class="cart-item-head"><div><span class="cart-category">PERSONALIZADO</span><h3>Projeto personalizado</h3></div><button class="remove-item" type="button" data-remove-custom aria-label="Remover pedido personalizado">×</button></div><p class="custom-summary">${escapeHTML(customRequest.idea || 'Solicitação de avaliação')}${customRequest.dimensions ? ` · ${escapeHTML(customRequest.dimensions)}` : ''}${customRequest.color ? ` · ${escapeHTML(customRequest.color)}` : ''}</p><span class="cart-unit">Valor a definir após avaliação</span></div></article>` : '';
    $('#cartContent').innerHTML = productRows + customHtml;
    const known = cart.every(item => cartSubtotal(getProduct(item.productId),item) != null);
    const total = cart.reduce((sum,item) => sum + (cartSubtotal(getProduct(item.productId),item) || 0), 0);
    const hasDemo = cart.some(item => getProduct(item.productId)?.demonstrative !== false);
    $('#cartTotal').innerHTML = `<span>${known ? 'Total estimado dos produtos' : 'Total parcial dos produtos'}</span><strong>${money(total)}${hasDemo ? '¹' : ''}</strong>${known ? `<small>${hasDemo ? '¹ Preços demonstrativos, sujeitos a confirmação.' : 'Valores cadastrados; confirme disponibilidade e frete pelo WhatsApp.'}</small>` : '<small>Há itens sem preço cadastrado; consulte o orçamento.</small>'}`;
    $('#requestQuote').disabled = false;
  }
  function showToast(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }
  function openInfo(type) {
    const content = $('#infoDialogContent');
    const socialNavigation = $('.footer-socials')?.cloneNode(true);
    socialNavigation?.querySelector('.social-email')?.remove();
    const socialLinks = socialNavigation?.outerHTML || '';
    const whatsappReady = /^\d{12,13}$/.test(CONFIG.WHATSAPP_NUMBER);
    const whatsappDisplay = whatsappReady ? `(${CONFIG.WHATSAPP_NUMBER.slice(2,4)}) ${CONFIG.WHATSAPP_NUMBER.slice(4,9)}-${CONFIG.WHATSAPP_NUMBER.slice(9)}` : 'Número a configurar';
    const whatsappLink = whatsappReady ? `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de falar com a Cubic Maker.')}` : '#';
    const emailMarkup = CONFIG.CONTACT_EMAIL.trim()
      ? `<a href="mailto:${escapeHTML(CONFIG.CONTACT_EMAIL)}">${escapeHTML(CONFIG.CONTACT_EMAIL)}</a>`
      : '<span class="contact-pending">E-mail comercial a configurar</span>';
    const pages = {
      contact: {
        title:'Fale conosco',
        body:`<p>Estamos disponíveis para conversar sobre produtos, pedidos e projetos personalizados.</p><dl class="contact-details"><div><dt>WhatsApp</dt><dd><a href="${whatsappLink}" target="_blank" rel="noopener noreferrer">${escapeHTML(whatsappDisplay)}</a></dd></div><div><dt>E-mail</dt><dd>${emailMarkup}</dd></div></dl><section class="contact-socials"><h3>Acompanhe-nos nas redes sociais</h3>${socialLinks}</section>`
      },
      faq: {
        title:'Perguntas frequentes',
        body:'<ul><li><strong>Como faço um pedido?</strong> Selecione os produtos, escolha as variações e envie sua lista pelo WhatsApp para confirmar o orçamento.</li><li><strong>Os produtos podem ser personalizados?</strong> Envie sua ideia, medidas aproximadas e cor. Cada projeto passa por avaliação de viabilidade.</li><li><strong>Os preços e prazos são finais?</strong> Os exemplos do catálogo são demonstrativos. Disponibilidade, preço e prazo precisam ser confirmados no atendimento.</li><li><strong>Posso pedir algo que não está no catálogo?</strong> Sim, você pode enviar a ideia para avaliação.</li></ul>'
      },
      delivery: {
        title:'Compra e entrega',
        body:'<ol><li>Escolha os produtos e as opções desejadas no catálogo.</li><li>Envie a lista pelo WhatsApp para confirmar disponibilidade, valores e prazo de produção.</li><li>Informe sua localização para consultar as opções de entrega e o valor do frete.</li><li>Confirme as condições do pedido com a Cubic Maker antes da produção.</li></ol><p>O catálogo não conclui pagamentos nem confirma pedidos automaticamente.</p>'
      },
      privacy: {
        title:'Privacidade',
        body:'<p class="privacy-note">A lista de interesse, as ideias personalizadas e os cliques usados para ordenar as tendências ficam no armazenamento local do navegador. Se um serviço compartilhado de tendências for configurado, o site poderá enviar apenas o identificador do produto e o evento de abertura, sem dados pessoais.</p><p>O site não envia a lista de interesse automaticamente. Quando você escolhe solicitar orçamento, o WhatsApp abre com uma mensagem preparada; você revisa e confirma o envio no aplicativo.</p><p>Depois que você abre o WhatsApp, o tratamento das informações segue as práticas e políticas do serviço e as conversas com a Cubic Maker.</p>'
      }
    };
    const page = pages[type];
    if (!page || !content || !infoDialog) return;
    content.innerHTML = `<div class="info-dialog-content"><p class="section-kicker">CUBIC MAKER / INFORMAÇÕES</p><h2 id="infoTitle">${page.title}</h2>${page.body}</div>`;
    infoDialog.showModal();
    $('#closeInfoDialog').focus();
  }
  function openCart() {
    lastFocus = document.activeElement; renderCart(); overlay.hidden = false; cartPanel.inert = false; cartPanel.setAttribute('aria-hidden','false');
    requestAnimationFrame(() => { overlay.classList.add('is-visible'); cartPanel.classList.add('is-open'); $('#closeCart').focus(); });
    document.body.classList.add('has-overlay');
  }
  function closeCart() {
    overlay.classList.remove('is-visible'); cartPanel.classList.remove('is-open'); cartPanel.setAttribute('aria-hidden','true'); cartPanel.inert = true;
    document.body.classList.remove('has-overlay'); setTimeout(() => { if (!cartPanel.classList.contains('is-open')) overlay.hidden = true; }, 250);
    if (lastFocus?.focus) lastFocus.focus();
  }
  function dimensionsMarkup(product) {
    if (!product.dimensions) return '';
    const dimensions = product.dimensions;
    const entries = [
      ['height','Altura'],
      [dimensions.length != null ? 'length' : dimensions.width != null ? 'width' : dimensions.diameter != null ? 'diameter' : null,dimensions.length != null ? 'Comprimento' : dimensions.width != null ? 'Largura' : 'Diâmetro da base'],
      ['depth','Profundidade']
    ].filter(([key]) => key && dimensions[key] != null && Number.isFinite(Number(dimensions[key])));
    if (!entries.length) return '';
    return `<div class="detail-spec"><span>DIMENSÕES</span><strong>${entries.map(([key]) => escapeHTML(dimensions[key])).join(' × ')} mm</strong><small>${entries.map(([,label]) => label).join(' × ')}</small></div>`;
  }
  function galleryMarkup(product) {
    const images = productImages(product);
    if (!images.length) return '<div class="dialog-image"><div class="product-image-placeholder">Imagem não cadastrada</div></div>';
    const thumbs = images.length > 1 ? `<div class="product-gallery-thumbs" aria-label="Outras imagens do produto">${images.map((src,index) => `<button type="button" data-gallery-image="${index}" aria-label="Visualizar imagem ${index + 1} de ${escapeHTML(product.name)}" aria-pressed="${index === 0}"><img src="${escapeHTML(src)}" alt="" loading="lazy" width="96" height="72"></button>`).join('')}</div>` : '';
    const arrows = images.length > 1 ? `<button class="gallery-arrow gallery-arrow-prev" type="button" data-gallery-step="-1" aria-label="Imagem anterior">‹</button><button class="gallery-arrow gallery-arrow-next" type="button" data-gallery-step="1" aria-label="Próxima imagem">›</button>` : '';
    return `<div class="product-gallery"><div class="dialog-image"><img id="dialogMainImage" src="${escapeHTML(images[0])}" alt="${escapeHTML(product.imageAlts?.[0] || product.imageAlt || product.name)}" width="640" height="480">${product.demonstrative !== false ? '<span class="demo-tag">DEMONSTRAÇÃO</span>' : ''}${arrows}</div>${thumbs}</div>`;
  }
  function openDetails(id, selectedVersion = 'economica') {
    const product = getProduct(id); if (!product) return;
    selectedVersion = selectedVersion === 'reforcada' ? 'reforcada' : 'economica';
    trendingOpenerId = trendingTrack?.contains(document.activeElement) ? product.id : null;
    recordProductClick(product.id);
    const priceDetails = product.orderOptions ? '' : product.price == null ? 'Consulte disponibilidade' : `<strong data-detail-unit-price>${money(versionPrice(product,selectedVersion))}</strong>`;
    const categoryLabel = product.demonstrative === false ? escapeHTML(product.category) : `${escapeHTML(product.category)} / PEÇA DEMONSTRATIVA`;
    const dimensionTexts = [...(product.detailContent?.paragraphs || []), ...(product.detailContent?.features || [])];
    const dimensionInDescription = dimensionTexts.some(text => normalizeSearch(text).includes('dimensoes'));
    const specs = `${dimensionInDescription ? '' : dimensionsMarkup(product)}${product.leadTime ? `<div class="detail-spec"><span>PRAZO ESTIMADO</span><strong>${escapeHTML(product.leadTime)}</strong></div>` : ''}`;
    const orderFields = product.orderOptions
      ? `<p class="detail-version-description detail-order-observation">Tamanhos disponíveis: 3 cm, 7,5 cm e 10 cm.<br><br>Para mais quantidades, consulte pelo WhatsApp.</p><div class="dialog-fields"><label><span class="sr-only">Acabamento</span><select name="finish" aria-label="Acabamento" required><option value="" selected hidden>Acabamento</option>${product.orderOptions.finishes.map(finish => `<option value="${escapeHTML(finish.value)}">${escapeHTML(finish.label)}</option>`).join('')}</select></label><label data-sash-field hidden><span class="sr-only">Cor do manto</span><select name="color" aria-label="Cor do manto"><option value="" selected hidden>Cor do manto</option>${product.orderOptions.colors.map(color => `<option value="${escapeHTML(color)}">${escapeHTML(color)}</option>`).join('')}</select></label></div><p class="detail-version-description" data-detail-version-description>Sem cor: o boneco inteiro será branco, sem pintura. Colorido: escolha a cor do manto; somente a faixa muda de cor.</p>`
      : `<div class="dialog-fields"><label>Versão<select name="version"><option value="economica" ${selectedVersion === 'economica' ? 'selected' : ''}>Econômica</option><option value="reforcada" ${selectedVersion === 'reforcada' ? 'selected' : ''}>Reforçada</option></select></label><label>Cor<span class="color-select-wrap"><span class="color-swatch" data-color-swatch aria-hidden="true" style="${colorSwatchStyle()}"></span><select name="color">${optionList(productColors(product),'','Selecione uma cor')}</select></span></label><label>Tamanho<select name="size">${optionList(PRODUCT_SIZES,'','Selecione uma opção')}</select></label></div><p class="detail-version-description" data-detail-version-description>${product.price == null ? 'Valor a consultar conforme a versão escolhida.' : versionDescription(selectedVersion)}</p><a class="version-help-link" href="materiais-e-versoes.html#versoes">Qual é a diferença entre as versões?</a>`;
    const initialSubtotal = product.orderOptions ? '' : product.price == null ? 'Consulte disponibilidade' : `Subtotal: ${money(productSubtotal(product,1,selectedVersion))}`;
    const noteLabel = product.orderOptions ? 'Observações para cotação' : 'Observações ou personalização';
    const notePlaceholder = product.orderOptions ? 'Informe outro tamanho ou quantidade para consultar pelo WhatsApp.' : 'Opcional';
    $('#dialogContent').innerHTML = `<div class="dialog-layout">${galleryMarkup(product)}<div class="dialog-info"><p class="section-kicker">${categoryLabel}</p><h2 id="dialogName">${escapeHTML(product.name)}</h2><div class="dialog-price">${priceDetails}</div>${productDescriptionMarkup(product)}${specs ? `<div class="detail-specs">${specs}</div>` : ''}<form id="detailForm" data-product="${escapeHTML(product.id)}">${orderFields}<label class="dialog-note">${noteLabel}<textarea name="note" rows="2" maxlength="500" placeholder="${notePlaceholder}"></textarea></label><div class="dialog-add-row"><label class="quantity-field">Quantidade<span class="detail-quantity-stepper"><input name="quantity" type="number" min="1" max="99" value="1" aria-label="Quantidade"><span class="quantity-arrow-buttons"><button type="button" data-detail-quantity-step="1" aria-label="Aumentar quantidade">▲</button><button type="button" data-detail-quantity-step="-1" aria-label="Diminuir quantidade">▼</button></span></span></label><output class="detail-quantity-price${product.orderOptions ? ' detail-price-highlight' : ''}" id="detailQuantityPrice" aria-live="polite">${initialSubtotal}</output><button class="button button-dark" type="submit" aria-label="Adicionar ${escapeHTML(product.name)} à sacola">Adicionar</button></div></form></div></div>`;
    if (!dialog.open) dialog.showModal();
    $('#closeDialog').focus();
  }
  function buildWhatsAppMessage() {
    const lines = ['Olá! Gostaria de solicitar um orçamento para os seguintes produtos da Cubic Maker:', ''];
    let itemNumber = 0;
    cart.forEach(item => {
      const product = getProduct(item.productId); if (!product) return;
      itemNumber += 1;
      const subtotal = cartSubtotal(product,item);
      lines.push(`${itemNumber}. ${product.whatsappName || product.name}`, `   Quantidade: ${item.quantity}`);
      if (product.orderOptions) {
        const finish = product.orderOptions.finishes.find(entry => entry.value === item.finish);
        lines.push(`   Tamanho: ${item.size || 'a definir'}`, `   Cor do manto / acabamento: ${finish?.label || 'a definir'}`);
        if (finish?.value === 'colorido') lines.push(`   Cor do manto: ${item.color || 'a definir'}`, '   A cor escolhida altera somente a faixa do manto; as demais partes permanecem conforme o modelo original.');
        if (finish?.value === 'sem-cor') lines.push('   O boneco inteiro será branco, sem pintura.');
        if (item.note.trim()) lines.push(`   Observações para cotação: ${item.note.trim()}`);
        const unitPrice = cartUnitPrice(product,item);
        lines.push(`   Valor unitário: ${unitPrice == null ? 'A consultar' : money(unitPrice)}`, `   Subtotal: ${subtotal == null ? 'A consultar' : money(subtotal)}`);
        lines.push(`   ${product.orderOptions.discountNote}`,'');
        return;
      }
      lines.push(`   Cor: ${item.color || 'a definir'}`, `   Tamanho: ${item.size || 'a definir'}`);
      if (item.note.trim()) lines.push(`   Observações: ${item.note.trim()}`);
      lines.push(`   Versão: ${versionName(item.version)}`);
      lines.push(`   Preço unitário: ${product.price == null ? 'A consultar' : `${money(versionPrice(product,item.version))}${product.demonstrative !== false ? ' (demonstrativo)' : ''}`}`);
      if (product.bundleOffer) lines.push(`   Condição: exatamente ${product.bundleOffer.quantity} unidades por ${money(product.bundleOffer.price * (item.version === 'reforcada' ? 2 : 1))}; outras quantidades a ${money(versionPrice(product,item.version))} por unidade.`);
      lines.push(`   Subtotal: ${subtotal == null ? 'A consultar' : `${money(subtotal)}${product.demonstrative !== false ? ' (demonstrativo)' : ''}`}`, '');
    });
    const known = cart.every(item => cartSubtotal(getProduct(item.productId),item) != null);
    const total = cart.reduce((sum,item) => sum + (cartSubtotal(getProduct(item.productId),item) || 0), 0);
    const hasDemo = cart.some(item => getProduct(item.productId)?.demonstrative !== false);
    if (cart.length) lines.push(`Total estimado dos produtos: ${known ? `${money(total)}${hasDemo ? ' (inclui preços demonstrativos)' : ''}` : `parcial ${money(total)} (há itens a consultar)`}`, '');
    if (customRequest) {
      lines.push(`${itemNumber ? `${itemNumber + 1}. ` : ''}Projeto personalizado`, '   Solicitação de avaliação');
      if (customRequest.idea) lines.push(`   Ideia: ${customRequest.idea}`);
      if (customRequest.dimensions) lines.push(`   Dimensões aproximadas: ${customRequest.dimensions}`);
      if (customRequest.color) lines.push(`   Cor desejada: ${customRequest.color}`);
      lines.push('   Preço: a definir após avaliação', '');
    }
    lines.push('Gostaria de confirmar a disponibilidade, o prazo de produção e o valor do frete.');
    if (cart.some(item => getProduct(item.productId)?.demonstrative !== false)) lines.push('', 'Os valores demonstrativos precisam ser confirmados.');
    lines.push('', 'A abertura do WhatsApp não envia a mensagem automaticamente; confirme o envio no aplicativo.');
    return lines.join('\n');
  }
  function sendWhatsApp() {
    if (!cart.length && !customRequest) { showToast('Adicione produtos à lista antes de solicitar um orçamento.'); return; }
    const incomplete = cart.some(item => {
      const product = getProduct(item.productId);
      return product?.orderOptions && (!item.size || !item.finish || (item.finish === 'colorido' && !item.color));
    });
    if (incomplete) { showToast('Selecione o acabamento e a cor do manto se escolher a opção colorido.'); return; }
    if (!/^\d{12,13}$/.test(CONFIG.WHATSAPP_NUMBER)) { showToast('O número de WhatsApp precisa ser configurado com DDI e DDD.'); return; }
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (isCatalogPage) { renderCategoryGroups(); routeFromHash(); }
  renderCart();
  initTrendingCarousel();
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  if ($('#categoryFilters')) $('#categoryFilters').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (!button) return; openCategory(button.dataset.category); });
  if ($('#catalogQuickSearch')) $('#catalogQuickSearch').addEventListener('submit', event => { event.preventDefault(); searchCatalog($('#catalogQuickSearchInput').value); });
  if ($('#categoryGroups')) $('#categoryGroups').addEventListener('click', event => { const link = event.target.closest('[data-open-category]'); if (link) { event.preventDefault(); openCategory(link.dataset.openCategory); } });
  if ($('#backToCategories')) $('#backToCategories').addEventListener('click', openCatalog);
  if ($('#emptyCategoryRequest')) $('#emptyCategoryRequest').addEventListener('click', () => { const category = categoryBySlug.get(currentCategory); sendCategoryWhatsApp(category?.name || 'Outras ideias'); });
  window.addEventListener('hashchange', routeFromHash);
  [productGrid,trendingTrack].filter(Boolean).forEach(grid => {
    grid.addEventListener('click', event => {
      const add = event.target.closest('[data-add]'); const details = event.target.closest('[data-details]');
      if (add) { const product=getProduct(add.dataset.add); if (product?.orderOptions) openDetails(product.id); else if (product) addProduct(product); }
      if (details) openDetails(details.dataset.details);
    });
  });
  if ($('#searchInput')) $('#searchInput').addEventListener('input', renderProducts);
  if ($('#sortSelect')) $('#sortSelect').addEventListener('change', renderProducts);
  $('#openCart').addEventListener('click', openCart); $('#closeCart').addEventListener('click', closeCart); overlay.addEventListener('click', closeCart);
  $('#cartContent').addEventListener('click', event => { if (event.target.closest('[data-close-cart]')) { closeCart(); if (isCatalogPage) openCatalog(); return; } const step=event.target.closest('[data-quantity-step]'); if (step) { const item=cart.find(entry=>entry.key===step.dataset.key); if (!item) return; item.quantity=Math.min(99,Math.max(1,item.quantity + Number(step.dataset.quantityStep))); saveCart(); renderCart(); return; } const remove=event.target.closest('[data-remove]'); if (remove) { cart=cart.filter(item=>item.key !== remove.dataset.remove); saveCart(); renderCart(); showToast('Produto removido da lista.'); } if (event.target.closest('[data-remove-custom]')) { customRequest=null; saveCart(); renderCart(); showToast('Solicitação personalizada removida.'); } });
  $('#cartContent').addEventListener('change', event => {
    const input=event.target.closest('[data-field]'); if (!input) return;
    const item=cart.find(entry=>entry.key===input.dataset.key); if (!item) return;
    const itemProduct=getProduct(item.productId);
    if (input.dataset.field==='quantity') item.quantity=Math.min(99,Math.max(1,Number.parseInt(input.value,10)||1));
    else item[input.dataset.field]=input.value;
    if (itemProduct?.orderOptions && input.dataset.field === 'finish' && item.finish !== 'colorido') item.color='';
    item.key=itemProduct?.orderOptions ? `${item.productId}::${item.version || 'economica'}::${item.color}::${item.size}::${item.finish || ''}` : `${item.productId}::${item.version || 'economica'}::${item.color}::${item.size}`;
    const duplicate=cart.find(entry=>entry!==item&&entry.key===item.key);
    if (duplicate) { duplicate.quantity=Math.min(99,duplicate.quantity+item.quantity); if (item.note) duplicate.note=item.note; cart=cart.filter(entry=>entry!==item); }
    saveCart(); renderCart();
  });
  $('#cartContent').addEventListener('input', event => { const input=event.target.closest('[data-field="note"]'); if (!input) return; const item=cart.find(entry=>entry.key===input.dataset.key); if (item) { item.note=input.value.slice(0,500); saveCart(); } });
  function sendCategoryWhatsApp(categoryName) {
    if (!/^\d{12,13}$/.test(CONFIG.WHATSAPP_NUMBER)) { showToast('O número de WhatsApp precisa ser configurado com DDI e DDD.'); return; }
    const message = `Olá! Não encontrei um produto pronto na categoria ${categoryName} do catálogo da Cubic Maker. Gostaria de contar minha ideia e consultar a possibilidade de criar uma peça personalizada. Podemos conversar sobre a viabilidade, as opções e o orçamento?`;
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  $('#requestQuote').addEventListener('click', sendWhatsApp); $('#floatingWhatsApp').addEventListener('click', openCart);
  $('#closeDialog').addEventListener('click', () => dialog.close());
  $('#dialogContent').addEventListener('click', event => {
    const thumb = event.target.closest('[data-gallery-image]');
    const arrow = event.target.closest('[data-gallery-step]');
    if (!thumb && !arrow) return;
    const form = $('#detailForm');
    const product = getProduct(form?.dataset.product);
    const images = productImages(product);
    const main = $('#dialogMainImage');
    let index = thumb ? Number(thumb.dataset.galleryImage) : images.findIndex(src => new URL(src, document.baseURI).href === main?.src);
    if (arrow) index = ((index < 0 ? 0 : index) + Number(arrow.dataset.galleryStep) + images.length) % images.length;
    const image = images[index];
    if (!image || !main) return;
    main.src = image;
    main.alt = product?.imageAlts?.[index] || product?.imageAlt || product?.name || '';
    $$('#dialogContent [data-gallery-image]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.galleryImage) === index)));
  });
  $('#dialogContent').addEventListener('input', event => {
    const quantity = event.target.closest('#detailForm [name="quantity"]');
    if (!quantity) return;
    const product = getProduct($('#detailForm')?.dataset.product);
    const value = Number.parseInt(quantity.value, 10);
    const output = $('#detailQuantityPrice');
    if (!product || !output) return;
    if (product.orderOptions) {
      const finish = $('#detailForm [name="finish"]')?.value;
      const size = product.orderOptions.fixedSize;
      const color = $('#detailForm [name="color"]')?.value || '';
      const ready = finish === 'sem-cor' || (finish === 'colorido' && color);
      const unitPrice = ready && size === product.orderOptions.pricedSize ? product.orderOptions.finishes.find(entry => entry.value === finish)?.price : null;
      output.textContent = !Number.isFinite(value) || value < 1 || value > 99 ? 'Informe de 1 a 99 unidades' : unitPrice == null ? '' : `${value > 1 ? 'Total' : 'Valor'}: ${money(unitPrice * value)}`;
      return;
    }
    const version = $('#detailForm [name="version"]')?.value || 'economica';
    output.textContent = product.price == null ? 'Consulte disponibilidade' : Number.isFinite(value) && value > 0 && value <= 99 ? `Subtotal: ${money(productSubtotal(product,value,version))}` : 'Informe de 1 a 99 unidades';
  });
  $('#dialogContent').addEventListener('click', event => {
    const button = event.target.closest('[data-detail-quantity-step]');
    if (!button) return;
    const input = $('#detailForm [name="quantity"]');
    if (!input) return;
    input.value = String(Math.min(99, Math.max(1, (Number.parseInt(input.value,10) || 1) + Number(button.dataset.detailQuantityStep))));
    input.dispatchEvent(new Event('input', { bubbles:true }));
  });
  $('#dialogContent').addEventListener('change', event => {
    const product = getProduct($('#detailForm')?.dataset.product);
    if (product?.orderOptions && event.target.matches('#detailForm [name="finish"], #detailForm [name="color"]')) {
      const finishValue = $('#detailForm [name="finish"]').value;
      const finish = product.orderOptions.finishes.find(entry => entry.value === finishValue);
      const sashField = $('[data-sash-field]');
      const colorSelect = $('#detailForm [name="color"]');
      const showColor = finishValue === 'colorido';
      if (sashField) sashField.hidden = !showColor;
      if (colorSelect) {
        colorSelect.required = showColor;
        if (!showColor) colorSelect.value = '';
      }
      const output = $('#detailQuantityPrice');
      const ready = finishValue === 'sem-cor' || (finishValue === 'colorido' && colorSelect?.value);
      const unitPrice = ready && product.orderOptions.fixedSize === product.orderOptions.pricedSize ? finish?.price : null;
      const quantity = Number.parseInt($('#detailForm [name="quantity"]')?.value,10) || 1;
      if (output) {
        output.textContent = unitPrice == null ? '' : `${quantity > 1 ? 'Total' : 'Valor'}: ${money(unitPrice * quantity)}`;
        output.classList.remove('is-updating');
        if (output.textContent) {
          void output.offsetWidth;
          output.classList.add('is-updating');
          window.clearTimeout(output.priceAnimationTimer);
          output.priceAnimationTimer = window.setTimeout(() => output.classList.remove('is-updating'), 500);
        }
      }
      const unitLabel = $('[data-detail-unit-price]');
      if (unitLabel) unitLabel.textContent = unitPrice == null ? 'Selecione uma opção' : money(unitPrice);
      const choiceNote = $('[data-detail-version-description]');
      if (choiceNote) choiceNote.textContent = finish?.value === 'sem-cor' ? 'Sem cor: o boneco inteiro será branco, sem pintura.' : finish?.value === 'colorido' ? 'Colorido: escolha a cor do manto; somente a faixa muda de cor.' : 'Sem cor: o boneco inteiro será branco, sem pintura. Colorido: escolha a cor do manto; somente a faixa muda de cor.';
      return;
    }
    const version = event.target.closest('#detailForm [name="version"]');
    if (version) {
      const product = getProduct($('#detailForm')?.dataset.product);
      const quantity = Number.parseInt($('#detailForm [name="quantity"]')?.value,10) || 1;
      const unitPrice = $('[data-detail-unit-price]');
      if (product?.price != null && unitPrice) unitPrice.textContent = money(versionPrice(product,version.value));
      const detailDescription = $('[data-detail-version-description]');
      if (detailDescription) detailDescription.textContent = product?.price == null ? 'Valor a consultar conforme a versão escolhida.' : versionDescription(version.value);
      const output = $('#detailQuantityPrice');
      if (output) output.textContent = product?.price == null ? 'Consulte disponibilidade' : `Subtotal: ${money(productSubtotal(product,quantity,version.value))}`;
    }
    const select = event.target.closest('#detailForm [name="color"]');
    if (!select) return;
    const swatch = $('[data-color-swatch]', select.parentElement);
    if (swatch) swatch.style.setProperty('--swatch-color', PRODUCT_COLOR_SWATCHES[select.value] || '#e7e9e3');
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    renderTrendingCarousel();
    if (trendingOpenerId) trendingTrack?.querySelector(`[data-details="${trendingOpenerId}"]`)?.focus();
    trendingOpenerId = null;
  });
  $$('[data-info]').forEach(button => button.addEventListener('click', () => openInfo(button.dataset.info)));
  $('#closeInfoDialog').addEventListener('click', () => infoDialog.close());
  infoDialog.addEventListener('click', event => { if (event.target === infoDialog) infoDialog.close(); });
  dialog.addEventListener('submit', event => { if (event.target.id !== 'detailForm') return; event.preventDefault(); const form=event.target; const product=getProduct(form.dataset.product); if (!product) return; const data=new FormData(form); const quantity=Number.parseInt(data.get('quantity'),10); if (!Number.isFinite(quantity)||quantity<1||quantity>99) { showToast('Informe uma quantidade entre 1 e 99.'); return; } if (product.orderOptions && (!data.get('finish') || (data.get('finish') === 'colorido' && !data.get('color')))) { showToast('Selecione o acabamento e a cor do manto para a opção colorida.'); return; } addProduct(product,{version:data.get('version'),finish:data.get('finish'),color:data.get('color'),size:product.orderOptions?.fixedSize || data.get('size'),quantity,note:data.get('note')}); });
  if ($('#customForm')) $('#customForm').addEventListener('submit', event => { event.preventDefault(); const idea=$('#customIdea').value.trim(); const dimensions=$('#customDimensions').value.trim(); const color=$('#customColor').value.trim(); if (!idea && !dimensions && !color) { $('#customFeedback').textContent='Preencha pelo menos um campo para incluir sua ideia.'; $('#customFeedback').classList.add('form-error'); $('#customIdea').focus(); return; } customRequest={idea,dimensions,color}; saveCart(); renderCart(); $('#customFeedback').textContent='Ideia incluída na sua lista de interesse. Abra a lista para revisar e solicitar orçamento.'; $('#customFeedback').classList.remove('form-error'); showToast('Ideia personalizada adicionada à sua lista.'); $('#openCart').focus(); });
  $('#menuToggle').addEventListener('click', () => { const open=$('#menuToggle').getAttribute('aria-expanded')==='true'; $('#menuToggle').setAttribute('aria-expanded',String(!open)); $('#mobileNav').classList.toggle('is-open',!open); });
  $$('#mobileNav a').forEach(link=>link.addEventListener('click',()=>{ $('#menuToggle').setAttribute('aria-expanded','false'); $('#mobileNav').classList.remove('is-open'); }));
  document.addEventListener('keydown', event => { if (event.key==='Escape' && cartPanel.classList.contains('is-open')) closeCart(); });
})();
