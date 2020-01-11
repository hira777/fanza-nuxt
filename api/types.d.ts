/* eslint camelcase: 0 */

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

export type ItemList = ItemData[]
