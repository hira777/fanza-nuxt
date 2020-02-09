yarn clean
mkdir -p dist
cd app;yarn build;cd -;
cd functions;yarn build;cd -;

# サーバーファイルをデプロイするディレクトリにコピー
cp -R functions dist/server
cp -R app/.nuxt dist/server/

# クライアントファイル（静的ファイル）をデプロイするディレクトリにコピー
cp -R app/static dist/client
cp -R app/.nuxt/dist/client/* dist/client/