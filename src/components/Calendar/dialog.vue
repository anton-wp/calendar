<template>
  <el-dialog
    title="Tips"
    v-model="dialogVisible"
    width="30%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Cancel</el-button>
        <el-button type="primary" @click="$emit('close')"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ElDialog, ElButton } from 'element-plus'
export default {
  components: {
    ElDialog,
    ElButton
  },
  props: ["dialogVisible"]
}
</script>