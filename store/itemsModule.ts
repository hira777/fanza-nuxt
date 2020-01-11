import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { itemListService } from '~/api/itemList'
import { ItemList, ItemData } from '~/api/types'

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

function getSampleMovieUrl(item: ItemData) {
  return item.sampleMovieURL !== undefined &&
    item.title.match(/【VR】/) === null
    ? item.sampleMovieURL.size_644_414 + `affi_id=${process.env.AFFILIATE_ID}/`
    : null
}

function formatWithComma(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

function normalize(itemList: ItemList): Items {
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

@Module({
  name: 'itemsModule',
  stateFactory: true,
  namespaced: true
})
export default class ItemsModule extends VuexModule {
  private _items: Items = []

  get items() {
    return this._items
  }

  get videoUrlById() {
    return (id: string) => {
      const item = this.items.find((item) => item.id === id)
      if (!item || !item.sampleMovieUrl) return ''
      return item.sampleMovieUrl
    }
  }

  @Action({ commit: 'SET_ITEMS' })
  async init(): Promise<{ items: Items } | void> {
    const resposnse = await itemListService.get()
    return { items: normalize(resposnse.data.result.items) }
  }

  @Action({ commit: 'SET_ITEMS' })
  async keywordUpdate(keyword: string): Promise<{ items: Items } | void> {
    const resposnse = await itemListService.get({ keyword })
    return { items: normalize(resposnse.data.result.items) }
  }

  @Mutation
  ['SET_ITEMS']({ items }: { items: Items }): void {
    this._items = items
  }
}
