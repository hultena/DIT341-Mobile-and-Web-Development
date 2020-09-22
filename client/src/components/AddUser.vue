<template>
 <div>
   <h3>Add User</h3>
   <div class="add">
    <form @submit="onSubmit">
      <input type="text" v-model="user" placeholder="Enter user name">
      <input type="text" v-model="email" placeholder="Enter user email">
      <input type="text" v-model="password" placeholder="Enter user password">
      <input type="submit" value="Submit">
    </form>
   </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddUser',
  data() {
    return {
      user: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['postUser']),
    onSubmit(e) {
      e.preventDefault()
      const newUser = {
        username: this.user,
        email: this.email,
        password: this.password
      }
      this.postUser(newUser)
    }
  }
}
</script>

<style scoped>
form {
  flex: 10;
}
input[type="text"]{
  flex: 2;
}
input[type="submit"]{

}

</style>
