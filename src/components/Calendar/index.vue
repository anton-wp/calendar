<template>
  <div>
    <Filter 
      :calendar="calendar"
      :countDay="countDay"
      :idKey="idKey"
      @updateIdKey="updateIdKey" 
      @updateFilter="updateFilter" 
      @updateRowCalendar="updateRowCalendar" 
    /> 
    <div class="calendar" @scroll="closeModal()">
      <div class="calendar-leftHeader">
        <div class="leftHeader-block" v-for="(item, key) in countDay + 1" :key="key">
          <template v-if="key === 0"> 
          </template>
          <template v-else>
            {{item - 1 + '.' + mouth}}
          </template>
        </div>
      </div>
      <div 
        class="calendar-rooms" 
        :style="`height: ${(countDay + 2) * 50}px`" 
        @click="click"
        v-click-outside="onClickOutsideCalendar"
      >
        <RecycleScroller
          @scroll="closeModal()"
          class="scroller"
          direction="horizontal"
          key-field="id"
          :items="calendar"
          :item-size="200"
          :buffer="200"
          v-slot="{ item }"
        >
          <DragAndDrop 
            :item="item" 
            :idKey="idKey" 
            :calendar="calendar" 
            @updateIdKey="updateIdKey" 
            @updateRowCalendar="updateRowCalendar" 
          />
        </RecycleScroller>
      </div>
      <Dropdown 
        v-if="openModal" 
        :modalY="modalY" 
        :modalX="modalX" 
        @openDialog="dialogVisible = true" 
      />
      <Dialog
        v-if="calendar && id" 
        :dialogVisible="dialogVisible" 
        :calendar="calendar"
        :row="activeRow"
        :idKey="idKey"
        @updateIdKey="updateIdKey" 
        @updateRowCalendar="updateRowCalendar"
        @close="dialogVisible = false"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { firestore } from '@/firebase.js'
import { RecycleScroller } from 'vue-virtual-scroller'
import vClickOutside from 'click-outside-vue3'
import Dialog from "@/components/Calendar/dialog.vue"
import Dropdown from "@/components/Calendar/dropdown.vue"
import DragAndDrop from "@/components/Calendar/dragAndDrop.vue"
import Filter from "@/components/Calendar/filter.vue"

export default {
  components: {
    Dialog,
    Dropdown,
    Filter,
    RecycleScroller,
    DragAndDrop,
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: () => ({
    date: new Date,
    calendar: [],
    openModal: false,
    modalX: 0,
    modalY: 0,
    id: null,
    activeRow: null,
    idKey: null,
    dialogVisible: false,
    rooms: null
  }),
  computed: {
    mouth(){
      return moment(this.date).format("MM")
    },
    countDay() {
      return moment(this.date, "YYYY-MM").daysInMonth()
    }
  },
  methods:{
    updateFilter({index, value}) {
      this[index] = value;
      this.genereteArr()
    },
    updateIdKey(id){
      this.idKey = id
    },
    async updateRowCalendar({index, items, name}){
      if(name) {
        this.calendar =[
          ...this.calendar,
          {
            name,
            items: [],
            id: this.calendar.length
          } 
        ] 
      }
      const cards = {}
      items.filter(item => item.dayStart).map(item => {
        cards[item.dayStart] = {
          client: item.client,
          finish: item.dayStart + item.days - 1 
        }
      })

      this.calendar[index].items = items
      const tutorialsRef = await firestore.collection("calendar").doc(moment(this.date).format("MM.YY")).update({
        [this.calendar[index].name]: {
          days: cards 
        }
      });
    },
    async getCalendar(){
      const tutorialsRef = await firestore.collection("calendar").doc(moment(this.date).format("MM.YY")).get();
      if (!tutorialsRef.exists) return null
      return tutorialsRef.data();
    },
    async genereteArr(){
      this.rooms = await this.getCalendar()
      if(!this.rooms){
        this.calendar = []
        return
      }
      const roomsKeys = Object.keys(this.rooms)
      let id = 0;
      let arrRooms = [];
      for(let i = 0; i < roomsKeys.length; i++){
        let arrDays = [];
        let day = 1
        for(let j = 1; j < this.countDay + 1; j++){
          id++
          const item = this.rooms[roomsKeys[i]].days[j]
          if(item){
            const dayActive = item.finish - j + 1
            arrDays.push({id, days: dayActive, row: i, dayStart: day, client: item.client})
            j = j + dayActive - 1
            day = day + dayActive
          }else {
            arrDays.push({id, row: i, day})
            day++
          }
        }
        arrRooms.push({id: i, name: roomsKeys[i] , items: arrDays})
        arrDays = []
      }
      this.calendar = arrRooms
      this.idKey = id
    },
    click(e){
      if(e.toElement.className !== 'click-block'){
        this.closeModal()
        return
      }
      const row = e.toElement.children[0].dataset.row
      const id = e.toElement.children[0].id
      const x = e.toElement.children[0].getBoundingClientRect().x
      const y = e.toElement.children[0].getBoundingClientRect().y
      if(id === this.id && this.openModal){
        this.closeModal()
      }else{
        this.openModal = true
        this.id = id
        this.activeRow = Number(row) + 1
        this.modalX = x
        this.modalY = y
      }
    },
    onClickOutsideCalendar(e){
      this.closeModal()
    },
    closeModal(){
      this.openModal = false
      this.modalX = 0
      this.modalY = 0
    },

  }, 
  mounted() {
    this.genereteArr()
  }
}
</script>
<style lang="scss">
$colorBorder:  #DBE5EF;
$backgroundCalendar: #F1F7FC;



.filter{
  display: flex;
  flex-direction: column;
  margin: 20px;
  .demo-input-label{
    font-size: 12px;
  }
  .el-input{
    width: 300px;
  }
  .filter-room{
    display: flex;
    &-input{
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    .el-button{
      max-height: 40px;
      margin-top: auto;
      margin-left: 10px;
    }
  }
}
.error{
  &.el-input{
    input{
      border: 1px solid red;
    }
  }
}
.calendar{
  margin: 20px;
  display: flex;
  overflow-y: auto;
  max-height: 700px;
  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-input{
      margin: 5px 0;
      width: 100%;
    }
    .demo-input-label{
      margin-right: auto;
    }
  }
  &-leftHeader{
    width: auto;
    height: 100%;
    background: $backgroundCalendar;
  }
  .calendar-rooms{
    max-width: calc(100% - 120px);
    display: flex;
    background: $backgroundCalendar;
    &__column{
      border-right: 1px solid $colorBorder;
      border-left: 1px solid $colorBorder;
      .column-header-block{
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 200px;
        color: #878F95;
      }
      .block-room{
        position: relative;
        cursor: pointer;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.dragg-block{
          .block-room__card{
            border: 1px dashed #3E79B9;
            background: #DFEDFA;
          }
          .block-room-content{
            display: none;
          }
        }
        &.empty-block{
          border-top: 1px solid $colorBorder;
          border-bottom: 1px solid $colorBorder;
        }
        &__card{
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          width: 100%;
          height: calc(100% - 10px);
          margin: 5px;
          background: white;
          border-radius: 5px;
        }
        .click-block{
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .leftHeader-block{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    color: #878F95;
  }
  &-modal{
    position: fixed;
    .el-card__body{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        padding: 0 0 10px 0;
        font-size: 16px;
        cursor: pointer;
        font-weight: 600;
        color: #409EFF;
        transition: all 0.3s;
        &:hover{
          color:#395378;
        }
        &:last-child{
          padding: 0;
        }
      }
    }
  }
}
</style>