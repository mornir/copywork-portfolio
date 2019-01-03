<template>
  <div class="flex-1 flex justify-center items-center">
    <div class="text-center">
      <div v-if="error.statusCode === 404"
           class="mb-8">
        <h1 class="capitalize not-found mb-6">Page not found</h1>
        <p class="text-lg">We couldn't find what you were looking for.</p>
      </div>

      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/"
                 class="no-underline px-3 py-2 text-white font-semibold go-home rounded">Go to Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style scope>
.not-found {
  color: var(--main-color);
  font-family: 'Pacifico', cursive;
}

.go-home {
  background-color: var(--main-color);
}
</style>
