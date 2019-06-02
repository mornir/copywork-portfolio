<template>
  <div class="mx-4 my-grid flex-1  my-6">
    <header class="mt-6">
      <h2 class="text-center text-2xl font-semibold">{{ cw.title }}</h2>
    </header>

    <CWSeparator :color="cw.color" />

    <div id="main"
         class="details-grid">

      <section>

        <div class="flex items-center mb-2">
          <h3 class="mr-2 text-xl font-semibold">Original</h3>
          <a :href="cw.copiedURL"
             target="_blank"
             rel="noopener"
             class="text-xs text-grey-darker">{{ prettyURL }}</a>
        </div>

        <video controls
               autoplay
               preload="metadata"
               class="w-full"
               style="height: 400px"
               muted>
          <source :src="`${cw.video}.webm`"
                  type="video/webm">
          <source :src="`${cw.video}.mp4`"
                  type="video/mp4">Sorry, your browser doesn't support embedded videos.
        </video>

      </section>

      <section>

        <div class="flex items-center mb-2">
          <h3 class="mr-2 text-xl font-semibold">My Copy</h3>
          <a :href="codepenFullView"
             target="_blank"
             rel="noopener"
             class="text-xs text-grey-darker">{{ codepenFullView }}</a>
        </div>

        <p data-height="400"
           data-theme-id="0"
           :data-slug-hash="cw.codepen"
           data-default-tab="result"
           data-user="mornir0"
           :data-pen-title="cw.title"
           data-preview="true"
           class="codepen">
          See the Pen
          <a :href="codepenFullView">Sanity Pricing</a> by Jérôme Pott (
          <a href="https://codepen.io/mornir0">@mornir0</a>) on
          <a href="https://codepen.io">CodePen</a>.
        </p>
        <script async
                src="https://static.codepen.io/assets/embed/ei.js"></script>

      </section>
    </div>
    <CWSeparator :color="cw.color" />

    <section v-if="cw.challenges">
      <h4>Challenges</h4>
      <p class="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>
  </div>
</template>

<script>
import sanity from '@/sanity'
import contrast from 'get-contrast'

import CWSeparator from '@/components/CWSeparator'
import queries from '@/queries'

import LogRocket from 'logrocket'

export default {
  name: 'Copywork',
  async validate({ params, query }) {
    const slugs = await sanity.fetch(queries.allSlugs).catch(e => {
      LogRocket.captureException(e, {
        extra: {
          pageName: this.name,
        },
      })
      console.error('❌❌❌❌', e)
    })
    // If FALSE redirect to 404 page
    return slugs.includes(params.slug)
  },
  async asyncData(ctx) {
    // Payload come from the generate command in nuxt.config.js
    if (ctx.payload) {
      return {
        cw: ctx.payload,
      }
    }

    if (ctx.query.draft) return

    const copywork = await sanity
      .fetch(queries.oneCW, { slug: ctx.params.slug })
      .catch(e => {
        LogRocket.captureException(e, {
          extra: {
            pageName: this.name,
          },
        })
        console.error('❌❌❌❌', e)
      })
    return { cw: copywork }
  },
  computed: {
    prettyURL() {
      if (!this.cw.copiedURL) return
      const removedProtocol = this.cw.copiedURL.replace('https://', '')

      if (removedProtocol.startsWith('www.')) {
        return removedProtocol
      } else {
        return 'www.' + removedProtocol
      }
    },
    codepenFullView() {
      return 'https://codepen.io/mornir0/full/' + this.cw.codepen
    },
  },
  components: {
    CWSeparator,
  },
  async mounted() {
    const isContrastOK = contrast.isAccessible('#fff', this.cw.color)

    await this.$nextTick()

    document.documentElement.style.setProperty('--main-color', this.cw.color)

    if (!isContrastOK) {
      document.documentElement.style.setProperty('--secondary-color', '#420806')
    }
  },
  head() {
    return {
      title: this.cw.title,
      meta: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `Copywork — ${this.cw.title}` },
        {
          name: 'twitter:description',
          content: `CodePen reproduction of ${this.cw.title}`,
        },
        {
          name: 'twitter:image',
          content: `https://codepen.io/mornir0/pen/${
            this.cw.codepen
          }/image/small.png`,
        },
        {
          name: 'twitter:image:alt',
          content: `CodePen reproduction of ${this.cw.title}`,
        },
        ,
      ],
    }
  },
}
</script>

<style scoped>
.my-grid {
  display: grid;
  gap: 1.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
}

@media (min-width: 992px) {
  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
