<template>
  <div class="sign-up-page add-white-space">
    <b-card class='sign-up-form-container'>
      <b-card-body class='mx-2'>

        <h1 class='mt-2 mb-5'>
          Sign up
        </h1>

        <add-user-form/>

        <p class='mt-2'>
          Already registered?
          <router-link to='/sign-in'>Sign in here</router-link>
        </p>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import AddUserForm from '@/forms/user/AddUserForm'
export default {
  name: 'signUp',
  components: { AddUserForm }
}
</script>

<style scoped>
.sign-up-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-up-form-container {
  max-width: 800px;
}
</style>
