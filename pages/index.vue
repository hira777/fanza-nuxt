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
import * as Vuex from 'vuex'

import { ResultsPerPage } from '~/store/app/searchSettings'
import { RequestParameters } from '~/api/itemList'
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
  async asyncData({ app, store, query }) {
    const resultsPerPage = (parseInt(app.$cookies.get('resultsPerPage'), 10) ||
      20) as ResultsPerPage
    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) !== 1
        ? parseInt(query.page, 10)
        : undefined
    const keyword =
      typeof query.keyword === 'string' ? query.keyword : undefined
    const params: RequestParameters = {
      hits: resultsPerPage,
      ...(page && { offset: page * resultsPerPage }),
      ...(keyword && { keyword })
    }
    await (store as Vuex.ExStore).dispatch('entities/items/search', params)
    ;(store as Vuex.ExStore).dispatch(
      'app/searchSettings/setResultsPerPage',
      resultsPerPage
    )

    return {
      requestParameter: params,
      ...(page && { currentPage: page }),
      itemsTotalCount: (store as Vuex.ExStore).getters[
        'entities/items/totalCount'
      ]
    }
  },
  scrollToTop: true,
  watchQuery: ['page', 'keyword']
})
export default class Index extends Vue {
  $store!: Vuex.ExStore

  requestParameter: RequestParameters = {}
  currentPage = 1
  itemsTotalCount = 0
  visibleVideoModal = false
  videoUrl = ''

  get items() {
    return this.$store.getters['entities/items/all']
  }

  get currentResultPerPage() {
    return this.$store.getters['app/searchSettings/resultsPerPage']
  }

  get resultsPerPages() {
    return this.$store.getters['app/searchSettings/resultsPerPages']
  }

  handleClickResultsPerPage(val: ResultsPerPage) {
    const isFirstPage =
      !this.$route.query.page || this.$route.query.page === '1'
    this.$store.dispatch('app/searchSettings/setCookieToResultsPerPage', val)

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
    this.videoUrl = this.$store.getters['entities/items/videoUrlById'](id)
  }

  handleUpdateCurrentPage(val: number) {
    this.$router.push({
      query: { ...this.$route.query, page: String(val) }
    })
  }
}
</script>
