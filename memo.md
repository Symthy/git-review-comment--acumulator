# memo

## Apollo Client

[useQuery と useLazyQuery の違い](https://maku.blog/p/m7ju6gr/#usequery-%E3%81%A8-uselazyquery-%E3%81%AE%E9%81%95%E3%81%84)

### Apollo Multi Client

react-apollo-multiple-clients よりは ApolloLink を使うのが良さそう。

- ★ [Next.js + Multiple Apollo Clients & GraphQL Sources](https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/)

- [stackoverflow - react hooks で graphql フックを使用して複数のクライアントを統合する方法](https://stackoverflow.com/questions/59981062/how-to-integrate-multiple-clients-using-graphql-hooks-in-react-hooks)
- [react-apollo-multiple-clients](https://www.npmjs.com/package/@titelmedia/react-apollo-multiple-clients)

- [Apollo Multiple Clients with React?](https://medium.com/open-graphql/apollo-multiple-clients-with-react-b34b571210a5)

## VITE

環境変数：https://ja.vitejs.dev/guide/env-and-mode.html#env-files

## GraphQL Code Generator

2.13? で依存関係等に手が入ったらしく手順が変わった模様

```
npm i graphql
npm i -D typescript
npm i -D @graphql-codegen/cli
npm i -D @graphql-codegen/client-preset
```

```
npx graphql-code-generator init
```

※ @graphql-codegen/client-preset を入れているのに無いといわれた。恐らく他パッケージと競合して認識できなくなった？
以下を実行すると治りはした

```
npm audit fix --force  // criticalが数件出たため以下も実行
npm audit fix
```

公式サンプル: https://github.com/dotansimha/graphql-code-generator/tree/master/examples/front-end/react/apollo-client

## その他

[Vite 環境で index.html から環境変数を参照する](https://dev.classmethod.jp/articles/vite-index-html-read-env-variables/)

https://nextui.org/

https://stitches.dev/docs/introduction
