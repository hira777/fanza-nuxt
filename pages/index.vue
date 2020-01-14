<template>
  <div class="container">
    <FItemList :items="items" @click-video-play="handleClickVideoPlay" />
    <FVideoModal :visible.sync="visibleVideoModal" :video-url.sync="videoUrl" />
    <FPagination
      :current-page="currentPage"
      :page-size="20"
      :total="itemsTotalCount"
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
  async asyncData({ query }) {
    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) !== 1
        ? parseInt(query.page, 10)
        : undefined
    const params = page ? { offset: page * 20 } : {}
    await itemsModule.init(params)
    if (page) {
      return { currentPage: page, itemsTotalCount: itemsModule.totalCount }
    }
    return { itemsTotalCount: itemsModule.totalCount }
  },
  scrollToTop: true,
  watchQuery: ['page']
})
export default class Index extends Vue {
  private currentPage = 1
  private itemsTotalCount = 0
  private visibleVideoModal = false
  private videoUrl = ''

  get items() {
    return itemsModule.all
  }

  handleClickVideoPlay(id: string) {
    this.visibleVideoModal = true
    this.videoUrl = itemsModule.videoUrlById(id)
  }

  handleUpdateCurrentPage(val: number) {
    this.$router.push(`/?page=${val}`)
  }
}
</script>
