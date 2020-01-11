<template>
  <div class="columns is-multiline">
    <div v-for="item in items" :key="item.id" class="column is-3">
      <div class="card f-equal-height">
        <div class="card-image">
          <figure class="image is-3by2">
            <!-- <img class="f-image" :src="item.imageUrl.large" alt="" /> -->
            <img src="https://dummyimage.com/600x400/000/fff" alt="" />
          </figure>
        </div>
        <div class="card-content f-card-content">
          <div class="content">
            <figcaption>
              <span class="has-text-weight-semibold f-title">{{
                item.title
              }}</span>
            </figcaption>
            <!-- <a href="#">#responsive</a> -->
            <!-- <br /> -->
            <span class="f-price">{{ item.price }}</span>
            <br />
            <time class="is-size-7" :datetime="item.date">{{ item.date }}</time>
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
.f-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.f-card-content {
  padding: pxToRem(18px);
}
.f-image {
  object-fit: cover;
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
