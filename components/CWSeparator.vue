<template>
  <hr class="w-48 bg-red-dark h-1 border-none rounded-full"
      :style="`background-color: ${color}`">
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
</style>
