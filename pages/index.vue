<template>
  <div class="container">
    <FItemList :items="items" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { itemsModule } from '~/store'
import FItemList from '~/components/FItemList/index.vue'

@Component({
  components: {
    FItemList
  }
})
export default class Index extends Vue {
  get items() {
    return itemsModule.items
  }

  async fetch() {
    await itemsModule.init()
  }
}
</script>
