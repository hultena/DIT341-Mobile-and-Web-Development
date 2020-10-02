<template>
  <b-container class='mb-5'>

    <b-row class='mt-5 mb-3'>
      <b-col class='mt-5'>
        <h1>
          Lorem ipsum dolor sit amet
        </h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur
        </h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <RecipeSearch />
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for='recipe in allRecipes' :key='recipe._id'>
        <recipe-card :recipe='recipe' />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-button
          variant='primary'
          @click='expandResults'
          block
          class='mt-4 mb-5'
        >
          Show more results
        </b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import RecipeSearch from '@/components/RecipeSearch'
import { mapGetters, mapActions } from 'vuex'
import RecipeCard from '@/components/RecipeCard'
export default {
  name: 'home',
  components: { RecipeCard, RecipeSearch },
  data() {
    return {
      page: 0
    }
  },
  methods: {
    ...mapActions(['getRecipes']),

    expandResults() {
      // todo: add # number of recipes to the end of the array of displayed recipes. Or pagniation, which ever works best.
      this.page += 5
      this.getRecipes(this.page)
    }
  },
  computed: {
    ...mapGetters(['allRecipes'])
  },
  created() {
    this.getRecipes()
  }
}
</script>
