# Fanza Nuxt

## Cloud Functions for Firebase に環境変数を設定

DMM.com API を利用している関数があるため、以下のように API ID と アフィリエイトID を設定する必要がある。

```bash
$ firebase functions:config:set fanza_api.id=[API 利用登録時に提供されたID]
$ firebase functions:config:set fanza_api.affiliate_id=[アフィリエイトID]
```

設定が成功すれば`firebase functions:config:get`で確認できる。

## Cloud Functions for Firebase の環境変数をローカルでも利用する

Cloud Functions エミュレータを利用時にも、設定した環境変数を利用したい場合は、`.runtimeconfig.json`を用意する必要がある。

`functions`ディレクトリで以下のコマンドを実行すれば、自分が設定した環境変数が書かれた`.runtimeconfig.json`が出力される。

```bash
$ firebase functions:config:get > .runtimeconfig.json
```