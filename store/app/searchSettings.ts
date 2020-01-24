import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Cookie from 'cookie-universal'
const cookies = Cookie()

export type ResultsPerPage = 20 | 40 | 80

interface SearchSettingsState {
  _resultsPerPage: ResultsPerPage
  _resultsPerPages: ResultsPerPage[]
}

@Module({
  name: 'app/searchSettings',
  stateFactory: true,
  namespaced: true
})
export default class SearchSettings extends VuexModule
  implements SearchSettingsState {
  public _resultsPerPage = 20 as ResultsPerPage
  public _resultsPerPages = [20, 40, 80] as ResultsPerPage[]

  get resultsPerPage() {
    return this._resultsPerPage
  }

  get resultsPerPages() {
    return this._resultsPerPages
  }

  @Action
  init(resultsPerPage: ResultsPerPage) {
    this.context.commit('SET_RESULTS_PER_PAGE', resultsPerPage)
  }

  @Action
  setCookieToResultsPerPage(resultsPerPage: ResultsPerPage) {
    cookies.set('resultsPerPage', String(resultsPerPage))
  }

  @Action
  setResultsPerPage(resultsPerPage: ResultsPerPage) {
    this.context.commit('SET_RESULTS_PER_PAGE', resultsPerPage)
    cookies.set('resultsPerPage', String(resultsPerPage))
  }

  @Mutation
  ['SET_RESULTS_PER_PAGE'](resultsPerPage: ResultsPerPage): void {
    this._resultsPerPage = resultsPerPage
  }
}
