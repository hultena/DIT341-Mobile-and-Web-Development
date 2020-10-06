<template>
  <div id="app">
    <header>
      <navigation-header/>
    </header>
    <!-- Render the content of the current page view -->
    <router-view/>
    <navigation-footer />
  </div>
</template>

<script>
import NavigationHeader from '@/components/NavigationHeader'
import NavigationFooter from '@/components/NavigationFooter'
export default {
  components: {
    NavigationHeader,
    NavigationFooter
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
label { font-weight: bold }
</style>
