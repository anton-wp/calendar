<template>
  <div class="calendar-rooms__column">
    <span class="column-header-block">{{name}}</span>
    <draggable 
      v-model="item" 
      group="list" 
      @end="dragEnd"
      @start="dragStart"
      :move="moveCard"
      item-key="id">
      <template #item="{element}">
        <ActiveCard v-if="element.start" :element="element" />
        <EmptyCard v-else :element="element" />
      </template>
    </draggable>
  </div>
</template>
<script>
import { updateVisit } from '@/services/visit.js'

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
  props: [ 'item', 'name' ],
  emits: [ "updateVisit" ],
  data: () => ({
    element: null,
    newRow: null,
  }),
  methods: {
    clearDrag(){
      this.element = null;
      this.newRow = null;
    },
    moveCard(e){
      this.clearDrag()
      const indexRelated = e.relatedContext.index
      const listRelated = e.relatedContext.list
      const element = e.draggedContext.element
      const newRow = listRelated[0].roomId
      // если перетягуемый блок карточка
      if(!element.start) return false
      // только на пустые блоки
      const toArr = listRelated.slice(indexRelated, indexRelated + element.length)
      const found = toArr.some((el) => el.length);
      if(found) return false
      // проверка по нижней границе
      if(element.length > toArr.length) return false
      // если перетягиваем на карточку
      if(listRelated[indexRelated].length){
        return false
      }
      this.element = {...element, start: listRelated[indexRelated].day};
      this.newRow = newRow ?? this.element.roomId

      return false
    },
    async dragEnd(e){
      if(!this.element) return
      e.item.classList.remove("dragg-block")

      await updateVisit({...this.element, roomId: this.newRow })
      this.$emit('updateVisit', {...this.element, roomId: this.newRow })
      this.clearDrag()
    },
    dragStart(e){
      e.item.classList.add("dragg-block")
    }
  }
}
</script>