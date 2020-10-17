<template>
  <b-container>
    <b-row>
      <b-col
        v-for='recipe in loggedInUser.favourites'
        :key='recipe._id'
        class="col-xl-3 col-lg-4 col-md-5 col-sm-12">
        <recipe-card
          :recipe='recipe'
        class="my-3"/>
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
