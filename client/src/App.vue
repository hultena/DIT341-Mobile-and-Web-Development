<template>
  <div id='app' class='app'>
    <header>
      <navigation-header/>
    </header>
    <router-view/>
    <navigation-footer />
  </div>
</template>

<script>
import NavigationHeader from '@/components/NavigationHeader'
import NavigationFooter from '@/components/NavigationFooter'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavigationHeader,
    NavigationFooter
  },
  methods: {
    redirect() {
      if (!this.loggedInUser && this.$route.path === '/my-profile') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    this.redirect()
  }
}
</script>

<style>
@import './AppFonts.css';

.add-white-space {
  padding-top: 200px;
  padding-bottom: 100px;
}
</style>
