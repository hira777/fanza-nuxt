<template>
  <div class="columns is-multiline">
    <FItemListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @click-video-play="handleClickVideoPlay"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Item } from '~/store/entities/items'
import FItemListItem from '~/components/FItemList/FItemListItem.vue'

export default Vue.extend({
  components: {
    FItemListItem
  },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  },
  methods: {
    handleClickVideoPlay(id: string) {
      this.$emit('click-video-play', id)
    }
  }
})
</script>
