(() => {
  'use strict';

  const root = document.querySelector('#affiliateProductGroups');
  if (!root) return;

  const categoryNav = document.querySelector('#affiliateCategoryNav');
  const searchInput = document.querySelector('#affiliateSearch');
  const clearSearch = document.querySelector('#clearAffiliateSearch');
  const sortWrap = document.querySelector('#affiliateSortWrap');
  const sortSelect = document.querySelector('#affiliateSort');
  const resultsCount = document.querySelector('#affiliateResultsCount');
  const SORT_MIN_PRODUCTS = 8;
  let selectedCategory = '';

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const affiliateUrl = value => {
    try {
      const parsed = new URL(value);
      return ['https:', 'http:'].includes(parsed.protocol) ? String(value) : '';
    } catch {
      return '';
    }
  };
  const imageSource = value => {
    const source = String(value ?? '').trim();
    if (!source || source.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(source) && !/^https:/i.test(source)) return '';
    if (/^https:/i.test(source)) return source;
    return source;
  };
  const allowedCategories = Array.isArray(window.CUBIC_AFFILIATE_CATEGORIES) ? window.CUBIC_AFFILIATE_CATEGORIES : [];
  const seenIds = new Set();
  const products = (Array.isArray(window.CUBIC_AFFILIATE_PRODUCTS) ? window.CUBIC_AFFILIATE_PRODUCTS : [])
    .filter(product => {
      if (!product || !['published', 'draft'].includes(product.status) || !String(product.id || '').trim() || seenIds.has(String(product.id).trim()) || !String(product.name || '').trim() || !String(product.description || '').trim()) return false;
      if (product.status === 'published' && (!imageSource(product.image) || !affiliateUrl(product.affiliateUrl))) return false;
      seenIds.add(String(product.id).trim());
      return true;
    });
  const hasDrafts = products.some(product => product.status === 'draft');

  function renderCategories() {
    const present = new Set(products.map(product => String(product.category || '').trim()).filter(Boolean));
    const ordered = [...allowedCategories.filter(category => present.has(category)), ...[...present].filter(category => !allowedCategories.includes(category))];
    categoryNav.innerHTML = `<button type="button" class="affiliate-category-chip ${selectedCategory ? '' : 'is-active'}" data-category="" aria-pressed="${!selectedCategory}">Todos</button>${ordered.map(category => `<button type="button" class="affiliate-category-chip ${selectedCategory === category ? 'is-active' : ''}" data-category="${escapeHTML(category)}" aria-pressed="${selectedCategory === category}">${escapeHTML(category)}</button>`).join('')}`;
  }

  function productCard(product) {
    if (product.status === 'draft') {
      const draftUrl = affiliateUrl(product.affiliateUrl);
      const draftAction = draftUrl
        ? `<a class="button button-dark affiliate-product-link" href="${escapeHTML(draftUrl)}" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver produto <span aria-hidden="true">↗</span></a>`
        : '<button class="button button-dark affiliate-product-link affiliate-draft-button" type="button" disabled aria-disabled="true" title="Cole o link de afiliada em affiliateUrl para ativar este botão">Ver produto</button>';
      return `<article class="affiliate-product-card affiliate-product-card-draft">
        <div class="affiliate-product-image affiliate-draft-visual"><img src="${escapeHTML(imageSource(product.image) || '')}" alt="${escapeHTML(product.imageAlt || product.name)}" loading="lazy" decoding="async" width="640" height="480"></div>
        <div class="affiliate-product-copy">
          <h3>${escapeHTML(product.name)}</h3>
          <p class="affiliate-product-description">${escapeHTML(product.description)}</p>
          ${draftAction}
        </div>
      </article>`;
    }
    const targetUrl = affiliateUrl(product.affiliateUrl);
    return `<article class="affiliate-product-card">
      <div class="affiliate-product-image"><img src="${escapeHTML(imageSource(product.image))}" alt="${escapeHTML(product.imageAlt || product.name)}" loading="lazy" decoding="async" width="640" height="480"></div>
      <div class="affiliate-product-copy">
        <h3>${escapeHTML(product.name)}</h3>
        <p class="affiliate-product-description">${escapeHTML(product.description)}</p>
        <a class="button button-dark affiliate-product-link" href="${escapeHTML(targetUrl)}" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver produto <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
  }

  function render() {
    const term = normalize(searchInput.value.trim());
    clearSearch.hidden = !term;
    const filtered = products.filter(product => {
      const category = String(product.category || '').trim();
      const matchesCategory = !selectedCategory || category === selectedCategory;
      const searchable = normalize(`${product.name} ${product.description} ${category}`);
      return matchesCategory && (!term || searchable.includes(term));
    });
    const sort = sortSelect.value;
    if (sort === 'name-asc') filtered.sort((a,b) => a.name.localeCompare(b.name,'pt-BR'));
    else if (sort === 'name-desc') filtered.sort((a,b) => b.name.localeCompare(a.name,'pt-BR'));

    resultsCount.textContent = filtered.length ? `${filtered.length} ${filtered.length === 1 ? 'indicação encontrada' : 'indicações encontradas'}` : '';
    if (filtered.length) {
      const notice = hasDrafts ? '<aside class="affiliate-draft-notice"><strong>Modelos para personalizar</strong><span>Os produtos e as descrições são modelos para personalização, e os links de loja ainda estão vazios. Troque as informações antes de publicar.</span></aside>' : '';
      root.innerHTML = `${notice}<div class="affiliate-product-grid">${filtered.map(productCard).join('')}</div>`;
    } else if (!products.length && !term && !selectedCategory) {
      root.innerHTML = '<div class="affiliate-empty"><span aria-hidden="true">✳</span><div><h3>Novas indicações serão adicionadas em breve</h3><p>Estamos preparando esta seleção. Volte em breve para conhecer novos produtos.</p></div></div>';
    } else {
      root.innerHTML = `<div class="affiliate-empty affiliate-no-results"><span aria-hidden="true">⌕</span><div><h3>Nenhum produto encontrado</h3><p>Tente outro termo ou escolha uma categoria diferente.</p><button class="affiliate-reset" type="button" data-reset-filters>Limpar pesquisa e filtros</button></div></div>`;
    }
  }

  sortWrap.hidden = products.length < SORT_MIN_PRODUCTS;
  renderCategories();
  render();

  document.querySelector('#affiliateSearchForm').addEventListener('submit', event => event.preventDefault());
  searchInput.addEventListener('input', render);
  clearSearch.addEventListener('click', () => { searchInput.value = ''; render(); searchInput.focus(); });
  sortSelect.addEventListener('change', render);
  categoryNav.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    selectedCategory = button.dataset.category;
    renderCategories();
    render();
    [...categoryNav.querySelectorAll('[data-category]')].find(item => item.dataset.category === selectedCategory)?.focus();
  });
  root.addEventListener('click', event => {
    if (!event.target.closest('[data-reset-filters]')) return;
    selectedCategory = '';
    searchInput.value = '';
    sortSelect.value = 'featured';
    renderCategories();
    render();
    searchInput.focus();
  });
})();
