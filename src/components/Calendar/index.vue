<template>
  <div>
    <Filter 
      @updateFilter="updateFilter" 
      @getRooms="updateRooms"
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
          :items="rooms"
          :item-size="200"
          :buffer="200"
          v-slot="{ item }"
        >
          <DragAndDrop 
            :item="visits[item.id]" 
            :name="item.name"
            @updateVisit="updateVisit"
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
        v-if="id" 
        :dialogVisible="dialogVisible" 
        :row="activeRow"
        :arr="row({
          arr: visits.filter(i => activeRow === i.roomId),
          idRoom: activeRow,
        })"
        :room="roomOpen"
        :date="mouthYear"
        @close="dialogVisible = false"
        @addVisit="updateVisit"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { firestore } from '@/firebase.js'
import { getVisitsByMouth } from '@/services/visit.js'
import { getRooms } from '@/services/room.js'
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
    openModal: false,
    modalX: 0,
    modalY: 0,
    id: null,
    activeRow: null,
    dialogVisible: false,
    rooms: [],
    visits: [],
    visitsFb: [],
  }),
  computed: {
    roomOpen(){
      return this.rooms.find(i => this.activeRow === i.id)
    },
    mouth(){
      return moment(this.date).format("MM")
    },
    mouthYear(){
      return moment(this.date).format('MM/YY')
    },
    countDay() {
      return moment(this.date, "YYYY-MM").daysInMonth()
    }
  },
  methods:{
    row({arr, idRoom}){
      let obj = {}
      for(let i = 0; i < arr.length; i++){
        const item = arr[i]
        obj[item.start] = item
      }
      let id = 0;
      for(let j = 1; j < this.countDay + 1; j++){
        id++
        const item = obj[j]
        if(item){
          j = j + item.length - 1
        }else {
          obj[j] = {type: 'empty', day: j, id: j, roomId: idRoom}
        }
      }
      return Object.values(obj);
    },
    createVisits(){
      this.rooms.map(row => {
        this.visits[row.id] = this.row({arr: this.visitsFb.filter(i => i.roomId === row.id), idRoom: row.id})
      })
    },
    updateVisit() {
      this.getVisits()
    }, 
    async updateRooms() {
      await this.getRooms()
      this.createVisits()
    }, 
    // addVisit(newVisit) {
    //   this.visits = [ 
    //     ...this.visits, 
    //     newVisit 
    //   ];
    // }, 
    updateFilter({index, value}) {
      this[index] = value;
      this.getCalendar()
    },
    async getCalendar(){
      await this.getRooms()
      await this.getVisits()
    },
    async getRooms() {
      this.rooms = await getRooms()
    },
    async getVisits() {
      this.visitsFb = await getVisitsByMouth({mounthYear: moment(this.date).format("MM/YY")})
      this.createVisits()
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
      this.activeRow = row
      this.id = id
      if(id === this.id && this.openModal){
        this.closeModal()
      }else{
        this.openModal = true
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
    this.getCalendar()
  }
}
</script>

<style lang="scss">
@import '@/assets/components/calendar.scss';

</style>