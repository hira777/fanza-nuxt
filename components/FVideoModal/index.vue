<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background" @click="handleClickClose"></div>
    <div class="modal-content f-modal-content">
      <FLoader :is-active="isLoading" />
      <iframe
        v-if="videoUrl !== ''"
        width="644"
        height="414"
        scrolling="no"
        frameborder="0"
        allowfullscreen
        :src="videoUrl"
        @load="handleLoad"
      ></iframe>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="handleClickClose"
    ></button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
import FLoader from '~/components/FLoader/index.vue'

@Component({
  components: {
    FLoader
  }
})
export default class FItemList extends Vue {
  @Prop({ default: false }) readonly visible?: boolean
  @Prop({ default: '' }) readonly videoUrl?: string

  isLoading = false

  handleLoad() {
    this.isLoading = false
  }

  handleClickClose() {
    this.hide()
    this.removeVideo()
  }

  @Watch('videoUrl')
  onChildChanged(val: string) {
    this.isLoading = val !== ''
  }

  @Emit('update:visible')
  hide() {
    return false
  }

  @Emit('update:video-url')
  removeVideo() {
    return ''
  }
}
</script>

<style lang="scss" scoped></style>
