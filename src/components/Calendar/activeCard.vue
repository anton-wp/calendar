<template>
  <div class="block-room" :style="`height: ${element.days * 50}px`">
    <div class="block-room__card">
      <div class="block-room-content">
        {{element.days + ' ' + element.client}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['element']
}
</script>