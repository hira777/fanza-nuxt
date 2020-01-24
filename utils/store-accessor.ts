import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import SearchSettings from '~/store/app/searchSettings'
import Items from '~/store/entities/items'

/* eslint import/no-mutable-exports: 0 */
let itemsModule: Items
let searchSettingsModule: SearchSettings

function initializeStores(store: Store<any>): void {
  itemsModule = getModule(Items, store)
  searchSettingsModule = getModule(SearchSettings, store)
}

export { initializeStores, itemsModule, searchSettingsModule }
