<template>
  <div class="calendar-rooms__column">
    <span class="column-header-block">{{item.name}}</span>
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
  emits: ["updateRowCalendar", "updateIdKey"],
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
      const newRow = listRelated[0].row
      // если перетягуемый блок карточка
      if(!element.days) return false
      // только на пустые блоки
      const toArr = listRelated.slice(indexRelated, indexRelated + element.days)
      const found = toArr.some((el) => el.days);
      if(found) return false
      // проверка по нижней границе
      if(element.days > toArr.length) return false
      // если перетягиваем на карточку
      if(listRelated[indexRelated].days){
        return false
      }
      this.element = element;
      this.newRow = newRow
      this.drContext = draggetContext
      this.futureIndex = indexRelated
      return false
    },
    getDay(newIndex, newRow){
      if(newIndex === 0){
        return 1  
      }else if(newIndex < newRow.length - 1 && newRow[newIndex - 1].dayStart){
        return newRow[newIndex - 1].dayStart + newRow[newIndex - 1].days;
      }else if(newIndex < newRow.length - 1 && newRow[newIndex - 1].day){
        return newRow[newIndex - 1].day + 1;
      }
    },
    async dragEnd(e){
      e.item.classList.remove("dragg-block")
      if(!this.element) return
      let IdKey = this.idKey
      let newRow = this.calendar[this.newRow].items
      let emptyArr = [];
      for(let i = 0; i < this.element.days; i++){
        IdKey++
        const day = this.getDay(this.drContext.index, newRow)
        emptyArr.push({
          id: IdKey, 
          row: this.element.row,
          day: day + i 
        })
      }
      let index = 0
      if(this.element.row === this.newRow){
        if(this.drContext.index < this.futureIndex)
          index = this.element.days - 1
      }

      const oldRow = this.calendar[this.element.row].items

      this.$emit('updateRowCalendar', {
        index: this.element.row,
        items: [
        ...oldRow.slice(0, this.drContext.index), 
        ...emptyArr, 
        ...oldRow.slice(this.drContext.index + 1)
        ]
      })
      
      IdKey++
      const newIndex = this.futureIndex + index
      this.element.row = this.newRow
      this.element.id = IdKey
      newRow = this.calendar[this.newRow].items
      this.element.dayStart = this.getDay(newIndex, newRow) 

      this.$emit('updateRowCalendar', {
        index: this.element.row,
        items: [
        ...newRow.slice(0, newIndex), 
        this.element, 
        ...newRow.slice(newIndex + this.element.days)
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