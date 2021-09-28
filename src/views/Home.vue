<template>
  <div>
    <Table />
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue"
import { provide } from 'vue'
export default {
  components: {
    Table
  },
  mounted() {
    this.axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/280fb559-9ddd-49a7-a46b-5e25d3c97862/new_assigned.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210920T100317Z&X-Amz-Expires=86400&X-Amz-Signature=4fede7b3d04908b0b48f9001cc1bb6cf13b72e1f86a745beaa56dc4c9271c168&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22new_assigned.json%22').then((response) => {
      console.log(response.data)
      this.$emit('click', '12312')
    })
  }
}
</script>