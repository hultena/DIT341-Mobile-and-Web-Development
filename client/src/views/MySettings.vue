<template>
  <div class="settingsPage">
    <h1>
      This is the user settings page.
    </h1>
    <edit-user-form/>
    <b-button
      @click="destroyAll"
      variant="danger">
      DANGER!
    </b-button>
  </div>
</template>

<script>
import EditUserForm from '@/forms/EditUserForm'
import { mapActions } from 'vuex'
export default {
  name: 'mySettings',
  components: { EditUserForm },
  methods: {
    ...mapActions(['deleteAllUsers']),
    destroyAll() {
      // TODO: remove this button after milestone 2
      console.log('help')
      this.$router.push('/')
      location.reload()
      this.deleteAllUsers()
    }
  }
}
</script>

<style scoped>
.settingsPage {}
</style>
