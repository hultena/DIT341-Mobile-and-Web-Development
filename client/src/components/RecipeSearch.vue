<template>
  <b-form-group>
    <b-input-group class='mb-3'>

      <b-form-input
        type='text'
        placeholder='Type something you want to search for here'
      />

      <b-input-group-append>

        <b-button
          v-b-toggle.collapse-1
          variant='outline-secondary'
        >
          <b-icon-filter />
        </b-button>

        <b-button variant='outline-primary'>
          <b-icon-search />
        </b-button>

      </b-input-group-append>
    </b-input-group>

    <b-collapse id="collapse-1">
      <p>
        Filter options go here.
      </p>
      <!-- TODO: Add filter options -->
    </b-collapse>

    <div id='show-recipes'>
      <div class='single-recipe'></div>
    </div>

    <b-row>
      <b-col
        v-for='(recipe, index) in recipes'
        :key='index'
        class='my-2'
      >
        <RecipeCard
          image-src='https://images.unsplash.com/photo-1588339724477-446bc8fac146?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          :title='recipe.name'
          :likes='recipe.likes'
          :username='recipe.user'
          description='Hello world'
          recipe-link='path'
        />
      </b-col>
    </b-row>
    <b-button
      variant='primary'
      @click='expandResults'
      block
      class='mt-2'
    >
      Show more results
    </b-button>
  </b-form-group>
</template>

<script>
import { Api } from '@/Api'
import RecipeCard from '@/components/RecipeCard'

export default {
  name: 'RecipeSearch',

  components: { RecipeCard },

  data() {
    return {
      recipes: [],
      slice: 4,
      currentLength: null,
      previousLength: null
    }
  },

  methods: {
    // TODO: Get vuex to work and figure out why you get returned undefined.

    getRecipes() {
      Api.get('/recipes')
        .then(response => {
          this.recipes = response.data.slice(0, this.slice)
        })
        .catch(error => {
          this.recipes = error
        })
    },

    expandResults() {
      this.slice += 4

      Api.get('/recipes')
        .then(response => {
          this.recipes = response.data.slice(0, this.slice)
        })
        .catch(error => {
          this.recipes = error
        })
    }
  },

  created() {
    this.getRecipes()
  }
}
</script>

<style scoped>

</style>
