<template>
  <div class="filter">
    <el-date-picker v-model="date" @change="changeDate" type="month" placeholder="Выберете дату">
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
import { ElDatePicker, ElButton} from 'element-plus'
import { firestore } from '@/firebase.js'

export default {
  components: {
    ElDatePicker,
    ElButton,
  },
  data: () => ({
    date: new Date,
    roomName: null,
    click: false
  }),
  computed: {
    validRoomName(){
      return this.click && !this.roomName
    }
  },
  methods: {
    changeDate(value) {
      this.$emit('updateFilter', {index: 'date', value})
    },
    async addRoom(){
      this.click = true
      if(this.validRoomName) return
      await firestore.collection("calendar").doc('09.21').update({
        [this.roomName]: {
          days: [] 
        }
      });
      this.click = false
      this.roomName = null
    }
  }
}
</script>