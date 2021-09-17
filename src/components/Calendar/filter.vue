<template>
  <div class="filter">
    <el-date-picker v-model="date" @change="changeDate" :clearable="false" type="month" placeholder="Выберете дату">
    </el-date-picker>
    <div class="filter-room">
      <div class="filter-room-input">
        <span class="demo-input-label">Room</span>
        <el-input placeholder="Client" :class="{'error': validRoomName}" v-model="roomName"></el-input>
      </div>
      <el-button @click="addRoom">Add room</el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ElDatePicker, ElButton} from 'element-plus'
import { firestore } from '@/firebase.js'

export default {
  components: {
    ElDatePicker,
    ElButton,
  },
  props: ['calendar', 'idKey', 'countDay'],
  emits: ["updateIdKey", "updateFilter", "updateRowCalendar"],
  data: () => ({
    date: new Date,
    roomName: null,
    click: false
  }),
  computed: {
    validRoomName(){
      return this.click && !this.roomName
    },
    emptyRow() {
      let arrDays = [];
      let id = this.idKey
      let day = 1
      for(let j = 1; j < this.countDay + 1; j++){
        id++
        arrDays.push({id, row: this.calendar.length, day})
        day++
      }
      this.$emit('updateIdKey', id)
      return arrDays
    }
  },
  methods: {
    changeDate(value) {
      this.$emit('updateFilter', {index: 'date', value})
    },
    async addRoom(){
      this.click = true
      if(this.validRoomName) return
      this.$emit('updateRowCalendar', {
        index: this.calendar.length,
        items: this.emptyRow,
        name: this.roomName,
      })
      this.click = false
      this.roomName = null
    }
  }
}
</script>