<template>
  <div class="container">
    <FItemList :items="items" @click-video-play="handleClickVideoPlay" />
    <FVideoModal :visible.sync="visibleVideoModal" :video-url.sync="videoUrl" />
    <FPagination
      :current-page="currentPage"
      :page-size="20"
      :total="200"
      :pager-count="5"
      @update-current-page="handleUpdateCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { itemsModule } from '~/store'
import FItemList from '~/components/FItemList/index.vue'
import FPagination from '~/components/FPagination/index.vue'
import FVideoModal from '~/components/FVideoModal/index.vue'

@Component({
  components: {
    FItemList,
    FPagination,
    FVideoModal
  },
  async fetch({ query }) {
    const params =
      typeof query.page === 'string' && query.page !== '1'
        ? { offset: parseInt(query.page, 10) * 20 }
        : {}
    await itemsModule.init(params)
  },
  watchQuery: ['page']
})
export default class Index extends Vue {
  private currentPage = 1
  private visibleVideoModal = false
  private videoUrl = ''

  get items() {
    return itemsModule.all
  }

  created() {
    if (typeof this.$route.query.page === 'string') {
      this.currentPage = parseInt(this.$route.query.page, 10)
    }
  }

  handleUpdateCurrentPage(val: number) {
    location.href = `/?page=${val}`
  }

  handleClickVideoPlay(id: string) {
    this.visibleVideoModal = true
    this.videoUrl = itemsModule.videoUrlById(id)
  }
}
</script>
