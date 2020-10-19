<template>
  <div class='profile-page'>

    <profile-hero :user='this.user' />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileHero from '@/components/ProfileHero'

export default {
  name: 'profile',
  components: { ProfileHero },
  computed: {
    ...mapGetters(['selectedUser'])
  },

  created() {
    this.user = this.selectedUser
  },

  data() {
    return {
      user: {},
      recipes: []
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
