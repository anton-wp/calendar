<template>
  <div class="filter">
    <el-date-picker v-model="date" @change="changeDate" type="month" placeholder="Выберете дату">
    </el-date-picker>
  </div>
</template>

<script>
import { ElDatePicker} from 'element-plus'

export default {
  components: {
    ElDatePicker,
  },
  data: () => ({
    date: new Date,
  }),
  methods: {
    changeDate(value) {
      this.$emit('updateFilter', {index: 'date', value})
    }
  }
}
</script>