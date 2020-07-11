<template>
  <nuxt-link :to="cw.slug" class="no-underline focus:outline-none">
    <article
      class="p-4 text-center border-2 border-purple-dark"
      :style="`border-color: ${cw.color}; border-radius: 1.5rem`"
    >
      <img :src="cw.imageUrl" :alt="cw.title" class="inline h-6" />
      <h3 class="my-1 text-base font-semibold capitalize text-grey-darkest">
        {{ cw.title }}
      </h3>
      <time datetime="2018-11" class="text-xs font-semibold text-grey-darker">{{
        date
      }}</time>
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

<style scoped>
a:focus article {
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
}
</style>
