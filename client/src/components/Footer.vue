<template>
    <footer class='footer'>
        <img src="../assets/YummyLogo.svg" alt="Logo" class="logo"/>
        <b-nav align="center">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/about">About Us</b-nav-item>
            <b-nav-item to="/faq">FAQ</b-nav-item>
            <b-nav-item href='#top'>Go to top</b-nav-item>
        </b-nav>
    </footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.footer {
}
.logo {}
</style>
