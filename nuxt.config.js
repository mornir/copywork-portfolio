import pkg from './package'
import path from 'path'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import sanity from './sanity'
import queries from './queries'

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

export default {
  mode: 'universal',

  server: {
    port: 8080, // default: 3000
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
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  modules: ['@nuxtjs/pwa'],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  vue: {
    config: {
      productionTip: false,
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve('./tailwind.js'),
      },
      preset: { autoprefixer: { grid: true } },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue'),
            ]),
            extractors: [{ extractor: TailwindExtractor, extensions: ['vue'] }],
            whitelist: ['html', 'body', 'nuxt-progress'],
          })
        )
      }
    },
  },

  generate: {
    async routes() {
      const copyworks = await sanity
        .fetch(queries.generate)
        .catch(e => console.log(e))

      return copyworks.map(cw => ({
        route: cw.slug,
        payload: {
          title: cw.title,
          color: cw.color,
          codepen: cw.codepen,
          copiedURL: cw.copiedURL,
        },
      }))
    },
  },

  manifest: {
    name: 'Copywork',
    short_name: 'Copywork',
    description: 'Collection of personal websites reproductions',
    lang: 'en-US',
    theme_color: '#3d4852',
    background_color: '#3d4852',
    display: 'standalone',
    orientation: 'portrait-primary',
    scope: '/',
    start_url: '/',
  },
}
