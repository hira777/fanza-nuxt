<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          Fanza Nuxt
        </div>

        <div class="navbar-item">
          <input
            class="input is-small"
            type="text"
            placeholder="検索"
            @input="handleInput"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import debounce from 'lodash.debounce'
import { itemsModule } from '~/store'

@Component
export default class FHeader extends Vue {
  private handleInput = debounce(($event: InputEvent): void => {
    const value = ($event.target as HTMLInputElement).value.replace(
      /\u3000/g,
      ' '
    )
    itemsModule.keywordUpdate({ keyword: value })
  }, 1000)
}
</script>
