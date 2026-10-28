# Cadastro da página Indicações

Os dados de afiliados ficam em `indications-products.js`, separados de `products.js`, que continua contendo os produtos próprios da Cubic Maker. O layout e os filtros são gerados por `indications.js`.

A página já vem com oito **modelos fictícios** para você visualizar a navegação por categoria, busca e ordenação. Eles usam imagens ilustrativas já existentes no site e têm o campo `affiliateUrl` vazio para você colar o link correto. Nenhum preço é exibido. Substitua as informações e a imagem antes de mudar o status para `'published'`.

## Adicionar um produto

1. Coloque a foto real do produto dentro de `assets/photos/indications/` e prefira WebP otimizado. O caminho da imagem pode ser local ou uma URL HTTPS.
2. Em `window.CUBIC_AFFILIATE_PRODUCTS`, edite um modelo ou acrescente um objeto com `id`, `name`, `description`, `image`, `imageAlt` e `affiliateUrl`.
3. Escolha uma categoria já cadastrada em `window.CUBIC_AFFILIATE_CATEGORIES`. Categorias novas podem ser incluídas nessa lista; a vitrine só mostra categorias com produtos publicados.
4. Use `status: 'draft'` enquanto o conteúdo for um modelo ou ainda estiver incompleto. Defina `status: 'published'` para mostrar o produto real com sua foto e link. Use `status: 'hidden'` para ocultá-lo sem apagar os dados.
5. Cole em `affiliateUrl` o link completo fornecido pelo programa de afiliados. Se ainda estiver vazio ou inválido, o botão “Ver produto” aparece desativado; após preencher uma URL HTTP ou HTTPS válida, ele abre o destino em uma nova aba.
6. Use `internalNotes` apenas para anotações internas; esse campo não é exibido no site.

Exemplo de estrutura (substitua todos os valores antes de publicar; não é um produto real):

```js
{
  id: 'id-unico-do-produto',
  name: 'Nome confirmado do produto',
  description: 'Descrição curta baseada em informações confirmadas.',
  category: 'Casa e Organização',
  image: 'assets/photos/indications/foto-real.webp',
  imageAlt: 'Descrição objetiva da foto',
  affiliateUrl: '', // cole aqui a URL completa do link de afiliada
  status: 'draft',
  internalNotes: ''
}
```

Use a URL completa recebida no programa de afiliados. O site mantém o link e todos os parâmetros de rastreamento exatamente como foram cadastrados. O botão abre a loja em nova aba com `sponsored`, `nofollow` e proteções de abertura; a foto não é um link. Não use um link comum no lugar do link de afiliada.

## Edição, ocultação e remoção

- **Editar:** altere os campos do objeto correspondente. Mantenha o `id` único e não remova parâmetros do link afiliado.
- **Ocultar temporariamente:** altere `status` para `'hidden'`.
- **Remover:** exclua o objeto do array.
- **Preço:** a vitrine não exibe preços, pois eles podem mudar na loja parceira.
- **Categorias:** a ordem e os nomes ficam no array `CUBIC_AFFILIATE_CATEGORIES`; na página só aparecem as categorias que têm produtos publicados.

A pesquisa procura por nome, descrição e categoria. As categorias sem produtos publicados não aparecem. A ordenação por nome aparece quando há pelo menos oito cards, incluindo modelos.
