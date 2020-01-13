<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a
      class="pagination-previous"
      :disabled="disabledPrev"
      @click="handleClickPrev"
      >Previous</a
    >
    <a class="pagination-next" :disabled="disabledNext" @click="handleClickNext"
      >Next page</a
    >
    <ul class="pagination-list">
      <li v-for="pager in pagers" :key="pager">
        <a
          href="#"
          class="pagination-link"
          :aria-label="`Goto page ${pager}`"
          :class="{ 'is-current': currentPage === pager }"
          @click.prevent="handleClickPager(pager)"
          >{{ pager }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class FPagination extends Vue {
  // 現在のページ番号
  @Prop({ required: true, default: 0 }) readonly currentPage!: number
  // 1ページのアイテム数
  @Prop({ required: true, default: 0 }) readonly pageSize!: number
  // アイテムの合計数
  @Prop({ required: true, default: 0 }) readonly total!: number
  // ページャー（ボタン）の数
  @Prop({ required: true, default: 1 }) readonly pagerCount!: number

  get pageCount() {
    return Math.ceil(this.total / this.pageSize)
  }

  get halfPagerCount() {
    return (this.pagerCount - 1) / 2
  }

  get disabledPrev() {
    return this.pageCount === 1 || this.currentPage === 1
  }

  get disabledNext() {
    return this.currentPage === this.pageCount
  }

  get pagers() {
    const pagers = []
    const prevMoreExists =
      this.pageCount > this.pagerCount &&
      this.currentPage > this.pagerCount - this.halfPagerCount
    const nextMoreExists =
      this.pageCount > this.pagerCount &&
      this.currentPage < this.pageCount - this.halfPagerCount

    if (prevMoreExists && !nextMoreExists) {
      const startPage = this.pageCount - this.pagerCount + 1
      for (let i = startPage; i < this.pageCount + 1; i++) {
        pagers.push(i)
      }
    } else if (!prevMoreExists && nextMoreExists) {
      for (let i = 1; i < this.pagerCount + 1; i++) {
        pagers.push(i)
      }
    } else if (prevMoreExists && nextMoreExists) {
      const offset = Math.floor(this.pagerCount / 2)
      for (
        let i = this.currentPage - offset;
        i <= this.currentPage + offset;
        i++
      ) {
        pagers.push(i)
      }
    } else {
      for (let i = 1; i <= this.pageCount; i++) {
        pagers.push(i)
      }
    }

    return pagers
  }

  @Emit('update-current-page')
  handleClickPager(pager: number) {
    return pager
  }

  @Emit('update-current-page')
  handleClickNext() {
    return this.currentPage + 1
  }

  @Emit('update-current-page')
  handleClickPrev() {
    return this.currentPage - 1
  }
}
</script>

<style lang="scss" scoped></style>
