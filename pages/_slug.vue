<template>
  <div class="mx-4 my-grid my-6">

    <header class="mt-6">
      <h2 class="text-center">{{ cw.title }}</h2>
    </header>

    <CWSeparator :color="cw.color" />

    <section>

      <div class="flex items-center mb-2">
        <h3 class="mr-2">Original</h3>
        <a :href="cw.copiedURL"
           class="text-xs text-grey-darker">{{ prettyURL }}</a>
      </div>

      <video controls
             preload="metadata"
             class="w-full">

        <source src="https://res.cloudinary.com/infonuagique/video/upload/v1542907224/copywork/video-encode.webm"
                type="video/webm">

        <source src="https://res.cloudinary.com/infonuagique/video/upload/v1542907224/copywork/video-encode.mp4"
                type="video/mp4">

        Sorry, your browser doesn't support embedded videos.
      </video>
    </section>

    <section>
      <div class="flex items-center mb-2">
        <h3 class="mr-2">Copy</h3>
        <a :href="codepenFullView"
           class="text-xs text-grey-darker">{{ codepenFullView }}</a>
      </div>
      <p data-height="265"
         data-theme-id="0"
         :data-slug-hash="cw.codepen"
         data-default-tab="result"
         data-user="mornir0"
         :data-pen-title="cw.title"
         data-preview="true"
         class="codepen">See the Pen <a :href="codepenFullView">Sanity Pricing</a> by Jérôme Pott (<a href="https://codepen.io/mornir0">@mornir0</a>) on <a href="https://codepen.io">CodePen</a>.</p>
      <script async
              src="https://static.codepen.io/assets/embed/ei.js"></script>
    </section>

    <CWSeparator :color="cw.color" />

    <section>
      <h4>Challenges</h4>
      <p class="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
    </section>

  </div>
</template>

<script>
import CWSeparator from '@/components/CWSeparator'
import sanity from '@/sanity.js'

const query = `*[_type == "copywork" && slug.current == $slug]{
  title,
  color,
  codepen,
  copiedURL
}[0]`

export default {
  name: 'Details',
  async asyncData(ctx) {
    if (ctx.payload) {
      return {
        cw: ctx.payload,
      }
    }

    const copywork = await sanity
      .fetch(query, { slug: ctx.params.slug })
      .catch(e => console.log(e))

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
}
</script>

<style scoped>
.my-grid {
  display: grid;
  gap: 1.5rem;
}
</style>
