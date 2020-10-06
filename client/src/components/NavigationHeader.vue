<template>
  <b-navbar
    toggleable='lg'
    type='light'
    variant='light'
    class='m-0'
  >

    <!-- If user not signed in -->
    <b-container
      v-if='!loggedInUser && currentView !== "/sign-in" && currentView !== "/sign-up"'
    >

      <b-navbar-brand to='/'>
        <img
          src='@/assets/YummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>

      <b-navbar-nav class='ml-auto'>
        <b-nav-item>
          <b-button-group>

            <b-button
              @click='signUp'
              variant='primary'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-primary'
            >
              Sign in
            </b-button>

          </b-button-group>
        </b-nav-item>
      </b-navbar-nav>

    </b-container>

    <!-- If on sign up / sign -->
    <b-container
      v-if='currentView === "/sign-in" || currentView === "/sign-up"'
    >
      <b-navbar-brand to='/'>
        <img
          src='@/assets/YummyLogo.svg'
          class='logo'
          alt='User avatar'
        >
      </b-navbar-brand>
    </b-container>

    <!-- If user is signed in and not on profile -->
    <b-container
      v-if='loggedInUser && currentView !== "/my-profile" && currentView !== "/my-recipes" && currentView !== "/my-shopping-lists" && currentView !== "/my-favourites"'
    >
      <b-navbar-brand to='/'>
        <img
          src='@/assets/YummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>

      <b-navbar-nav class='ml-auto'>
        <b-nav-item class='avatar'>
          <router-link to='/my-profile'>
            <b-img
              v-if='loggedInUser.image'
              :src='loggedInUser.image'
              alt='User avatar'
              rounded='circle'
            />
            <b-icon-person v-else />
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

    </b-container>

    <!-- If on user profile -->
    <b-container
      v-if='currentView === "/my-profile" || currentView === "/my-recipes" || currentView === "/my-shopping-lists" || currentView === "/my-favourites"'
    >

      <b-navbar-brand to='/'>
        <img
          src='@/assets/YummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>

      <b-navbar-toggle target='nav-collapse'></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class='ml-auto'>

          <b-nav-item
            @click='click="recipes"'
          >
            My recipes
          </b-nav-item>

          <b-nav-item
            @click='click="shopping"'
          >
            My shopping lists
          </b-nav-item>

          <b-nav-item
            @click='click="ingredients"'
          >
            My ingredients
          </b-nav-item>

          <b-nav-item
            @click='click="favourites"'
          >
            Favourite recipes
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>

    </b-container>

  </b-navbar>
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
    ...mapActions(['deauthUser', 'changeView']),

    signUp() { this.$router.push('/sign-up') },

    signIn() { this.$router.push('/sign-in') }
  },

  computed: {
    ...mapGetters(['loggedInUser']),

    currentView() { return this.$route.path }
  },

  watch: { click: function () { this.changeView(this.click) } }
}
</script>

<style scoped>
img.logo {
  width: 130px;
}

.avatar img,
.avatar svg {
  height: 40px;
  width: 40px;
}
</style>
