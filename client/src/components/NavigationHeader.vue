<template>
  <b-navbar
    toggleable='lg'
    type='light'
    variant='light'
    class='m-0 pt-3 app-header'
  >

    <b-container>
      <b-navbar-brand to='/'>
        <img
          v-if='currentView === "/" || currentView === "/recipe" || currentView === "/about" || currentView === "/my-recipe"'
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        >
        <img
          v-if='currentView !== "/" && currentView !== "/recipe" && currentView !== "/about" && currentView !== "/my-recipe"'
          src='@/assets/YummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>

      <b-navbar-nav
        v-if='!loggedInUser && currentView !== "/sign-up" && currentView !== "/sign-in"'
        class='ml-auto'
      >
        <b-nav-item>

          <b-button-group v-if='!loggedInUser && currentView !== "/faq"'>

            <b-button
              @click='signUp'
              variant='light'
              class='header-button-primary'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-light'
              class='header-button-secondary'
            >
              Sign in
            </b-button>

          </b-button-group>

          <b-button-group v-if='!loggedInUser && currentView === "/faq"'>

            <b-button
              @click='signUp'
              variant='dark'
              class='header-button-primary'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-dark'
              class='header-button-secondary'
            >
              Sign in
            </b-button>

          </b-button-group>

        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav
        v-if='loggedInUser && currentView !== "/my-profile"'
        class='ml-auto'
      >
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

      <b-navbar-toggle
        v-if='loggedInUser && currentView === "/my-profile"'
        target='nav-collapse'
        class='hamburger'
      />

      <b-collapse
        v-if='loggedInUser && currentView === "/my-profile"'
        id="nav-collapse"
        is-nav
      >
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

  data() { return { click: null } },

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
.app-header {
  z-index: 100;
  position: absolute;
  top: 0;
  width: 100vw;
  background: transparent !important
}

img.logo { width: 100px }

.avatar img, .avatar svg {
  height: 55px;
  width: 55px;
  color: #fff;
  border: solid 3px #fff;
}
</style>
