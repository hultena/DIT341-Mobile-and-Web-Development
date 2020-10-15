<template>
  <b-container class='profile-page'>

    <b-row class='profile-header'>
      <b-col class='avatar'>
        <b-img
          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          alt='User avatar'
          rounded='circle'
        />
      </b-col>
      <b-col>

        <h1>{{ user.username }}</h1>

      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',

  computed: {
    ...mapGetters(['selectedUser'])
  },

  created() {
    this.user = this.selectedUser
    console.log(this.user._id)
  },

  data() {
    return {
      user: {}
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding-top: 100px;
  padding-bottom: 100px;
}

.avatar {
  max-width: 240px !important;
}

.avatar > img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
}

@media only screen and (max-width: 417px) {
  .profile-header {
    text-align: center;
    justify-content: center;
  }
  div.avatar { padding-bottom: 30px }
}
</style>
