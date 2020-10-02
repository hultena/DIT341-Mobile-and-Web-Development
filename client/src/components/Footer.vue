<template>
    <footer>
        <b-nav align="center">
            <b-nav-item to="/">
                <img src="../assets/YummyLogo.svg" class="logo"/>
            </b-nav-item>
            <b-nav-item to="/about">About Us</b-nav-item>
            <b-nav-item to="/faq">FAQ</b-nav-item>
            <b-nav-item href='https://git.chalmers.se/courses/dit341/2020/group-01-web' target='_blank'>GitLab</b-nav-item>
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
.logo {}
</style>
