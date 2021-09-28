<template>
  <div>
    <DefaultLayout />
    <router-view />
  </div>
</template>

<script>
import DefaultLayout from './layouts/default.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Arial, sans-serif;
}
</style>
