<template>
  <b-navbar
    toggleable='md'
    type='light'
    variant='light'
    class='m-0 pt-3 app-header'
  >

    <!-- If user not signed in -->
    <b-container
      v-if='!loggedInUser && currentView !== "/sign-in" && currentView !== "/sign-up"'
    >

      <b-navbar-brand to='/'>
        <img
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        />
      </b-navbar-brand>

      <b-navbar-nav class='ml-auto'>
        <b-nav-item>
          <b-button-group>

            <b-button
              @click='signUp'
              variant='primary'
              class='header-button-primary'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-primary'
              class='header-button-secondary'
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
          src='@/assets/MainYummyLogo.svg'
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
          src='@/assets/MainYummyLogo.svg'
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
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>

      <b-navbar-toggle target='nav-collapse' class='hamburger'></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class='ml-auto'>

          <b-nav-item
            @click='click="recipes"'
            class='profile-link'
          >
            My recipes
          </b-nav-item>

          <b-nav-item
            @click='click="shopping"'
            class='profile-link'
          >
            My shopping lists
          </b-nav-item>

          <b-nav-item
            @click='click="ingredients"'
            class='profile-link'
          >
            My ingredients
          </b-nav-item>

          <b-nav-item
            @click='click="favourites"'
            class='profile-link'
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
.app-header { background-color: #C8DBA9 !important }

.header-button-primary, .header-button-secondary {
  border-color: #4A4A4A !important;
}

.header-button-primary {
  color: #C8DBA9 !important;
  background: #4A4A4A !important;
  border-color: #4A4A4A !important;
}

.header-button-secondary { color: #4A4A4A !important }

.header-button-secondary:hover, .header-button-secondary:focus {
  background: rgba(255, 255, 255, .5) !important
}
.header-button-primary:hover, .header-button-primary:focus {
  background: rgba(74, 74, 74, .5) !important
}

img.logo {
  width: 100px;
  color: #4A4A4A;
}

.avatar img, .avatar svg {
  height: 55px;
  width: 55px;
  color: #4A4A4A;
  border: solid 3px #4A4A4A;
}

.profile-link a {
  font-weight: bold;
  color: #4A4A4A !important;
  transition: .1s;
}

#nav-collapse{
  text-align: right;
}

.profile-link a:hover { opacity: .5 }
</style>
