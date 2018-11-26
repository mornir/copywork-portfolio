<template>
  <section class="flex-1 container mx-auto flex flex-col justify-around">

    <CWCard v-for="cw in copyworks"
            :key="cw._id"
            :cw="cw" />

  </section>
</template>

<script>
import sanityClient from '@sanity/client'
import CWCard from '@/components/CWCard'

const sanity = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true,
})

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
  async mounted() {
    console.log(process.env.PROJECT_ID)
    await this.$nextTick()
    document.documentElement.style.setProperty('--main-color', '#3D4852')
  },
}
</script>

<style>
</style>
