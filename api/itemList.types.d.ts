/* eslint camelcase: 0 */

// ソート順。 rank: 人気, price: 価格が高い順, -price: 価格が安い順, date: 新着, review: 評価, match: マッチング順
type Sort = 'rank' | 'price' | '-price' | 'date' | 'review' | 'match'

// 絞り込み項目。 actress: 女優, author: 作者, genre: ジャンル, series: シリーズ, maker: メーカー
type Article = 'actress' | 'author' | 'genre' | 'series' | 'maker'

// 在庫絞り込み。 stock: 在庫あり, reserve: 予約受付中, mono: DMM通販のみ, dmp: マーケットプレイスのみ
type Stock = 'stock' | 'reserve' | 'mono' | 'dmp'

export type RequestParameter = {
  hits?: number // 取得件数（最大100）
  offset?: number // 検索開始位置
  sort?: Sort // ソート順
  keyword?: string // キーワード
  cid?: string // 商品ID
  article?: Article // 絞りこみ項目
  article_id?: string // 絞り込みID
  gte_date?: string // 発売日絞り込み（指定した日付以降に発売された商品を取得できる）
  lte_date?: string // 発売日絞り込み（指定した日付以前に発売された商品を取得できる）
  mono_stock?: Stock // 在庫絞り込み
  output?: 'json' | 'xml' // 出力形式
  callback?: string // コールバック
}

// 配信タイプ
type DeliveryType = 'hd' | 'download' | 'stream' | 'androiddl' | 'iosdl'

export type Delivery = {
  type: DeliveryType
  price: string
}

// 商品検索 API のレスポンスの一部である商品情報
export type ItemData = Readonly<{
  service_code: string
  service_name: string
  floor_code: string
  floor_name: string
  category_name: string
  content_id: string
  product_id: string
  title: string
  volume: string
  review: {
    count: number
    average: string
  }
  URL: string
  URLsp: string
  affiliateURL: string
  affiliateURLsp: string
  imageURL: {
    list: string
    small: string
    large: string
  }
  sampleImageURL: {
    sample_s: {
      image: string[]
    }
  }
  sampleMovieURL?: {
    size_476_306: string
    size_560_360: string
    size_644_414: string
    size_720_480: string
    pc_flag: number
    sp_flag: number
  }
  prices: {
    price: string
    deliveries: {
      delivery: Delivery[]
    }
  }
  date: string
  iteminfo: {
    genre: {
      id: number
      name: string
    }[]
    maker: {
      id: number
      name: string
    }[]
    actress: {
      id: number
      name: string
      ruby: string
    }[]
    director: {
      id: number
      name: string
      ruby: string
    }[]
    label: {
      id: number
      name: string
    }[]
  }
}>

export type Response = Readonly<{
  result: {
    status: number // ステータスコード
    result_count: number // 取得件数
    total_count: number // 全体件数
    first_position: number // 検索開始位置
    items: ItemData[]
  }
}>
