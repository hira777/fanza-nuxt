import { Configuration } from '@nuxt/types';

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  build: {
    extend(config, { isDev }) {
      // HTML に記述されるビルドしたファイルの読み込み先
      // デフォルトは /_nuxt/ のため、出力される HTML の JS 読み込み記述は
      // <script src="/_nuxt/453c824980dc69aaff2f.js" defer> になる。
      // そのため / にすれば、出力される HTML の JS 読み込み記述は
      // <script src="/453c824980dc69aaff2f.js" defer> になる。
      // デプロイする場所（ディレクトリの階層）に応じた設定をしないと
      // ビルドされた JS などが読み込まれず、アプリケーションが動作しないため注意。
      config.output!.publicPath = isDev ? '/_nuxt/' : '/';
    }
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxt/typescript-build'
  ],
  modules: ['@nuxtjs/axios'],
  axios: {
    // Axios module を利用すれば @nuxtjs/proxy も利用できる。
    // そのため、proxy を true にすれば、@nuxtjs/proxy のオプションも指定できるようになる。
    proxy: true,
    debug: isDevelopment,
    // サーバーで実行される Axios module のデフォルトの baseURL は http://localhost:3000
    // ローカルでの開発では問題ないが、本番環境などの他の環境では動作しないため適宜変更する必要がある。
    baseURL: isDevelopment
      ? 'http://localhost:3000/api'
      : `${process.env.PRODUCTION_BASE_URL}/api}`,
    browserBaseURL: '/api'
  },
  stylelint: {
    fix: true
  }
};

if (isDevelopment) {
  config.proxy = {
    // target が https://example.com で
    // アプリケーション上で http://localhost:3000/api/users にリクエストした場合
    // https://example.com/ssr/api/users に置き換わる
    '/api': {
      target: process.env.DEVLOPMENT_API_ORIGIN,
      pathRewrite: {
        '^/api/': '/ssr/api/'
      }
    }
  };
}

export default config;
