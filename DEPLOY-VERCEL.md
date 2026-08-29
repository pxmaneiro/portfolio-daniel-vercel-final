# Publicação na Vercel

Este projeto é um site estático. Não é necessário instalar dependências para publicar o portfólio principal.

## Pelo painel da Vercel

1. Crie um repositório no GitHub e envie o conteúdo desta pasta.
2. Na Vercel, clique em `Add New Project`.
3. Importe o repositório.
4. Não defina comando de build.
5. O diretório raiz deve ser esta pasta, onde estão `index.html` e `vercel.json`.
6. Publique.

## Pelo terminal

Com a Vercel CLI instalada:

```bash
vercel
```

Depois, para produção:

```bash
vercel --prod
```

Não existe variável de ambiente obrigatória para o portfólio.

Depois de publicar, substitua qualquer URL ainda provisória pelos links definitivos do domínio escolhido.
