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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
