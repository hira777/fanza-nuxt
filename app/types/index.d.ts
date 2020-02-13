import { NuxtAxiosInstance } from '@nuxtjs/axios';

// https://typescript.nuxtjs.org/cookbook/plugins.html#i-inject-into-vue-instances
declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance;
  }
}

// https://typescript.nuxtjs.org/cookbook/plugins.html#ii-inject-into-context
declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}
