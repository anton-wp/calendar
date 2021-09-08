<template>
  <div class="calendar-rooms__column">
    <span class="column-header-block">{{item.id}} room</span>
    <draggable 
      v-model="item.items" 
      group="list" 
      @end="dragEnd"
      @start="dragStart"
      :move="moveCard"
      item-key="id">
      <template #item="{element}">
        <ActiveCard v-if="element.days" :element="element" />
        <EmptyCard v-else :element="element" :row="item.id - 1" />
      </template>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
// components
import EmptyCard from "@/components/Calendar/emptyCard.vue"
import ActiveCard from "@/components/Calendar/activeCard.vue"

export default {
  components: {
    EmptyCard,
    ActiveCard,
    draggable
  },
  props: ['item', 'idKey', 'calendar'],
  data: () => ({
    element: null,
    newRow: null,
    drContext: null,
    futureIndex: null,
  }),
  methods: {
    clearDrag(){
      this.element = null;
      this.newRow = null;
      this.drContext = null;
      this.futureIndex = null;
    },
    moveCard(e){
      this.clearDrag()
      const indexRelated = e.relatedContext.index
      const draggetContext = e.draggedContext
      const listRelated = e.relatedContext.list
      const element = e.draggedContext.element
      const indexRow = e.draggedContext.index
      // если перетягуемый блок карточка
      if(!element.days) return false
      // только на пустые блоки
      const toArr = listRelated.slice(indexRelated, indexRelated + element.days)
      const found = toArr.some((el) => el.days);
      if(found) return false
      // если перетягиваем на карточку
      if(listRelated[indexRelated].days){
        return false
      }
      this.element = element;
      this.newRow = listRelated[0].row
      this.drContext = draggetContext
      this.futureIndex = indexRelated
      return false
    },
    dragEnd(e){
      e.item.classList.remove("dragg-block")
      if(!this.element) return
      let IdKey = this.idKey
      let emptyArr = [];
      for(let i = 0; i < this.element.days; i++){
        IdKey++
        emptyArr.push({
          id: IdKey, 
          row: this.element.row,
        })
      }
      let index = 0
      if(this.element.row === this.newRow){
        if(this.drContext.index < this.futureIndex)
        index = this.element.days - 1
      }


      const oldRow = this.calendar[this.element.row - 1].items

      this.$emit('updateRowCalendar', {
        index: this.element.row - 1,
        items: [
        ...oldRow.slice(0, this.drContext.index), 
        ...emptyArr, 
        ...oldRow.slice(this.drContext.index + 1)
        ]
      })
      IdKey++
      this.element.row = this.newRow
      this.element.id = IdKey
      const newRow = this.calendar[this.newRow - 1].items

      this.$emit('updateRowCalendar', {
        index: this.element.row - 1,
        items: [
        ...newRow.slice(0, this.futureIndex + index), 
        this.element, 
        ...newRow.slice(this.futureIndex + index + this.element.days)
        ]
      })
      this.$emit('updateIdKey', IdKey)
      this.clearDrag()
    },
    dragStart(e){
      e.item.classList.add("dragg-block")
    }
  }
}
</script>