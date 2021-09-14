<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :default-active="$route.name"
    :router="true"
    @select="handleSelect"
  >
    <el-menu-item index="home" :route="{name: 'home'}">
      Home
    </el-menu-item>
    <el-menu-item index="signIn" :route="{name: 'signIn'}">
      SignIn
    </el-menu-item>
    <el-menu-item index="calendar" :route="{name: 'calendar'}">
      Calendar
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ElMenuItem, ElMenu } from 'element-plus'
export default {
  components: {
    ElMenuItem,
    ElMenu
  }
}
</script>