<template>
  <b-container class='home-page'>

    <b-row class='mb-3'>
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
        <advanced-search/>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for='recipe in allRecipes'
        :key='recipe._id'
        >
        <recipe-card :recipe='recipe' class="my-3" />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-button
          variant='primary'
          @click='expandResults'
          block
          class='mt-4'
        >
          Show more results
        </b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecipeCard from '@/components/RecipeCard'
import AdvancedSearch from '@/components/AdvancedSearch'
export default {
  name: 'home',
  components: { AdvancedSearch, RecipeCard },
  data() {
    return {
      form: {
        page: 1,
        limit: 5,
        value: null,
        filter: null
      }
    }
  },
  methods: {
    ...mapActions(['getRecipes']),

    expandResults() {
      this.form = this.selectedQuery
      this.form.page += 1
      this.$store.commit('setQuery', this.form)
      this.getRecipes()
    }
  },
  computed: {
    ...mapGetters(['allRecipes', 'selectedQuery'])
  },
  created() {
    this.$store.state.recipes.recipes = []
    this.$store.commit('setQuery', this.form)
    this.getRecipes()
  }
}
</script>

<style scoped>
.home-page {
  padding-top: 120px;
  padding-bottom: 150px;
}
</style>
