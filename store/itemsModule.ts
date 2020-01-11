import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { itemListService } from '~/api/itemList'
import { ItemList } from '~/api/types'

// 商品検索 API のレスポンスの一部である商品情報を正規化したもの
type Item = {
  id: string
  title: string
  url: string
  imageUrl: {
    list: string
    small: string
    large: string
  }
  sampleMovieUrl: {
    xsmall: string
    small: string
    medium: string
    large: string
  } | null
  price: string // "¥250〜" のような文字列
  date: string
}

export type Items = Item[] | []

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
      sampleMovieUrl: item.sampleMovieURL
        ? {
            xsmall: item.sampleMovieURL.size_476_306,
            small: item.sampleMovieURL.size_560_360,
            medium: item.sampleMovieURL.size_644_414,
            large: item.sampleMovieURL.size_720_480
          }
        : null,
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
