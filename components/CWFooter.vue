<template>
  <footer class="bg-grey-darkest p-4"
          :style="`background-color: ${color}`">
    <blockquote class="text-white text-center mt-3 mb-8 leading-normal"
                cite="https://www.goodreads.com/author/quotes/5217.George_Bernard_Shaw">Imitation is not just the sincerest form of flattery<br /> - it's the sincerest form of learning.</blockquote>

    <CWSocials />

  </footer>
</template>

<script>
import CWSocials from '@/components/CWSocials'
export default {
  data() {
    return {
      color: '#3D4852',
    }
  },
  created() {
    this.$root.$on('changeColor', color => (this.color = color))
  },
  components: {
    CWSocials,
  },
}
</script>

<style>
.justify-evenly {
  justify-content: space-evenly;
}
</style>
