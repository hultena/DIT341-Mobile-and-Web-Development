<template>
 <div>
   <h3>Add User</h3>
   <div>
     <ValidationObserver ref="form" v-slot="{ passes }">
       <form @submit.prevent="passes(onSubmit)">
         <ValidationProvider vid="username" name="Username" v-slot="{ errors }">
           <input v-model="username" type="text" placeholder="Username">
           <span>{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider vid="email" name="E-mail" v-slot="{ errors }">
           <input v-model="email" type="text" placeholder="Email">
           <span>{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider vid="password" name="Password" v-slot="{ errors }">
           <input v-model="password" type="password" placeholder="Password">
           <span>{{ errors[0] }}</span>
         </ValidationProvider>

         <button type="submit">Sign up</button>
       </form>
     </ValidationObserver>
   </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'AddUser',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['postUser']),
    async onSubmit(e) {
      // e.preventDefault()
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      const message = await this.postUser(newUser)
      if (message) {
        this.$refs.form.setErrors(message)
      }
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
