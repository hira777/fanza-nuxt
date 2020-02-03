<template>
  <nav
    class="pagination f-pagination is-right is-small"
    role="navigation"
    aria-label="pagination"
  >
    <a
      class="pagination-previous"
      :disabled="disabledPrev"
      @click="handleClickPrev"
      >前へ</a
    >
    <a
      class="pagination-next f-pagination-next"
      :disabled="disabledNext"
      @click="handleClickNext"
      >次へ</a
    >
    <ul class="pagination-list">
      <template v-if="prevMoreExists">
        <li>
          <a
            href="#"
            class="pagination-link"
            :aria-label="`Goto page 1`"
            @click.prevent="handleClickPager(1)"
            >1</a
          >
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
      </template>
      <li v-for="pager in pagers" :key="pager">
        <a
          href="#"
          class="pagination-link f-pagination-link"
          :aria-label="`Goto page ${pager}`"
          :class="{ 'is-current': currentPage === pager }"
          @click.prevent="handleClickPager(pager)"
          >{{ pager }}</a
        >
      </li>
      <template v-if="nextMoreExists">
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li>
          <a
            href="#"
            class="pagination-link"
            :aria-label="`Goto page ${pageCount}`"
            @click.prevent="handleClickPager(pageCount)"
            >{{ pageCount }}</a
          >
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';

@Component
export default class FPagination extends Vue {
  // 現在のページ番号
  @Prop({ required: true, default: 0 }) readonly currentPage!: number;
  // 1ページのアイテム数
  @Prop({ required: true, default: 0 }) readonly pageSize!: number;
  // アイテムの合計数
  @Prop({ required: true, default: 0 }) readonly total!: number;
  // ページャー（ボタン）の数
  @Prop({ required: true, default: 1 }) readonly pagerCount!: number;

  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }

  get halfPagerCount() {
    return (this.pagerCount - 1) / 2;
  }

  get disabledPrev() {
    return this.pageCount === 1 || this.currentPage === 1;
  }

  get disabledNext() {
    return this.currentPage === this.pageCount;
  }

  get prevMoreExists() {
    return (
      this.pageCount > this.pagerCount &&
      this.currentPage > this.pagerCount - this.halfPagerCount
    );
  }

  get nextMoreExists() {
    return (
      this.pageCount > this.pagerCount &&
      this.currentPage < this.pageCount - this.halfPagerCount
    );
  }

  get pagers() {
    const pagers = [];

    if (this.prevMoreExists && !this.nextMoreExists) {
      const startPage = this.pageCount - this.pagerCount + 1;
      for (let i = startPage; i < this.pageCount + 1; i++) {
        pagers.push(i);
      }
    } else if (!this.prevMoreExists && this.nextMoreExists) {
      for (let i = 1; i < this.pagerCount + 1; i++) {
        pagers.push(i);
      }
    } else if (this.prevMoreExists && this.nextMoreExists) {
      const offset = Math.floor(this.pagerCount / 2);
      for (
        let i = this.currentPage - offset;
        i <= this.currentPage + offset;
        i++
      ) {
        pagers.push(i);
      }
    } else {
      for (let i = 1; i <= this.pageCount; i++) {
        pagers.push(i);
      }
    }

    return pagers;
  }

  @Emit('update-current-page')
  handleClickPager(pager: number) {
    return pager;
  }

  @Emit('update-current-page')
  handleClickNext() {
    return this.currentPage + 1;
  }

  @Emit('update-current-page')
  handleClickPrev() {
    return this.currentPage - 1;
  }
}
</script>

<style lang="scss" scoped>
.f-pagination {
  &.is-right {
    justify-content: flex-end;

    .f-pagination-next {
      order: 4;
    }

    .pagination-list {
      flex-grow: 0;
    }
  }
}
// .f-pagination-link {
//   &.is-current {
//     background-color: $red;
//     border-color: $red;
//   }
// }
</style>
