<template>
  <div id="app">
    <header>
      <router-link to='/'>
        <img src="./assets/YummyLogo.svg">
      </router-link>
      <router-link to='/sign-up'>
        Sign up
      </router-link>
      <router-link to='/sign-in'>
        Sign in
      </router-link>
    </header>
    <!-- Render the content of the current page view -->
    <router-view/>
    <Footer/>
  </div>
</template>
<script>
import Footer from './components/Footer.vue'
export default {
  components: {
    Footer
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
