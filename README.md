# Fanza Nuxt

Nuxt.js の学習リポジトリ。

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 参考記事

- [axiosを乗りこなす機能についての知見集](https://qiita.com/terrierscript/items/ccb56b6fc05aa7821c42)
- [Nuxt.jsにBulmaを導入して変数を使ったカスタマイズを行う](https://qiita.com/mnmemo/items/5eb4fb8cbfe17670fd36)
- [Nuxt.jsとServerlessでdotenvを共有する](https://qiita.com/kai_kou/items/4eb83f92296a7311fe39)
- [Nuxt.js で SSR 時にも永続化された store の値を使う](https://qiita.com/nyk510/items/d184be3724c52713ac90)

## メモ

- `fetch`などの Nuxt.js 独自のメソッドは[nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator)を利用しないと型推論されない。
  - 参考: [asyncData and fetch is not working on TypeScript #5330](https://github.com/nuxt/nuxt.js/issues/5330)
- Scss などで定義した変数や mixin をグローバルなものとしてコンポーネントで利用したい場合は[style-resources-module](https://github.com/nuxt-community/style-resources-module)を利用する。
- [vue-property-decoratorで`Property 'title' has no initializer and is not definitely assigned in the constructor.`みたいなエラーの対処法](https://github.com/kaorun343/vue-property-decorator/issues/81#issuecomment-399997760)

## 未解決問題

- [x] `nuxt-link`の挙動を`script`内で再現することは可能？`location.href`で対応したがこれであってる？
  - `this.$router.push`を使えば OK なはず。
- [ ] [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators)で定義した Store のテスト方法がわからない。