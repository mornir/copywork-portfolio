<template>
  <main class="flex flex-col min-h-screen">
    <CwHeader />
    <nuxt />
    <CwFooter />
  </main>
</template>

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
