<template>
  <div class='add-white-space'>

    <profile-hero :user='this.user' class='hero' />
    <list-recipes :user='this.user' />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileHero from '@/components/ProfileHero'
import ListRecipes from '@/components/ListRecipes'

export default {
  name: 'profile',
  components: { ListRecipes, ProfileHero },
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
<style>
.hero { margin-bottom: 50px }
</style>
