<template>
  <nuxt-link :to="cw.slug"
             class="no-underline focus:outline-none">
    <article class="border-purple-dark border-2 p-4 text-center my-rounded"
             :style="`border-color: ${cw.color}`">
      <img :src="cw.imageUrl"
           :alt="cw.title"
           class="h-6 inline" />
      <h3 class="text-base font-semibold my-1 capitalize text-grey-darkest">{{ cw.title }}</h3>
      <time datetime="2018-11"
            class="text-grey-darker text-xs font-semibold">{{ date }}</time>
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
.my-rounded {
  border-radius: 1.5rem;
}

a:focus article {
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
}
</style>
