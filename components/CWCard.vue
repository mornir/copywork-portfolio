<template>
  <nuxt-link :to="cw.slug"
             class="no-underline">
    <article class="border-purple-dark border border-2 p-4 mx-6 text-center my-rounded"
             :style="`border-color: ${cw.color}`">
      <img :src="cw.imageUrl"
           alt="logrocket"
           class="h-6" />
      <h3 class="text-base font-semibold my-1 capitalize text-grey-darkest">{{ cw.title }}</h3>
      <time datetime="2018-11"
            class="text-grey-dark text-xs font-semibold">{{ date }}</time>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cw: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      const date = new Date(this.cw.date)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
      }).format(date)
    },
  },
}
</script>

<style>
.my-rounded {
  border-radius: 1.5rem;
}
</style>
