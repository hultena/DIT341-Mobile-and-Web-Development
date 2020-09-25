<template>
  <div class="signUpPage">
    <h1>
      This the user sign up page
    </h1>
    <add-user-form/>
  </div>
</template>

<script>
import AddUserForm from '@/forms/AddUserForm'
export default {
  name: 'signUp',
  components: { AddUserForm }
}
</script>

<style scoped>
.signUpPage {}
</style>
