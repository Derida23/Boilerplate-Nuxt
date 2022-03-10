import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  router: { base: '/', middleware: ['auth'] },
  head: {
    titleTemplate: '%s - Arian Derida',
    title: 'Boilerplate Nuxt Javascript',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Setup Port and Host
  server: {
    port: 8080, // default: 3000
  },

  loading: '@/components/Loading.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/poppins.scss',
    '~/assets/scss/style.scss',
    '~/assets/scss/colors.scss',
  ],

  // You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/validation' },
    { src: '@/plugins/notify', ssr: false },
    { src: '@/plugins/overlay', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz', parseJSON: false }],
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/privy': {
      target: process.env.API_URL,
      pathRewrite: { '^/api/privy': '' },
    },
    '/api/country': {
      target: process.env.COUNTRY_URL,
      pathRewrite: { '^/api/country': '' },
    },
  },

  publicRuntimeConfig: {
    api_url: process.env.API_URL,
    country_url: process.env.COUNTRY_URL,
    salt: process.env.SALT,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FB620E',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
