<template>
  <main class="flex flex-col min-h-screen">
    <CWHeader />
    <nuxt />
    <CWFooter />
  </main>
</template>

<script>
import CWHeader from '@/components/CWHeader'
import CWFooter from '@/components/CWFooter'

export default {
  components: {
    CWHeader,
    CWFooter,
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700|Pacifico');

:root {
  --main-color: #3d4852;
}

.header-footer-bg {
  background-color: var(--main-color);
}

body {
  font-family: 'Montserrat', sans-serif;
}

footer {
  font-family: 'Pacifico', cursive;
}
</style>
