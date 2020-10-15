<template>
  <b-navbar
    type='light'
    variant='light'
    class='m-0 pt-3 app-header'
  >

    <!-- If user not signed in -->
    <b-container
      v-if='!loggedInUser'
    >

      <b-navbar-brand to='/'>
        <img
          v-if='this.$route.path === "/" || this.$route.path === "/recipe" || this.$route.path === "/about" || this.$route.path === "/my-recipe"'
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        >
        <img
          v-else
          src='@/assets/MainYummyLogo.svg'
          class='logo logo-black'
          alt='App logo'
        />
      </b-navbar-brand>
      <b-navbar-nav
        class='ml-auto'
        v-if="this.$route.path !== '/sign-in' && this.$route.path !== '/sign-up'">
        <b-nav-item>
          <b-button-group v-if='this.$route.path !== "/faq"'>

            <b-button
              @click='signUp'
              variant='light'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-light'
            >
              Sign in
            </b-button>

          </b-button-group>
          <b-button-group v-else>

            <b-button
              @click='signUp'
              variant='dark'
            >
              Sign up
            </b-button>

            <b-button
              @click='signIn'
              variant='outline-dark'
            >
              Sign in
            </b-button>

          </b-button-group>
        </b-nav-item>
      </b-navbar-nav>

    </b-container>

    <!-- If user is signed in -->
    <b-container
      v-if="loggedInUser">

      <b-navbar-brand to='/'>
        <img
          v-if='this.$route.path === "/" || this.$route.path === "/recipe" || this.$route.path === "/about" || this.$route.path === "/my-recipe"'
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        >
        <img
          v-else
          src='@/assets/MainYummyLogo.svg'
          class='logo logo-black'
          alt='App logo'
        />
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto" v-if="size > TOGGLE_LIMIT && this.$route.path === '/my-profile'">
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
          Shopping lists
        </b-nav-item>
        <b-nav-item
          @click='click="ingredients"'
          class='profile-link'
        >
          Ingredients
        </b-nav-item>
        <b-nav-item
          @click='click="favourites"'
          class='profile-link'
        >
          Favourite recipes
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="mr-0">
        <b-nav-dropdown
          id="dropdown-menu"
          right
          no-caret
          no-flip>
          <template slot="button-content">
            <b-img
              v-if='loggedInUser.image'
              :src='loggedInUser.image'
              alt='User avatar'
              class='dot'
            />
            <b-icon-person v-else />
          </template>
          <b-dd-item
            v-if='size <= TOGGLE_LIMIT && this.$route.path === "/my-profile"'
            @click="click='recipes'"
          >
            My recipes
          </b-dd-item>
          <b-dd-item
            v-if='size <= TOGGLE_LIMIT && this.$route.path === "/my-profile"'
            @click="click='shopping'"
          >
            Shopping lists
          </b-dd-item>
          <b-dd-item
            v-if='size <= TOGGLE_LIMIT && this.$route.path === "/my-profile"'
            @click="click='ingredients'"
          >
            Ingredients
          </b-dd-item>
          <b-dd-item
            v-if='size <= TOGGLE_LIMIT && this.$route.path === "/my-profile"'
            @click='click="favourites"'
          >
            Favourite recipes
          </b-dd-item>
          <b-dd-divider
            v-if='size <= TOGGLE_LIMIT && this.$route.path === "/my-profile"'
          />
          <b-dd-item
            v-if='this.$route.path !== "/my-profile"'
            to="/my-profile"
            @click='click="recipes"'
          >
            My profile
          </b-dd-item>
          <b-dd-item @click='click="settings"'>
            My settings
          </b-dd-item>
          <b-dd-item @click='signOut'>
            Sign out
          </b-dd-item>
        </b-nav-dropdown>
      </b-navbar-nav>

    </b-container>

  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavigationHeader',

  data() {
    return {
      click: null,
      size: null,
      TOGGLE_LIMIT: 991
    }
  },

  methods: {
    ...mapActions(['deauthUser', 'changeView']),

    signUp() { this.$router.push('/sign-up') },

    signIn() { this.$router.push('/sign-in') },

    signOut() {
      this.deauthUser(this.loggedInUser)
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    sizeEventHandler() {
      this.size = window.innerWidth
    }
  },

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  watch: {
    click: function () {
      this.changeView(this.click)
    }
  },
  created() {
    this.size = window.innerWidth
    window.addEventListener('resize', this.sizeEventHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.sizeEventHandler)
  }
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

/deep/ .dropdown-menu > a:hover {
  border-radius: .50%;
}
#dropdown-menu:hover {
  background: rgba(255,255,255,.2);
  border-radius: .5em;
}

/deep/ .dropdown-menu a:hover {
  background: rgba(74,74,74,.2) !important;
}
.header-button-primary:hover, .header-button-primary:focus {
  background: rgba(74, 74, 74, .5) !important
}

img.logo {
  width: 100px;
  color: #4A4A4A;
}

.dot {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  border: solid 2px white;
}

.profile-link a {
  margin-right: 20px;
  font-weight: 500;
  font-size: .9rem;
  color: rgb(33, 37, 41) !important;
  transition: .1s;
}

.profile-link a:hover { opacity: .5 }

.logo-black{
  filter: brightness(0%);
}
</style>
