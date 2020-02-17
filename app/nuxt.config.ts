import { Configuration } from '@nuxt/types';

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  env: {
    DEVLOPMENT_API_ORIGIN: process.env.DEVLOPMENT_API_ORIGIN as string,
    PRODUCTION_BASE_URL: process.env.PRODUCTION_BASE_URL as string
  },
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
  modules: ['@nuxtjs/proxy'],
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
