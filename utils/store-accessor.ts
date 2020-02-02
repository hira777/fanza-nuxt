import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Items from '~/store/entities/items'

/* eslint import/no-mutable-exports: 0 */
let itemsModule: Items

function initializeStores(store: Store<any>): void {
  itemsModule = getModule(Items, store)
}

export { initializeStores, itemsModule }
