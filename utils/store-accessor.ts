import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ItemsModule from '~/store/entities/itemsModule'

/* eslint import/no-mutable-exports: 0 */
let itemsModule: ItemsModule

function initializeStores(store: Store<any>): void {
  itemsModule = getModule(ItemsModule, store)
}

export { initializeStores, itemsModule }
