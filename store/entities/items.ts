/* eslint camelcase: 0 */
// import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Getters, Mutations, Actions } from 'vuex'

import ItemData from 'types/item'
import { itemListService, RequestParameters } from '~/api/itemList'

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

function getSampleMovieUrl(item: ItemData) {
  return item.sampleMovieURL !== undefined &&
    item.title.match(/【VR】/) === null
    ? item.sampleMovieURL.size_644_414 + `affi_id=${process.env.AFFILIATE_ID}/`
    : null
}

function formatWithComma(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

function normalize(itemList: ItemData[]): Item[] {
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

export type S = {
  items: Item[]
  totalCount: number
}

export type G = {
  all: Item[]
  totalCount: number
  videoUrlById: (id: string) => string
}

export type RG = {
  'entities/items/all': G['all']
  'entities/items/totalCount': G['totalCount']
  'entities/items/videoUrlById': G['videoUrlById']
}

export type M = {
  setItems: Item[]
  setTotalCount: number
}

export type RM = {
  'entities/items/setItems': M['setItems']
  'entities/items/setTotalCount': M['setItems']
}

export type A = {
  search: RequestParameters
}

export type RA = {
  'entities/items/search': A['search']
}

export const state = (): S => ({
  items: [],
  totalCount: 0
})

export const getters: Getters<S, G> = {
  all: (state) => state.items,
  totalCount: (state) => state.totalCount,
  videoUrlById: (state) => (id: string) => {
    const item = state.items.find((item) => item.id === id)
    if (!item || !item.sampleMovieUrl) return ''
    return item.sampleMovieUrl
  }
}

export const mutations: Mutations<S, M> = {
  setItems(state, payload) {
    state.items = payload
  },
  setTotalCount(state, payload) {
    state.totalCount = payload
  }
}

export const actions: Actions<S, A, G, M> = {
  async search({ commit }, params: RequestParameters) {
    const resposnse = await itemListService.get(params)
    const { total_count, items } = resposnse.data.result

    commit('setTotalCount', total_count)
    commit('setItems', normalize(items))
  }
}
