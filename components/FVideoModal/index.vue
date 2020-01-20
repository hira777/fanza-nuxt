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
import Vue from 'vue'
import FLoader from '~/components/FLoader/index.vue'

export default Vue.extend({
  components: {
    FLoader
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  watch: {
    videoUrl(val: string) {
      this.isLoading = val !== ''
    }
  },
  methods: {
    handleLoad() {
      this.isLoading = false
    },

    handleClickClose() {
      this.hide()
      this.removeVideo()
    },

    hide() {
      this.$emit('update:visible', false)
    },

    removeVideo() {
      this.$emit('update:video-url', '')
    }
  }
})
</script>

<style lang="scss" scoped></style>
