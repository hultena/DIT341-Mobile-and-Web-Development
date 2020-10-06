<template>
  <div class='settingsPage mt-5'>

    <b-card>
      <b-card-body>
        <h3 class='mb-4'>
          Edit your user settings
        </h3>
        <edit-user-form/>
      </b-card-body>
    </b-card>

    <b-card class='my-5'>
      <b-body>
        <h3 class='mb-4'>
          Time to leave?
        </h3>
        <b-button
          @click='signOut'
          variant='secondary'
          block
        >
          <b-icon-door-open />
          Log out
        </b-button>
      </b-body>
    </b-card>

  </div>
</template>

<script>
import EditUserForm from '@/forms/user/EditUserForm'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'mySettings',

  components: { EditUserForm },

  computed: { ...mapGetters(['loggedInUser']) },

  methods: {
    ...mapActions(['deauthUser']),

    signOut() {
      this.deauthUser(this.loggedInUser)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.settingsPage {}
</style>
