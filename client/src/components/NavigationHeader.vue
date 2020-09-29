<template>
  <div>
    <b-navbar id="navbar" toggleable="sm" type="light" variant="light">
      <router-link to='/'>
        <img src="@/assets/YummyLogo.svg">
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="!getLoggedIn">
            <b-nav-item>
              <router-link to='sign-up'>
                Sign up
              </router-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item id="user-profile">
            <template v-if="getLoggedIn">
              <b-button @click="deauthUser(getLoggedIn)">Log Out</b-button>
              <router-link to="my-profile">
                <!-- TODO replace with user image -->
                <img v-if="getLoggedIn.image" :src="getLoggedIn.image" class="profile-picture" alt="Profile Picture">
                <b-icon-person-circle v-else class="profile-picture"/>
              </router-link>
            </template>
            <template v-else>
              <router-link to="sign-in">
              Sign In
              </router-link>
            </template>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavigationHeader',
  methods: {
    ...mapActions(['deauthUser'])
  },
  computed: {
    ...mapGetters(['getLoggedIn'])
  }
}
</script>

<!-- TODO remove this placeholder CSS that is used to make this not look horrible" -->
<style scoped>

#navbar{
  background-color: white !important;
}

.profile-picture{
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
}

</style>
