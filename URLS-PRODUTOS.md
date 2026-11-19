# URLs individuais de produtos

As URLs canônicas usam `/catalogo/{id}` sem `.html` nem fragmento. O identificador é o slug cadastrado em `products.js`.

## Hospedagem

O repositório aponta para GitHub (`origin`), contém `CNAME` para `cubicmaker.com` e não contém regras de Apache, Nginx, Netlify ou Vercel. A consulta pública ao domínio mostrou respostas do GitHub Pages por trás de Cloudflare. Por isso, as rotas são publicadas como arquivos estáticos: `catalogo/index.html` atende `/catalogo` e `catalogo/{id}/index.html` atende cada produto. Não é necessário fallback SPA nem regra de rewrite.

O Pages pode normalizar uma URL de diretório para incluir `/` no primeiro acesso. O JavaScript troca a barra final pela URL canônica sem recarregar a página. A página `/catalogo.html` permanece disponível para links antigos e é normalizada para `/catalogo` no navegador.

## Compatibilidade

Links antigos no formato `/catalogo.html#produto/{id}` são reconhecidos e substituídos pela rota nova ao abrir. As páginas estáticas antigas `/produtos/{id}/` também permanecem geradas e migram para `/catalogo/{id}` no navegador. Ambas usam canonical novo.

Ao abrir o catálogo diretamente como arquivo local (`file://`), o modal ainda funciona, mas a URL não muda: navegadores bloqueiam a History API para rotas diferentes nesse modo. Para testar as rotas limpas, histórico e atualização direta, sirva os arquivos por HTTP.

## Atualizar as páginas

Depois de alterar os produtos ou seus metadados, execute na raiz do projeto:

```sh
node scripts/generate-product-pages.js
```

O comando gera o índice do catálogo, as páginas canônicas e os aliases legados, além de atualizar o sitemap. Publique `catalogo/`, `produtos/`, `catalogo.html` e os arquivos atualizados do site no branch/origem do GitHub Pages.
