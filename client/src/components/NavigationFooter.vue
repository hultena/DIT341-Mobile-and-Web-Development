<template>
  <b-container>

    <b-row class='mt-4 mb-2'>
      <b-col>
        <router-link to='/'>
          <img
            src='../assets/YummyLogo.svg'
            class='logo'
            alt='Yummy logo'
          />
        </router-link>
      </b-col>

      <b-col>
        <b-button
          variant='outline-primary'
          @click='toTop'
        >
          Go to top <b-icon-arrow-up-circle />
        </b-button>
      </b-col>
    </b-row>

    <b-row class='mb-3'>
      <b-col>
        <router-link
          to='/about'
          class='mr-4'
        >
          About
        </router-link>
        <router-link
          to='/faq'
          class='mr-4'
        >
          FAQ
        </router-link>
        <b-link
          href='https://git.chalmers.se/courses/dit341/2020/group-01-web'
          target='_blank'
          class='mr-4'
        >
          Git project
        </b-link>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

export default {
  name: 'NavigationFooter',
  methods: {
    toTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
img.logo { width: 100px }
button { float: right }
</style>
