<template>
  <section class="flex-1 container mx-auto flex flex-col justify-around">

    <CWCard v-for="cw in copyworks"
            :key="cw._id"
            :cw="cw" />

  </section>
</template>

<script>
import CWCard from '@/components/CWCard'

import sanity from '@/sanity.js'

const query = `*[_type == "copywork"]{
  _id,
  "slug": "/" + slug.current,
  title,
  color,
  date,
  "imageUrl": logo.asset->url
}`

export default {
  components: {
    CWCard,
  },
  async asyncData({ params }) {
    const copyworks = await sanity.fetch(query).catch(e => console.log(e))
    return { copyworks }
  },
  created() {
    this.$root.$emit('changeColor', '#3D4852')
  },
}
</script>

<style>
</style>
