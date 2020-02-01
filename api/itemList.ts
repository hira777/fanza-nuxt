import service from '~/utils/request'
import Item, { Article, Stock, Sort } from '~/types/item'

/* eslint camelcase: 0 */
export type RequestParameters = {
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

export type Response = Readonly<{
  result: {
    status: number // ステータスコード
    result_count: number // 取得件数
    total_count: number // 全体件数
    first_position: number // 検索開始位置
    items: Item[]
  }
}>

const get = (params?: RequestParameters) => {
  return service.request<Response>({
    url: '/ItemList',
    method: 'get',
    params
  })
}

export const itemListService = {
  get
}
