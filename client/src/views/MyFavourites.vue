<template>
  <b-container>
    <b-row>
      <b-col
        v-for='recipe in loggedInUser.favourites'
        :key='recipe._id'>
        <recipe-card :recipe='recipe' />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RecipeCard from '@/components/RecipeCard'
export default {
  name: 'MyFavourites',
  components: { RecipeCard },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>

<style scoped>
</style>
