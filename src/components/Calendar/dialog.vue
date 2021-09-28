<template>
  <el-dialog
    :title="`Добавить бронирование ${room ? room.name : ''}`"
    v-model="dialogVisible"
    width="30%"
  >
    <span class="demo-input-label">Client</span>
    <el-input placeholder="Client" :class="{'error': validClient}" v-model="client"></el-input>
    <span class="demo-input-label">Date start</span>
    <el-date-picker 
      v-model="dateStart" 
      :disabledDate="disabledDateStart" 
      :class="{'error': validDateStart}"
      type="date" 
      placeholder="Pick a day"
    >
    </el-date-picker>
    <span v-if="dateStart" class="demo-input-label">Date end</span>
    <el-date-picker 
      v-if="dateStart"
      v-model="dateEnd" 
      :class="{'error': validDateEnd}"
      :disabledDate="disabledDateEnd" 
      type="date" 
      placeholder="Pick a day"
    >
    </el-date-picker>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="addEvent"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import moment from 'moment';
import { ElDialog, ElButton, ElDatePicker } from 'element-plus'
import { createVisit } from '@/services/visit.js'
export default {
  components: {
    ElDialog,
    ElDatePicker,
    ElButton
  },
  props: ["dialogVisible", "room", "row", "arr", "date"],
  emits: [ "close", "updateIdKey", "addVisit"],
  data: () => ({
    dateStart: null,
    dateEnd: null,
    client: null,
    click: false,
  }),
  watch: {
    dialogVisible() {
      this.dateStart = null;
      this.dateEnd = null;
      this.client = null;
    }
  },
  computed: {
    validClient(){
      return this.click && !this.client
    },
    validDateStart(){
      return this.click && !this.dateStart
    },
    validDateEnd(){
      return this.click && !this.dateEnd
    },
    dayArr() {
      return this.arr.map(item => item.day)
    },
    endDayArr(){
      const indexStart = this.dayArr.findIndex(item => item === Number(moment(this.dateStart).format('DD')))
      let arr = []
      for(let i = indexStart; i < 31; i++){
        arr.push(this.dayArr[i]);
        if(this.dayArr[i + 1] !== this.dayArr[i] + 1) break
      }
      return arr
    }
  },
  methods: {
    close(){
      this.click = false;
      this.$emit('close')
    },
    disabledDateStart(e){
      const day = Number(moment(e).format('DD'))
      return !this.dayArr.includes(day)
    },
    disabledDateEnd(e){
      const day = Number(moment(e).format('DD'))
      return !this.endDayArr.includes(day)
    },
    async addEvent(){
      this.click = true;
      if(this.validClient || this.validDateStart || this.validDateEnd) return

      const dayEnd = Number(moment(this.dateEnd).format('DD'));
      const dayStart = Number(moment(this.dateStart).format('DD'));
      const days = dayEnd - dayStart + 1

      const data = {
        name: this.client,
        length: days,
        mounthYear: this.date,
        roomId: this.row,
        start: Number(moment(this.dateStart).format('DD')),
      }
      const id = await createVisit(data)
      this.$emit('addVisit')
      this.close()
    }
  }
}
</script>