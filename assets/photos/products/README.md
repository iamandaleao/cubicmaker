# Fotos de produtos

Cada produto tem sua própria pasta, nomeada pelo `id` do cadastro em `products.js`.

```text
assets/photos/products/
└── rena-natalina/
    ├── rena-natalina-canelada-grupo-decoracao-natal.webp
    ├── rena-natalina-branca-decoracao-natal.webp
    └── ...
```

## Para cadastrar fotos de outro produto

1. Crie `assets/photos/products/ID-DO-PRODUTO/`, usando o mesmo `id` do produto.
2. Coloque as fotos nessa pasta. Prefira WebP, boa resolução e nomes descritivos em minúsculas, sem acentos ou espaços. Exemplo: `suporte-celular-preto-impressao-3d.webp`.
3. Em `products.js`, no cadastro existente do produto, atualize `image` com a foto principal e `images` com todos os caminhos relativos à raiz do site.
4. Se útil para acessibilidade e busca de imagens, informe `imageAlt` e, para a galeria, `imageAlts` na mesma ordem de `images`.

Exemplo:

```js
image: 'assets/photos/products/suporte-celular/suporte-celular-preto-impressao-3d.webp',
imageAlt: 'Suporte para celular impresso em 3D na cor preta',
images: [
  'assets/photos/products/suporte-celular/suporte-celular-preto-impressao-3d.webp',
  'assets/photos/products/suporte-celular/suporte-celular-lateral-impressao-3d.webp'
]
```

Mantenha um só registro do produto em `products.js`, mesmo quando ele aparecer em várias categorias. Os nomes descritivos ajudam a identificar os arquivos e dão contexto aos mecanismos de busca, mas não garantem posicionamento específico.
