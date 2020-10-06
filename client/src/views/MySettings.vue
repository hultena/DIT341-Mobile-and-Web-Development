<template>
  <div class='settingsPage mt-5'>
    <h3>
      Edit your user settings
    </h3>
    <b-card>
      <b-card-body>
        <edit-user-form/>
      </b-card-body>
    </b-card>
    <b-button
      @click='destroyAll'
      variant='danger'>
      DANGER!
    </b-button>
  </div>
</template>

<script>
import EditUserForm from '@/forms/user/EditUserForm'
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
