<template>
  <div id="app">
    <header>
      <navigation-header/>
    </header>
    <!-- Render the content of the current page view -->
    <router-view/>
    <Footer/>
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
