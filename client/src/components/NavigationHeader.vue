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
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        />
      </b-navbar-brand>
      <b-navbar-nav
        class='ml-auto'
        v-if="this.$route.path !== '/sign-in' && this.$route.path !== '/sign-up'">
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

    <!-- If user is signed in -->
    <b-container
      v-if="loggedInUser">
      <b-navbar-brand to='/'>
        <img
          src='@/assets/MainYummyLogo.svg'
          class='logo'
          alt='App logo'
        >
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto" v-if="size>TOGGLE_LIMIT&&this.$route.path==='/my-profile'">
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
      <b-navbar-nav class="mr-0">
        <b-nav-dropdown
          id="dropdown-menu"
          right
          no-flip>
          <template slot="button-content">
            <b-img
              v-if='loggedInUser.image'
              :src='loggedInUser.image'
              alt='User avatar'
              class="dot"
            />
            <b-icon-person v-else />
          </template>
          <b-dd-item v-if="size<=TOGGLE_LIMIT" @click="click='recipes'">My recipes</b-dd-item>
          <b-dd-item v-if="size<=TOGGLE_LIMIT" @click="click='shopping'">My shopping lists</b-dd-item>
          <b-dd-item v-if="size<=TOGGLE_LIMIT" @click="click='ingredients'">My Ingredients</b-dd-item>
          <b-dd-item v-if="size<=TOGGLE_LIMIT" @click="click='favourites'">Favourite Recipes</b-dd-item>
          <b-dd-divider v-if="size<=TOGGLE_LIMIT"/>
          <b-dd-item to="/my-profile" @click="click='recipes'">My Profile</b-dd-item>
          <b-dd-item @click="click='settings'">My Settings</b-dd-item>
          <b-dd-item @click='signOut'>Sign Out</b-dd-item>
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
      // 768 is some bootstrap breakpoint
      TOGGLE_LIMIT: 768
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
    ...mapGetters(['loggedInUser', 'currentView'])
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

/deep/ #dropdown-menu > a:hover {
  border-radius: .5em;
}
#dropdown-menu:hover {
  background: rgba(255,255,255,.2);
}
#dropdown-menu {
  border-color: #4A4A4A;
  border-style: solid;
  border-radius: .5em;
}

/deep/ .dropdown-menu a:hover {
  background: fuchsia !important;
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
.dot {
  height: 55px;
  width: 55px;
  border: #4A4A4A;
  border-radius: 50%;
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
