<template>
  <div>
    <Calendar />
  </div>
</template>

<script>
import Calendar from './components/Calendar/index.vue'

export default {
  name: 'App',
  components: {
    Calendar,
  }
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
