<template>
  <hr
    class="w-48 h-1 mx-auto border-none rounded-full "
    :style="`background-color: ${color}`"
  />
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
