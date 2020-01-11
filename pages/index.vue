<template>
  <div class="container">
    <FItemList :items="items" @click-video-play="handleClickVideoPlay" />
    <FVideoModal :visible.sync="visibleVideoModal" :video-url.sync="videoUrl" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { itemsModule } from '~/store'
import FItemList from '~/components/FItemList/index.vue'
import FVideoModal from '~/components/FVideoModal/index.vue'

@Component({
  components: {
    FItemList,
    FVideoModal
  },
  async fetch() {
    await itemsModule.init()
  }
})
export default class Index extends Vue {
  private visibleVideoModal = false
  private videoUrl = ''

  get items() {
    return itemsModule.items
  }

  handleClickVideoPlay(id: string) {
    this.visibleVideoModal = true
    this.videoUrl = itemsModule.videoUrlById(id)
  }
}
</script>
