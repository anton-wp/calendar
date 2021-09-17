<template>
  <div>
    <Header :items="header" />
    <TableBlock v-for="(table, key) in tables" :key="key" :table="table" />
  </div>
</template>

<script>
import Header from "@/components/Table/header.vue"
import TableBlock from "@/components/Table/tableBlock.vue"
export default {
  components: {
    Header,
    TableBlock,
  },
  data: () => ({
    header: [
      "Policy number",
      "Claim id",
      "Claim type",
      "Claim amount",
      "Auto-score",
      "Aging",
      "Status",
    ],
    tables: [
      {
        name: "New updates",
        count: 18,
        items: [
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
        ]
      },
      {
        name: "New updates",
        count: 18,
        items: [
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
        ]
      },
      {
        name: "New updates",
        count: 18,
        items: [
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
          {
            number: "CL0000000006",
            id: "C800561",
            types: ['medical', 'Trip Delay'],
            amount: {
              count: '250.00',
              type: 'SGD',
              percent: -16
            },
            score: 99,
            aging: 4,
            status: {
              type: 'N',
              name: 'new',
              badge: 'Additional Claim'
            }
          },
        ]
      },
    ]
  })
}
</script>

<style lang="scss">
$grey: grey;
$blue: #4C7BD5;
$green: green;
$red: #DEA098;
$white: white;

.wrapp-header{
  border-bottom: 1px solid $grey;
  text-transform: uppercase;
  color: $grey;
  background: $white;
  z-index: 2;
  position: relative;
}
.wrapp-item, .wrapp-header{
  display: grid;
  grid-template-columns: 1fr .7fr 1.5fr 1.5fr .7fr .7fr .7fr;
  gap: 12px;
  padding: 12px;
}
.wrapp-item{
  border-bottom: 1px solid $grey;
  padding: 10px;
  font-size: 12px;
  .item{
    &-number{
      font-weight: 600;
    }
    &-type{
      display: flex;
    }
    &-badge{
      border-radius: 2px;
      border: 1px solid $grey;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      margin: 0 5px;
    }
    &-amount{
      display: flex;
      &__type{
        color: $grey;
      }
      &__percent{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 5px;
        height: 12px;
        &.danger{
          background: $red;
        }
        &.success{
          background: $green;
        }
        &.disabled{
          background: $grey;
        }
      }
    }
    &-score{
      .success{
        color: $green;
      }
      .danger{
        color: $red;
      }
    }
    &-status{
      display: flex;
    }
  }
}
.table{
  overflow: auto;
  &-accordion{
    background: $white;
    color: $blue;
    display: flex;
    align-items: center;
    z-index: 2;
    position: relative;
    &__chevron{
      transform: rotate(270deg);
      transition: all .3s;
      &.open{
        transform: rotate(90deg)
      }
    }
    &__title{
      font-weight: 600;
    }
    &__counter{
      background: $red;
      border-radius: 50%;
      color: $white;
      font-size: 10px;
      width: 15px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.slide-accordion-enter-active {
   animation: accordion .5s;
}
.slide-accordion-leave-active {
    animation: accordion .5s reverse;
}
@keyframes accordion {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

</style>