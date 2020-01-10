<template>
  <div class="columns is-multiline">
    <div v-for="item in items" :key="item.id" class="column is-3">
      <div class="card card-equal-height">
        <div class="card-image">
          <figure class="image is-3by2">
            <img :src="item.imageUrl.large" alt="" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <span class="has-text-weight-semibold">{{ item.title }}</span>
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Items } from '~/store/itemsModule'

@Component
export default class FItemList extends Vue {
  @Prop({ default: () => [] })
  readonly items!: Items
}
</script>

<style lang="scss" scoped>
.card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
