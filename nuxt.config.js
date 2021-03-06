import pkg from './package'

export default {
  target: 'static',
  components: true,

  // https://github.com/nuxt-community/dotenv-module/issues/25
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    DATASET: process.env.DATASET,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Copywork',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'twitter:creator', content: '@mornir0' },
      {
        name: 'google-site-verification',
        content: '-YKj7LuDe1vpFYD6aADpMRYaneYDdJ6gfgXKVIpjH_g',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat|Pacifico&display=swap',
      },
    ],
  },

  /** Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/preview.client.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-129845263-1',
      },
    ],
  ],

  vue: {
    config: {
      productionTip: false,
    },
  },

  buildModules: ['@nuxtjs/tailwindcss'],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // This line prevents dotenv from failing when requiring fs
      config.node = {
        fs: 'empty',
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },

  generate: {
    crawler: true,
    fallback: true,
  },

  manifest: {
    name: 'Copywork',
    short_name: 'Copywork',
    description: pkg.description,
    lang: 'en-US',
    theme_color: '#3d4852',
    background_color: '#3d4852',
    display: 'browser',
    orientation: 'portrait-primary',
    scope: '/',
    start_url: '/',
  },
}
