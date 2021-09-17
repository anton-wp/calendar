<template>
  <div class="wrapp-header">
    <div v-for="(item, key) in items" :key="key">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"]
}
</script>

