import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { itemListService } from '~/api/itemList'
import { ItemData, RequestParameter } from '~/api/itemList.types'

function getSampleMovieUrl(item: ItemData) {
  return item.sampleMovieURL !== undefined &&
    item.title.match(/【VR】/) === null
    ? item.sampleMovieURL.size_644_414 + `affi_id=${process.env.AFFILIATE_ID}/`
    : null
}

function formatWithComma(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

function normalize(itemList: ItemData[]): Items {
  return itemList.map((item) => {
    return {
      id: item.content_id,
      title: item.title,
      url: item.URL,
      imageUrl: {
        list: item.imageURL.list,
        small: item.imageURL.small,
        large: item.imageURL.large
      },
      sampleMovieUrl: getSampleMovieUrl(item),
      price: '¥' + formatWithComma(parseInt(item.prices.price, 10)) + '~',
      date: item.date
    }
  })
}

// 商品検索 API のレスポンスの一部である商品情報を正規化したもの
export type Item = {
  id: string
  title: string
  url: string
  imageUrl: {
    list: string
    small: string
    large: string
  }
  sampleMovieUrl: string | null
  price: string // "¥250〜" のような文字列
  date: string
}

export type Items = Item[] | []

interface ItemsState {
  items: Items
  totalCount: number
}

@Module({
  name: 'entities/itemsModule',
  stateFactory: true,
  namespaced: true
})
export default class ItemsModule extends VuexModule implements ItemsState {
  public items: Items = []
  public totalCount: number = 0

  get all() {
    return this.items
  }

  get count() {
    return this.items.length
  }

  get videoUrlById() {
    return (id: string) => {
      const item = this.items.find((item) => item.id === id)
      if (!item || !item.sampleMovieUrl) return ''
      return item.sampleMovieUrl
    }
  }

  @Action
  async init(params: RequestParameter) {
    await this.update(params)
  }

  @Action
  keywordUpdate(params: RequestParameter) {
    this.update(params)
  }

  @Action
  async update(params: RequestParameter) {
    const resposnse = await itemListService.get(params)
    const { total_count, items } = resposnse.data.result

    this.context.commit('SET_TOTAL_COUNT', total_count)
    this.context.commit('SET_ITEMS', normalize(items))
  }

  @Mutation
  ['SET_ITEMS'](items: Items): void {
    this.items = items
  }

  @Mutation
  ['SET_TOTAL_COUNT'](count: number): void {
    this.totalCount = count
  }
}
