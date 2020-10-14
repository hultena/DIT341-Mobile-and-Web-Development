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

export default {
  components: {
    NavigationHeader,
    NavigationFooter
  }
}
</script>

<style>
@import './AppFonts.css';
</style>
