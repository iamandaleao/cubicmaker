# URLs do catálogo

O site usa rotas limpas para catálogo, listagem, categorias e produtos:

- `/catalogo` abre as categorias.
- `/catalogo/nossos-produtos` abre a lista completa.
- `/catalogo/nossos-produtos/{slug-da-categoria}` abre uma categoria, por exemplo `/catalogo/nossos-produtos/natal`.
- `/catalogo/{slug-do-produto}` abre o modal do produto.

Os slugs de produtos e categorias vêm dos dados existentes em `products.js`. A navegação interna usa History API; abrir um modal cria uma entrada para o produto, fechar retorna ao caminho anterior e voltar/avançar restaura o modal quando aplicável. O botão “Copiar link do produto” copia a URL individual canônica.

## Hospedagem

O repositório aponta para GitHub (`origin`), contém `CNAME` para `cubicmaker.com` e não inclui regras de Apache, Nginx, Netlify ou Vercel. A consulta pública ao domínio indicou GitHub Pages atrás de Cloudflare. Por isso, as rotas são publicadas como arquivos estáticos: `catalogo/index.html`, `catalogo/nossos-produtos/index.html`, `catalogo/nossos-produtos/{categoria}/index.html` e `catalogo/{produto}/index.html`. Não é necessário configurar rewrite no servidor. A hospedagem precisa receber esses diretórios e seus `index.html` no deploy.

O GitHub Pages serve o `index.html` da raiz quando `/` é acessado. Os links de retorno à página inicial usam `/` e não acrescentam `#inicio`. O GitHub Pages não oferece regra de servidor no repositório para emitir um 301 de `/index.html` para `/`; como o domínio ativo passa pelo proxy da Cloudflare, esse redirecionamento precisa ser criado como uma Single Redirect no painel Cloudflare, com expressão `http.request.uri.path eq "/index.html"`, destino `https://cubicmaker.com/`, status `301` e “Preserve query string” habilitado. A resposta atual de `/index.html` ainda é `200` até essa regra ser ativada.

O domínio citado na solicitação, `cubicmaker.com.br`, não corresponde à configuração encontrada: o arquivo `CNAME` e o domínio que respondeu na consulta são `cubicmaker.com`; `cubicmaker.com.br` não resolveu DNS no teste. Não alterei o CNAME nem os endereços canônicos para evitar apontar o site publicado para um domínio que não está configurado. Se o `.com.br` for o domínio que deve ficar ativo, configure-o primeiro no DNS e em GitHub Pages/Cloudflare; depois ajuste o destino da regra de redirecionamento para `https://cubicmaker.com.br/`.

O servidor pode acrescentar uma barra final ao servir um diretório. O JavaScript normaliza a URL visível para o formato sem barra final. A página antiga `/catalogo.html` continua disponível.

## Links antigos e prévia local

Links antigos como `/catalogo.html#produto/{slug}`, `/catalogo.html#produtos` e `/catalogo.html#catalogo/{categoria}` são reconhecidos e migrados para as rotas limpas. As páginas legadas `/produtos/{slug}/` também continuam geradas e apontam para a rota canônica nova.

Para testar acesso direto, atualização e History API, sirva a pasta por HTTP. Em `file://`, o navegador bloqueia alterações de caminho via History API; a interface local continua podendo ser aberta, mas não reproduz as URLs limpas do site publicado.

## Gerar as páginas estáticas

Após alterar produtos ou categorias em `products.js`, execute na raiz do projeto:

```sh
node scripts/generate-product-pages.js
```

O comando gera o índice, a lista de produtos, páginas das categorias, páginas canônicas de produto, aliases legados e o `sitemap.xml`.
