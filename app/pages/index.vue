<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/users');
    const res = await $axios.get('/itemList');
    return {
      users: data,
      items: res.data
    };
  }
})
export default class Index extends Vue {
  users: [] = [];
  items: [] = [];

  data() {
    return {
      users: []
    };
  }

  async created() {
    const { data } = await this.$axios.get('/users');
    console.log('data', data);
    console.log('users', this.users);
    const { data: apiData } = await this.$axios.get('/itemList');
    console.log('apiData', apiData);
    console.log('items', this.items);
  }
}
</script>
