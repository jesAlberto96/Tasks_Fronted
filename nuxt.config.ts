// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  imports: {
    dirs: ['./stores'],
  },

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})