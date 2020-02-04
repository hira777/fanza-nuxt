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
import { Vue, Component } from 'nuxt-property-decorator';
import * as Vuex from 'vuex';

import { ResultsPerPage } from '~/types/searchSettings';
import { RequestParameters } from '~/api/itemList';
import FItemList from '~/components/FItemList/index.vue';
import FPagination from '~/components/FPagination/index.vue';
import FSearchGuide from '~/components/FSearchGuide/index.vue';
import FVideoModal from '~/components/FVideoModal/index.vue';

@Component({
  components: {
    FItemList,
    FPagination,
    FSearchGuide,
    FVideoModal
  },
  async asyncData(context) {
    const { app, query } = context;
    const store: Vuex.ExStore = context.store;
    const resultsPerPage = (parseInt(app.$cookies.get('resultsPerPage'), 10) ||
      20) as ResultsPerPage;
    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) !== 1
        ? parseInt(query.page, 10)
        : undefined;
    const keyword =
      typeof query.keyword === 'string' ? query.keyword : undefined;
    const params: RequestParameters = {
      hits: resultsPerPage,
      ...(page && { offset: page * resultsPerPage }),
      ...(keyword && { keyword })
    };

    await store.dispatch('entities/items/search', params);

    return {
      ...(page && { currentPage: page }),
      itemsTotalCount: store.getters['entities/items/totalCount'],
      currentResultPerPage: resultsPerPage
    };
  },
  scrollToTop: true,
  watchQuery: ['page', 'keyword']
})
export default class Index extends Vue {
  $store!: Vuex.ExStore;

  currentPage = 1;
  currentResultPerPage: ResultsPerPage = 40;
  itemsTotalCount = 0;
  resultsPerPages: ResultsPerPage[] = [40, 80, 120];
  visibleVideoModal = false;
  videoUrl = '';

  get items() {
    return this.$store.getters['entities/items/all'];
  }

  handleClickResultsPerPage(val: ResultsPerPage) {
    this.$cookies.set('resultsPerPage', String(val));

    const isFirstPage =
      !this.$route.query.page || this.$route.query.page === '1';

    if (isFirstPage) {
      location.reload();
    } else {
      const { page, ...query } = this.$route.query; // eslint-disable-line @typescript-eslint/no-unused-vars
      this.$router.push({ query });
    }
  }

  handleClickVideoPlay(id: string) {
    this.visibleVideoModal = true;
    this.videoUrl = this.$store.getters['entities/items/videoUrlById'](id);
  }

  handleUpdateCurrentPage(val: number) {
    this.$router.push({
      query: { ...this.$route.query, page: String(val) }
    });
  }
}
</script>
