<template>
  <b-container>

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
      <recipe-card v-for="recipe in allRecipes" :key="recipe._id" :recipe="recipe"/>
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
      message: 'none'
    }
  },
  methods: {
    ...mapActions(['getRecipes'])
  },
  computed: {
    ...mapGetters(['allRecipes'])
  },
  created() {
    this.getRecipes()
  }
}
</script>
