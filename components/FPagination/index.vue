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
          class="pagination-link"
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
import Vue from 'vue'

export default Vue.extend({
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    pagerCount: {
      type: Number,
      required: true,
      default: 1
    }
  },
  computed: {
    pageCount(): number {
      return Math.ceil(this.total / this.pageSize)
    },

    halfPagerCount(): number {
      return (this.pagerCount - 1) / 2
    },

    disabledPrev(): boolean {
      return this.pageCount === 1 || this.currentPage === 1
    },

    disabledNext(): boolean {
      return this.currentPage === this.pageCount
    },

    prevMoreExists(): boolean {
      return (
        this.pageCount > this.pagerCount &&
        this.currentPage > this.pagerCount - this.halfPagerCount
      )
    },

    nextMoreExists(): boolean {
      return (
        this.pageCount > this.pagerCount &&
        this.currentPage < this.pageCount - this.halfPagerCount
      )
    },

    pagers(): number[] {
      const pagers = []

      if (this.prevMoreExists && !this.nextMoreExists) {
        const startPage = this.pageCount - this.pagerCount + 1
        for (let i = startPage; i < this.pageCount + 1; i++) {
          pagers.push(i)
        }
      } else if (!this.prevMoreExists && this.nextMoreExists) {
        for (let i = 1; i < this.pagerCount + 1; i++) {
          pagers.push(i)
        }
      } else if (this.prevMoreExists && this.nextMoreExists) {
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
  },
  methods: {
    handleClickPager(pager: number) {
      this.$emit('update-current-page', pager)
    },

    handleClickNext() {
      this.$emit('update-current-page', this.currentPage + 1)
    },

    handleClickPrev() {
      this.$emit('update-current-page', this.currentPage - 1)
    }
  }
})
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
</style>
