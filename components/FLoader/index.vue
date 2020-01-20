<template>
  <div
    class="loader-wrapper f-loader-wrapper"
    :class="{ 'is-active': isActive }"
  >
    <div class="loader f-loader" :class="{ 'is-loading': isActive }"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.f-loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  .f-loader {
    height: 80px;
    width: 80px;
  }

  &.is-active {
    opacity: 1;
    z-index: 1;
  }
}
</style>
