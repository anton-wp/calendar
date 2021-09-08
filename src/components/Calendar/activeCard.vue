<template>
  <div class="block-room" :style="`height: ${element.days * 50}px`">
    <div class="block-room__card">
      {{element.days}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['element']
}
</script>