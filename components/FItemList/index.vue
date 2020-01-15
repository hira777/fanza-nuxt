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
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { Item } from '~/store/entities/items'
import FItemListItem from '~/components/FItemList/FItemListItem.vue'

@Component({
  components: {
    FItemListItem
  }
})
export default class FItemList extends Vue {
  @Prop({ default: () => [] })
  readonly items!: Item[]

  @Emit('click-video-play')
  handleClickVideoPlay(id: string) {
    return id
  }
}
</script>
