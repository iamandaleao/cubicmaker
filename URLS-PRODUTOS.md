# URLs individuais de produtos

Cada produto tem uma página estática em `/produtos/{id}/`. O identificador já usado no cadastro (`products.js`) é o slug da URL. O gerador valida formato e duplicidade antes de criar as páginas.

As páginas são cópias do catálogo com metadados individuais e a base dos recursos apontando para a raiz do site. Assim, hospedagens estáticas como GitHub Pages servem `/produtos/{id}/` pelo `index.html` daquela pasta, sem regra de fallback ou configuração adicional de servidor. Ao abrir `catalogo.html` localmente, o modal usa `#produto/{id}` porque navegadores bloqueiam `pushState` em `file://`; no site publicado, usa `/produtos/{id}/`. Para testar as rotas públicas e atualizar uma URL de produto sem fallback, sirva a pasta por HTTP.

O catálogo continua abrindo o modal existente. Ao abrir um produto, o histórico recebe a URL individual; fechar ou usar voltar restaura a URL anterior, e avançar abre o produto novamente. Em acesso direto, o modal abre automaticamente; fechá-lo leva ao catálogo. O modal também oferece “Copiar link do produto”.

## Atualizar as páginas

Depois de alterar os produtos ou seus metadados, rode na raiz do projeto:

```sh
node scripts/generate-product-pages.js
```

O comando atualiza as páginas estáticas e inclui todas as URLs no sitemap. Publique as pastas `produtos/` junto com os demais arquivos do site. Não é necessário configurar rewrite no servidor.
