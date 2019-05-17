<template>
  <section class="flex-1">
    <div id="main"
         class="cw-grid p-4 max-w-xl mx-auto">
      <CWCard v-for="(cw, index) in copyworks"
              :key="cw._id"
              :cw="cw"
              data-cy="cw"
              class="copywork"
              @mouseenter.native="stopInterval"
              @mouseleave.native="startAnimationInterval"
              @focus.native="stopInterval"
              @blur.native="startAnimationInterval"
              :class="{'force-color' : index === randomNumber}" />
    </div>
  </section>
</template>

<script>
import sanity from '@/sanity'
import queries from '@/queries'
import LogRocket from 'logrocket'
import random from 'lodash.random'

import CWCard from '@/components/CWCard'

export default {
  name: 'Home',
  components: {
    CWCard,
  },
  async asyncData({ params }) {
    const copyworks = await sanity.fetch(queries.allCW).catch(e => {
      LogRocket.captureException(e, {
        extra: {
          pageName: 'Home',
        },
      })
      console.error('❌❌❌❌', e)
    })
    return { copyworks }
  },
  data() {
    return {
      randomNumber: 0,
      lightAnimationInterval: null,
    }
  },
  methods: {
    stopInterval() {
      this.randomNumber = -1
      clearInterval(this.lightAnimationInterval)
    },
    startAnimationInterval() {
      const max = this.copyworks.length - 1

      this.lightAnimationInterval = setInterval(() => {
        let newRandomNumber = random(max)

        while (this.randomNumber === newRandomNumber) {
          newRandomNumber = random(max)
        }
        this.randomNumber = newRandomNumber
      }, 3000)
    },
  },
  async mounted() {
    // TODO: remove once surge is torn down
    if (this.$route.query.from === 'surge') {
      LogRocket.captureMessage('Came from Surge', {})
      console.log('Came from Surge')
    }

    if (matchMedia('(hover:hover)').matches) {
      this.startAnimationInterval()
    }

    await this.$nextTick()
    document.documentElement.style.setProperty('--main-color', '#3D4852')
    document.documentElement.style.setProperty('--secondary-color', '#fff')
  },
  beforeDestroy() {
    this.stopInterval()
  },
  head: {
    title: 'Copywork',
    meta: [
      { name: 'twitter:title', content: 'Copywork' },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:image',
        content:
          'https://copywork.netlify.com/_nuxt/icons/icon_512.c8wfcdwd8Fx.png',
      },
    ],
  },
}
</script>

<style scoped>
.cw-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .cw-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
  }
}

@media (hover: hover) {
  .copywork {
    filter: grayscale(100%);
    /*  outline: none;*/
  }

  .copywork:hover {
    filter: grayscale(0%);
  }
}

.copywork:focus {
  filter: grayscale(0%);
}

.force-color {
  filter: grayscale(0%);
}
</style>
