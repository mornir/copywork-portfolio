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
      {
        name: 'google-site-verification',
        content: '-YKj7LuDe1vpFYD6aADpMRYaneYDdJ6gfgXKVIpjH_g',
      },
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
    'nuxt-purgecss',
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
      plugins: [
        // ...
        require('tailwindcss'),
        require('autoprefixer'),
        // ...
      ],
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
    },
  },

  generate: {
    // Use error.vue for 404 error
    fallback: true,
    async routes() {
      const copyworks = await sanity
        .fetch(queries.generate)
        .catch(e => console.log(e))

      return copyworks
        .map(cw => ({
          route: cw.slug,
          payload: cw,
        }))
        .concat({
          route: '/draft',
          payload: {
            _createdAt: '2019-02-20T14:21:27Z',
            _id: 'a53993fd-614a-43c7-b243-46e99fc81647',
            _rev: 'UQZcjlaeN0Wz5PmvgzpS95',
            _type: 'copywork',
            _updatedAt: '2019-02-20T16:38:43Z',
            codepen: 'wNRYqb',
            color: '#001489',
            copiedURL:
              'https://www.sunysuffolk.edu/explore-academics/majors-and-programs/culinary-arts/index.jsp',
            date: '2019-02-19T23:00:00.000Z',
            logo: {
              _type: 'image',
              asset: {
                _ref:
                  'image-9c397a0742491fbb9594df039d3cc4915ff77875-368x112-png',
                _type: 'reference',
              },
            },
            slug: {
              _type: 'slug',
              current: 'suffolk-college',
            },
            title: 'Suffolk College',
            video:
              'https://res.cloudinary.com/infonuagique/video/upload/v1550680710/copywork/Suffolk/Suffolk',
          },
        })
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
