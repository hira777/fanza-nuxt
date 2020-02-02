import 'vuex'
import * as SearchSettings from '../store/app/searchSettings'

declare module 'vuex' {
  type RootState = {
    SearchSettings: SearchSettings.S
  }
  type RootGetters = SearchSettings.RG
  type RootMutations = SearchSettings.RM
  type RootActions = SearchSettings.RA
}
