<template>
  <div class='sign-in-page add-white-space'>
    <b-card class='sign-in-form-container'>
      <b-card-body class='mx-2'>

        <h1 class='mt-2 mb-5'>
          Sign in
        </h1>

        <user-log-in-form />

        <p class='mt-2'>
          Not a member yet?
          <router-link to='/sign-up'>Sign up instead</router-link>
        </p>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import UserLogInForm from '@/forms/user/UserLogInForm'
export default {
  name: 'signIn',
  components: { UserLogInForm }
}
</script>

<style scoped>
.sign-in-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-in-form-container {
  max-width: 800px;
}
</style>
