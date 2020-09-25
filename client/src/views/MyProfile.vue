<template>
  <div class='profilePage'>
    <section>
      <h1>
        Profile heading
      </h1>
      <h2>
        Profile subheading
      </h2>
      <h3>
        {{this.getLoggedIn}}
      </h3>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'myProfile',
  data() {
    return {}
  },
  methods: {
    ...mapActions([])
  },
  computed: {
    ...mapGetters(['getLoggedIn'])
  }
}

</script>

<style scoped>
.profilePage {}
</style>
