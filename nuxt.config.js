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

  // https://github.com/nuxt-community/dotenv-module/issues/25
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    DATASET: process.env.DATASET,
  },

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
      { name: 'twitter:creator', content: '@mornir0' },
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
  plugins: ['~plugins/logrocket.js'],

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

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      presets({ isServer }) {
        const targets = isServer
          ? { node: 'current' }
          : {
              browsers: ['>1%', 'not ie 11', 'not op_mini all'],
            }
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      },
    },
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve('./tailwind.js'),
      },
      preset: { autoprefixer: { grid: true } },
    },
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
        payload: cw,
      }))
    },
  },

  manifest: {
    name: 'Copywork',
    short_name: 'Copywork',
    description: pkg.description,
    lang: 'en-US',
    theme_color: '#3d4852',
    background_color: '#3d4852',
    display: 'minimal-ui',
    orientation: 'portrait-primary',
    scope: '/',
    start_url: '/',
  },
}
