<template>
  <el-button type="primary" @click="login">login with google</el-button>
</template>

<script>
import firebase from 'firebase'
import { ElButton } from 'element-plus'

export default {
  components: {
    ElButton
  },
  methods: {
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth() // get the auth api
        .signInWithPopup(provider)
        .then((data) => {
          this.$router.push({name: 'home'})
        })
        .catch(error => {
          console.log(error.code)
        });
    }
  }
}
</script>