<template>
  <div>
    <FHeader />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import FHeader from '~/components/FHeader/index.vue';

@Component({
  components: {
    FHeader
  }
})
export default class Defalut extends Vue {}
</script>

<style>
html {
  box-sizing: border-box;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
