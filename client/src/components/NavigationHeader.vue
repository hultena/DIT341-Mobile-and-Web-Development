<template>
  <div>
    <b-navbar id="navbar" toggleable="sm" type="light" variant="light">
      <router-link to='/'>
        <img src="@/assets/YummyLogo.svg">
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item>
            <router-link to='sign-in'>
              Sign in
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to='sign-up'>
              Sign up
            </router-link>
          </b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item id="user-profile">
            <router-link to="my-profile">
              Picture
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavigationHeader'
}
</script>

<!-- TODO remove this placeholder CSS that is used to make this not look horrible" -->
<style scoped>

#navbar{
  background-color: white !important;
}
#profile-picture{
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
}

</style>
