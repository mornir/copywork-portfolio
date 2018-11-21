<template>
  <section class="flex flex-col min-h-screen">

    <CWHeader />

    <div class="flex-1 container mx-auto">

      <!--   <article v-for="copywork in copyworks"
               :key="copywork._id" >
        <h3>{{ copywork.title }}</h3>
      </article> -->

      <CWCard />

    </div>

    <CWFooter />

  </section>
</template>

<script>
import CWHeader from '~/components/CWHeader'
import CWCard from '~/components/CWCard'
import CWFooter from '~/components/CWFooter'

import sanity from '~/sanity.js'

const query = `*[_type == "copywork"]`

export default {
  components: {
    CWHeader,
    CWCard,
    CWFooter,
  },
  async asyncData({ params }) {
    const copyworks = await sanity.fetch(query).catch(e => console.log(e))
    return { copyworks }
  },
}
</script>

<style>
</style>
