<template>
  <div class="column is-3">
    <div class="card f-equal-height">
      <div class="card-image f-card-image">
        <figure class="image is-3by2">
          <img class="f-image" :src="item.imageUrl.large" alt="" />
          <!-- <img src="https://dummyimage.com/600x400/000/fff" alt="" /> -->
        </figure>
        <button
          v-show="movieExsits"
          class="button is-small is-black f-button-play"
          @click="handleClickVideoPlay(item.id)"
        >
          <font-awesome-icon class="f-icon" icon="play" />
        </button>
      </div>
      <div class="card-content f-card-content">
        <div class="content">
          <figcaption>
            <span class="has-text-weight-semibold f-title">{{
              item.title
            }}</span>
          </figcaption>

          <span class="f-price">{{ item.price }}</span>
          <br />
          <time class="is-size-7" :datetime="item.date">{{ item.date }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { Item } from '~/store/itemsModule'

@Component
export default class FItemListItem extends Vue {
  @Prop({ default: () => ({}) })
  readonly item!: Item

  @Emit('click-video-play')
  handleClickVideoPlay(id: string) {
    return id
  }

  get movieExsits(): boolean {
    return this.item.sampleMovieUrl !== null
  }
}
</script>

<style lang="scss" scoped>
.f-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.f-card-image {
  position: relative;
}
.f-button-play {
  position: absolute;
  bottom: pxToRem(10px);
  right: pxToRem(10px);
  width: pxToRem(36px);
  height: pxToRem(36px);
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: rgba($color: #000000, $alpha: 0.7);
}
.f-icon {
  margin-left: pxToRem(2px);
  color: #fff;
}
.f-image {
  object-fit: cover;
}
.f-card-content {
  padding: pxToRem(18px);
}
.f-title {
  font-size: pxToRem(14px);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.f-price {
  font-size: pxToRem(14px);
  color: #c00;
}
</style>
