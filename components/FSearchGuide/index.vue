<template>
  <div class="level">
    <div class="level-left"></div>

    <div class="level-right">
      <div class="level-item">
        <p class="subtitle is-7">表示件数</p>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button
            v-for="resultsPerPage in resultsPerPages"
            :key="resultsPerPage"
            class="button is-small"
            :class="{
              'is-selected is-danger': currentResultPerPage === resultsPerPage
            }"
            @click="handleClickResultsPerPage(resultsPerPage)"
          >
            {{ resultsPerPage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';

@Component
export default class FSearchGuide extends Vue {
  @Prop({ required: true }) readonly currentResultPerPage?: number;
  @Prop({ required: true }) readonly resultsPerPages?: number[];

  @Emit('update-results-per-page')
  handleClickResultsPerPage(resultsPerPage: number) {
    return resultsPerPage;
  }
}
</script>
