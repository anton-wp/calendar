<template>
  <div class="calendar-modal" :style="`top: ${modalY}px; left: ${modalX - 60}px`">
    <el-col :span="24">
      <el-card shadow="always"> 
        <span @click="$emit('openDialog')">Добавить</span>
        <!-- <span>Удалить</span> -->
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { ElCol, ElCard } from 'element-plus'

export default {
  components: {
    ElCol,
    ElCard
  },
  props: ['modalY', 'modalX']
}
</script>