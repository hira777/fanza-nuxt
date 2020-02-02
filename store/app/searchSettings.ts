import { Getters, Mutations, Actions } from 'vuex'

export type ResultsPerPage = 20 | 40 | 80

export type S = {
  resultsPerPage: ResultsPerPage
  resultsPerPages: ResultsPerPage[]
}

export type G = {
  resultsPerPage: ResultsPerPage
  resultsPerPages: ResultsPerPage[]
}

export type RG = {
  'app/searchSettings/resultsPerPage': G['resultsPerPage']
  'app/searchSettings/resultsPerPages': G['resultsPerPages']
}

export type M = {
  setResultsPerPage: ResultsPerPage
}

export type RM = {
  'app/searchSettings/setResultsPerPage': M['setResultsPerPage']
}

export type A = {
  setResultsPerPage: ResultsPerPage
  setCookieToResultsPerPage: ResultsPerPage
}

export type RA = {
  'app/searchSettings/setResultsPerPage': A['setResultsPerPage']
  'app/searchSettings/setCookieToResultsPerPage': A['setCookieToResultsPerPage']
}

export const state = (): S => ({
  resultsPerPage: 20,
  resultsPerPages: [20, 40, 80]
})

export const getters: Getters<S, G> = {
  resultsPerPage: (state) => state.resultsPerPage,
  resultsPerPages: (state) => state.resultsPerPages
}

export const mutations: Mutations<S, M> = {
  setResultsPerPage(state, payload) {
    state.resultsPerPage = payload
  }
}

export const actions: Actions<S, A, G, M> = {
  setResultsPerPage({ commit }, resultsPerPage: ResultsPerPage) {
    commit('setResultsPerPage', resultsPerPage)
  },
  setCookieToResultsPerPage(_, resultsPerPage: ResultsPerPage) {
    // TODO: 型エラーの解消方法（this.$cookies に型を定義する方法）がわからない
    // @ts-ignore
    this.$cookies.set('resultsPerPage', String(resultsPerPage))
  }
}
