<template>
  <div class="block-room empty-block" :style="`height: 48px`">
    <div class="click-block"><div :id="element.id" :data-row="element.idRoom"></div></div>
    <el-icon>
      <plus />
    </el-icon>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons'

export default {
  props: ['element'],
  components: {
    Plus
  },
}
</script>