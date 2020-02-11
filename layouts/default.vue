<template>
  <main class="flex flex-col min-h-screen">
    <div v-if="showNotif"
         class="py-2 font-semibold text-center text-white bg-red-light">🚀 I have moved my portfolio over to <a class="text-black"
         href="https://copywork.netlify.com?from=surge">copywork.netlify.com</a></div>
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
  data() {
    return {
      showNotif: false,
    }
  },
  mounted() {
    if (location.hostname.includes('surge')) {
      this.showNotif = true
    } else {
      this.showNotif = false
    }
  },
}
</script>


<style>
:root {
  --main-color: #3d4852;
  --secondary-color: #fff;
}

.accessible-text-color {
  color: var(--secondary-color);
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
