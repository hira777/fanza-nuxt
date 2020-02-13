<template>
  <div class="container"></div>
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/users');
    return { users: data };
  },
  data() {
    return {
      users: []
    };
  },
  async created() {
    const { data } = await this.$axios.get('/api/users');
    console.log('data', data);
    console.log('users', this.users);
  }
};
</script>
