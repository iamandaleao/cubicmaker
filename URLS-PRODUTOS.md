# URLs do catálogo

O site usa rotas limpas para catálogo, listagem, categorias e produtos:

- `/catalogo` abre as categorias.
- `/catalogo/nossos-produtos` abre a lista completa.
- `/catalogo/nossos-produtos/{slug-do-produto}` abre um produto iniciado pela lista completa, preservando “Nossos Produtos” na URL.
- `/catalogo/{slug-da-categoria}` abre uma categoria, por exemplo `/catalogo/natal`.
- `/catalogo/{slug-da-categoria}/{slug-do-produto}` abre o modal preservando a categoria. Exemplo: `/catalogo/lembrancinhas/{produto}`.

Os slugs de produtos e categorias vêm dos dados existentes em `products.js`. Ao abrir um produto numa categoria, a URL mantém a categoria e acrescenta o slug do produto. Na lista geral e em áreas sem categoria ativa, usa a categoria principal cadastrada para o produto. A navegação usa History API; fechar o modal retorna ao caminho anterior e voltar/avançar restaura o modal quando aplicável. Se uma atualização fizer o servidor normalizar a URL e perder o estado da History API, o caminho anterior fica temporariamente salvo na sessão.

## Hospedagem

O repositório aponta para GitHub (`origin`), contém `CNAME` para `cubicmaker.com` e não inclui regras de Apache, Nginx, Netlify ou Vercel. Como o site é estático no GitHub Pages, as rotas são publicadas como arquivos: `catalogo/index.html`, `catalogo/nossos-produtos/index.html`, `catalogo/nossos-produtos/{produto}/index.html`, `catalogo/{categoria}/index.html` e `catalogo/{categoria}/{produto}/index.html`. As rotas antigas de categoria sob `catalogo/nossos-produtos/{categoria}` continuam como aliases legados. Também são mantidos aliases de produto em `catalogo/{produto}/index.html` e `produtos/{produto}/index.html`. Não é necessário configurar rewrite no servidor; os arquivos gerados precisam ser enviados junto com o deploy.

O GitHub Pages serve o `index.html` da raiz quando `/` é acessado. Os links de retorno à página inicial usam `/` e não acrescentam `#inicio`. O GitHub Pages não oferece regra de servidor no repositório para emitir um 301 de `/index.html` para `/`; como o domínio ativo passa pelo proxy da Cloudflare, esse redirecionamento precisa ser criado como uma Single Redirect no painel Cloudflare, com expressão `http.request.uri.path eq "/index.html"`, destino `https://cubicmaker.com/`, status `301` e “Preserve query string” habilitado. A resposta atual de `/index.html` ainda é `200` até essa regra ser ativada.

O servidor pode acrescentar uma barra final ao servir um diretório. O JavaScript normaliza a URL visível para o formato sem barra final. A página antiga `/catalogo.html` continua disponível.

## Links antigos e prévia local

Links antigos como `/catalogo.html#produto/{slug}`, `/catalogo.html#produtos` e `/catalogo.html#catalogo/{categoria}` são reconhecidos e migrados para as rotas limpas. As páginas legadas `/produtos/{slug}/` também continuam geradas e apontam para a rota canônica nova.

Para testar acesso direto, atualização e History API, sirva a pasta por HTTP. Em `file://`, o navegador bloqueia alterações de caminho via History API; a interface local continua podendo ser aberta, mas não reproduz as URLs limpas do site publicado.

## Gerar as páginas estáticas

Após alterar produtos ou categorias em `products.js`, execute na raiz do projeto:

```sh
node scripts/generate-product-pages.js
```

O comando gera o índice, a lista de produtos, páginas das categorias, páginas de produto dentro de cada categoria cadastrada, aliases legados e o `sitemap.xml`.
