<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          Fanza Nuxt
        </div>

        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control is-small" :class="{ 'is-loading': isLoading }">
              <input
                v-model="keyword"
                class="input is-small"
                type="text"
                placeholder="キーワードから探す"
                @keydown.enter="handleEnter"
              />
            </div>
            <div class="control">
              <button
                class="button is-small is-danger has-text-weight-bold"
                @click="handleClick"
              >
                検索
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class FHeader extends Vue {
  isLoading: boolean = false;
  keyword: string = '';

  created() {
    const { keyword } = this.$route.query;
    this.keyword = (typeof keyword === 'string' && keyword) || '';
  }

  handleClick() {
    this.search(this.keyword);
  }

  handleEnter($event: KeyboardEvent) {
    this.search(($event.target as HTMLInputElement).value);
  }

  search(value: string) {
    this.isLoading = true;

    const keyword = value.replace(/[\x20\u3000]/g, '%20');
    const { keyword: queryKeyword } = this.$route.query;
    if (queryKeyword === undefined && keyword === '') return;
    if (queryKeyword && queryKeyword === keyword) return;

    const path = keyword === '' ? '/' : `/?keyword=${keyword}`;
    this.$router.push(path, () => {
      this.isLoading = false;
    });
  }
}
</script>
