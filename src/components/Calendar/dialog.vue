<template>
  <el-dialog
    title="Добавить бронирование"
    v-model="dialogVisible"
    width="30%"
  >
    <el-date-picker v-model="dateStart" 
      :disabledDate="disabledDateStart" 
      type="date" 
      placeholder="Pick a day"
    >
    </el-date-picker>
    <el-date-picker 
      v-if="dateStart"
      v-model="dateEnd" 
      :disabledDate="disabledDateEnd" 
      type="date" 
      placeholder="Pick a day"
    >
    </el-date-picker>
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
import moment from 'moment';
import { ElDialog, ElButton, ElDatePicker } from 'element-plus'
export default {
  components: {
    ElDialog,
    ElDatePicker,
    ElButton
  },
  props: ["dialogVisible", "calendar", "row"],
  data: () => ({
    dateStart: null,
    dateEnd: null,
  }),
  computed: {
    dayArr() {
      return this.calendar[this.row].items.filter(item => item.day).map(item => item.day)
    },
    endDayArr(){
      const indexStart = this.dayArr.findIndex(item => item === Number(moment(this.dateStart).format('DD')))
      let arr = []
      for(let i = indexStart; i < 31; i++){
        arr.push(this.dayArr[i]);
        if(this.dayArr[i + 1] !== this.dayArr[i] + 1) break
      }
      for(let i = indexStart; i > 0; i--){
        arr.push(this.dayArr[i]);
        if(this.dayArr[i - 1] !== this.dayArr[i] - 1) break
      }
      return arr
    }
  },
  methods: {
    disabledDateStart(e){
      const day = Number(moment(e).format('DD'))
      return !this.dayArr.includes(day)
    },
    disabledDateEnd(e){
      const day = Number(moment(e).format('DD'))

      return !this.endDayArr.includes(day)
    }
  }
}
</script>