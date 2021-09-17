<template>
  <div class="wrapp-item">
    <div class="item-number">{{row.number}}</div>
    <div class="item-id">{{row.id}}</div>
    <div class="item-type">
      <div class="item-badge" v-for="(item, key) in row.types" :key="key">
        {{item}}
      </div>
    </div>
    <div class="item-amount">
      <span class="item-amount__type">{{row.amount.type}}</span>
      <span class="item-amount__count">{{row.amount.count}}</span>
      <div class="item-amount__percent" :class="typePercent">{{row.amount.percent}}%</div>
    </div>
    <div class="item-score">
      <span :class="typeScore">
        {{row.score}}
      </span>
      /100
    </div>
    <div class="item-day">{{row.aging}}days</div>
    <div class='item-status'>
      <span class="item-status__badge">{{row.status.type}}</span>
      <span>{{row.status.name}}</span>
      <span class="item-badge" v-if="row.status.badge">{{row.status.badge}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['row'],
  computed: {
    typePercent(){
      if(this.row.amount.percent > 0) return "danger"
      if(this.row.amount.percent < 0) return "success"
      if(this.row.amount.percent === 0) return "disabled"
    },
    typeScore(){
      if(this.row.score > 50) return "success"
      else return "danger"
    }
  }
}
</script>