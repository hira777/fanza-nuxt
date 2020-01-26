<template>
  <div class="container">
    <FSearchGuide
      :current-result-per-page="currentResultPerPage"
      :results-per-pages="resultsPerPages"
      @update-results-per-page="handleClickResultsPerPage"
    />
    <FItemList :items="items" @click-video-play="handleClickVideoPlay" />
    <FPagination
      :current-page="currentPage"
      :page-size="20"
      :total="itemsTotalCount"
      :pager-count="5"
      @update-current-page="handleUpdateCurrentPage"
    />
    <FVideoModal :visible.sync="visibleVideoModal" :video-url.sync="videoUrl" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Cookie from 'cookie-universal'
import { itemsModule, searchSettingsModule } from '~/store'
import { ResultsPerPage } from '~/store/app/searchSettings'
import { RequestParameter } from '~/api/itemList.types'
import FItemList from '~/components/FItemList/index.vue'
import FPagination from '~/components/FPagination/index.vue'
import FSearchGuide from '~/components/FSearchGuide/index.vue'
import FVideoModal from '~/components/FVideoModal/index.vue'

@Component({
  components: {
    FItemList,
    FPagination,
    FSearchGuide,
    FVideoModal
  },
  async asyncData({ query, req, res }) {
    const cookies = (require('cookie-universal') as typeof Cookie)(req, res)
    // TODO: 型アサーションをつけずに済む方法はない？
    const resultsPerPage = ((cookies.get('resultsPerPage') &&
      parseInt(cookies.get('resultsPerPage'), 10)) ||
      20) as ResultsPerPage
    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) !== 1
        ? parseInt(query.page, 10)
        : undefined
    const keyword =
      typeof query.keyword === 'string' ? query.keyword : undefined
    const params: RequestParameter = {
      hits: resultsPerPage,
      ...(page && { offset: page * resultsPerPage }),
      ...(keyword && { keyword })
    }

    await itemsModule.search(params)
    searchSettingsModule.init(resultsPerPage)

    return {
      requestParameter: params,
      ...(page && { currentPage: page }),
      itemsTotalCount: itemsModule.totalCount
    }
  },
  scrollToTop: true,
  watchQuery: ['page', 'keyword']
})
export default class Index extends Vue {
  private requestParameter: RequestParameter = {}
  private currentPage = 1
  private itemsTotalCount = 0
  private visibleVideoModal = false
  private videoUrl = ''

  get items() {
    return itemsModule.all
  }

  get currentResultPerPage() {
    return searchSettingsModule.resultsPerPage
  }

  get resultsPerPages() {
    return searchSettingsModule.resultsPerPages
  }

  handleClickResultsPerPage(val: ResultsPerPage) {
    const isFirstPage =
      !this.$route.query.page || this.$route.query.page === '1'

    searchSettingsModule.setCookieToResultsPerPage(val)
    if (isFirstPage) {
      location.reload()
    } else {
      // eslint-disable-next-line
      const { page, ...query } = this.$route.query
      this.$router.push({ query })
    }
  }

  handleClickVideoPlay(id: string) {
    this.visibleVideoModal = true
    this.videoUrl = itemsModule.videoUrlById(id)
  }

  handleUpdateCurrentPage(val: number) {
    this.$router.push({
      query: { ...this.$route.query, page: String(val) }
    })
  }
}
</script>
