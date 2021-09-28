<template>
  <div class="block-room" :style="`height: ${element.length * 50}px`">
    <div class="block-room__card" :style="`border-top: 5px solid ${color}`">
      <div class="block-room-content">
        {{element.length + ' ' + element.client}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['element'],
  computed: {
    color(){
      const colors = ['#fc5545', '#FCCCD1', '#005E61','#42BA80', '#ffcf6f','#F57859', '#FABD91', '#ebebeb','#2e2e2e', '#29A8BF','#B8E3EB', '#142447',]
      return colors[Math.round(Math.random() * 11)]
    }
  }
}
</script>