<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="light" variant="light">
      <b-navbar-brand to='/'>
        <img src="@/assets/YummyLogo.svg">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="!loggedInUser">
            <b-nav-item>
              <router-link to='sign-up'>
                Sign up
              </router-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template v-if="currentView==='/my-profile'">
            <b-nav-item @click="click='recipes'" id="my-recipes">
              <b-link>
                My Recipes
              </b-link>
            </b-nav-item>
            <b-nav-item @click="click='shopping'">
              <b-link>
                My Shopping Lists
              </b-link>
            </b-nav-item>
            <b-nav-item @click="click='ingredients'">
              <b-link>
                My Ingredients
              </b-link>
            </b-nav-item>
            <b-nav-item @click="click='favourites'">
              <b-link>
                Favourite Recipes
              </b-link>
            </b-nav-item>
          </template>
          <b-nav-item id="user-profile">
            <template v-if="loggedInUser">
              <router-link to="/">
              <b-button @click="deauthUser(loggedInUser)">Log Out</b-button>
              </router-link>
            </template>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav>
        <b-nav-item v-if="loggedInUser">
          <router-link to="my-profile">
            <img v-if="loggedInUser.image" :src="loggedInUser.image" class="profile-picture" alt="Profile Picture">
            <b-icon-person-circle v-else class="profile-picture"/>
          </router-link>
        </b-nav-item>
        <template v-else>
          <router-link to="sign-in">
            Sign In
          </router-link>
        </template>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavigationHeader',
  data() {
    return {
      click: null
    }
  },
  methods: {
    ...mapActions(['deauthUser', 'changeView'])
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    currentView() {
      return this.$route.path
    }
  },
  watch: {
    click: function () {
      this.changeView(this.click)
    }
  }
}
</script>

<!-- TODO remove this placeholder CSS that is used to make this not look horrible -->
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
