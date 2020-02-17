<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import { itemListService } from '~/api/itemList';

@Component({
  async asyncData() {
    const { data } = await itemListService.get();

    return {
      items: data.items
    };
  }
})
export default class Index extends Vue {
  items: [] = [];

  created() {
    console.log('items', this.items);
  }
}
</script>
