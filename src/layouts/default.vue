<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    :default-active="$route.name"
  >
    <el-menu-item 
      index="home" 
      :route="{name: 'home'}">
      Home
    </el-menu-item>
    <el-menu-item 
      v-if="!loggedIn" 
      index="signIn" 
      :route="{name: 'signIn'}">
      SignIn
    </el-menu-item>
    <el-menu-item 
      v-if="loggedIn" 
      index="calendar" 
      :route="{name: 'calendar'}">
      Calendar
    </el-menu-item>
    <el-menu-item 
      v-if="loggedIn" 
      index="logout" 
      class='ml-auto'>
      <el-button type="danger" @click="logout">
        Logout
      </el-button>
    </el-menu-item>
  </el-menu>
</template>

<script>
import firebase from 'firebase'
import { ElMenuItem, ElMenu, ElButton } from 'element-plus'
import { mapState } from 'vuex'
export default {
  components: {
    ElMenuItem,
    ElMenu,
    ElButton
  },
  computed: {
    ...mapState({
      loggedIn: state => state.user.loggedIn,
    }),
  },
  methods: {
    logout(){
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.ml-auto{
  margin-left: auto !important;
}
</style>