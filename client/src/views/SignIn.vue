<template>
  <div class="signInPage">
    <h1>
      This is the user sign in page.
    </h1>
    <user-log-in-form/>
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
.signInPage {}
</style>
