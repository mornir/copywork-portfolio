<template>
  <section class="flex-1 container mx-auto">

    <div class="cw-grid p-4">

      <CWCard v-for="cw in copyworks"
              :key="cw._id"
              :cw="cw" />

    </div>
  </section>
</template>

<script>
import sanity from '@/sanity'
import CWCard from '@/components/CWCard'

import queries from '@/queries'

export default {
  components: {
    CWCard,
  },
  async asyncData({ params }) {
    const copyworks = await sanity
      .fetch(queries.allCW)
      .catch(e => console.log(e))
    return { copyworks }
  },
  async mounted() {
    await this.$nextTick()
    document.documentElement.style.setProperty('--main-color', '#3D4852')
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
</style>
