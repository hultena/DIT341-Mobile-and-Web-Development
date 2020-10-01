<template>
  <div id="app">
    <header>
      <navigation-header/>
    </header>
    <!-- Render the content of the current page view -->
    <router-view/>
    <footer>
      <router-link to='/'>
        <img src="./assets/YummyLogo.svg">
      </router-link>
      <router-link to='/about'>
        About
      </router-link>
      <router-link to='/faq'>
        FAQ
      </router-link>
    </footer>
  </div>
</template>

<script>
import NavigationHeader from '@/components/NavigationHeader'
export default {
  components: {
    NavigationHeader
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
