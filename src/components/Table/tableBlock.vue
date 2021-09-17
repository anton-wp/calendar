<template>
  <div class="table">
    <div class="table-accordion" @click="open">
      <span class="table-accordion__chevron" :class="{'open': accordionActive}">></span>
      <span class="table-accordion__title">{{table.name}}</span>
      <span class="table-accordion__counter">{{table.count}}</span>
    </div>
    <transition name="slide-accordion" >
      <div v-if="accordionActive" class="table-body">
        <TableRow v-for="(row, key) in table.items" :row="row" :key="key"/>
      </div>
    </transition>
  </div>
</template>

<script>
import TableRow from "@/components/Table/tableRow.vue"
export default {
  components: {
    TableRow
  },
  props: ['table'],
  data: () => ({
    accordionActive: false,
  }),
  methods: {
    open(){
      this.accordionActive = !this.accordionActive
    }
  }
}
</script>