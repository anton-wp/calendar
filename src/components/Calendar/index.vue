<template>
  <div>
    <Filter @updateFilter="updateFilter"/> 
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
        :dialogVisible="dialogVisible" 
        :calendar="calendar"
        :row="activeRow"
        @close="dialogVisible = false"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
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
    countRooms: 1000,
    calendar: [],
    openModal: false,
    modalX: 0,
    modalY: 0,
    id: null,
    activeRow: null,
    idKey: null,
    dialogVisible: false,
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
    updateRowCalendar({index, items}){
      this.calendar[index].items = items
    },
    genereteArr(){
      let id = 0;
      let arrRooms = [];
      for(let i = 1; i < this.countRooms; i++){
        let arrDays = [];
        let day = 1
        for(let j = 1; j < this.countDay - 4; j++){
          id++
          if(j === 3){
            arrDays.push({id, days: 2, row: i})
            day = day + 2
          }else if(j === 2){
            arrDays.push({id, days: 4, row: i})
            day = day + 4
          }else if(j === 1){
            arrDays.push({id, days: 1, row: i})
            day = day + 1
          }else if(j === 5){
            arrDays.push({id, days: 2, row: i})
            day = day + 2
          }else {
            arrDays.push({id, row: i, day})
            day++
          }
        }
        arrRooms.push({id: i, items: arrDays})
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
      if(id === this.id){
        this.closeModal()
      }else{
        this.openModal = true
        this.id = id
        this.activeRow = row
        this.modalX = x
        this.modalY = y
      }
    },
    onClickOutsideCalendar(e){
      this.closeModal()
    },
    closeModal(){
      this.openModal = false
      // this.id = null
      // this.activeRow = null
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
  margin: 20px;
}
.calendar{
  margin: 20px;
  display: flex;
  overflow-y: auto;
  max-height: 700px;
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