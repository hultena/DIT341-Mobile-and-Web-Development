<template>
  <div class='recipe-page'>
    <div class='hero'>
      <b-img
        src='https://images.unsplash.com/photo-1426869884541-df7117556757?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
        alt='Responsive image'
      />
    </div>
    <b-container>
      <b-row class='mt-5'>
        <b-col>

          <h1>
            {{ recipe.name }}
          </h1>

          <b-list-group horizontal='md'>

            <b-list-group-item>
              <!-- todo: Have author link lead to profile page of recipe author. -->
              Author: <b-link href="#">{{ recipe.user }}</b-link>
            </b-list-group-item>

            <b-list-group-item>
              Created on: {{ recipe.createdOn }}
            </b-list-group-item>

            <b-list-group-item>
              <!-- todo: add likes function -->
              <b-icon-heart /> {{ recipe.likes }}
            </b-list-group-item>

          </b-list-group>

        </b-col>
      </b-row>
      <b-row class='mt-5'>
        <b-col>
          <h2>
            Recipe description
          </h2>
          <p>
            {{ recipe.description }}
          </p>
        </b-col>
      </b-row>
      <b-row class='mt-5'>
        <b-col>
          <!-- TODO: Recipe ingredients go here -->
          <h2>
            Ingredients
          </h2>

          <ListIngredients :ingredients="recipe.ingredients" />

        </b-col>
        <b-col>
          <b-jumbotron
            header='Adspace'
            text-variant='light'
            class='ad-space'
          ></b-jumbotron>
        </b-col>
      </b-row>
      <b-row class='my-5'>
        <b-col class='mb-5'>
          <h2>
            Instructions
          </h2>

          <ListInstructions :instructions="recipe.instructions" />

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ListIngredients from '@/components/ListIngredients'
import ListInstructions from '@/components/ListInstructions'
import { mapGetters } from 'vuex'
export default {
  name: 'RecipePage',
  components: {
    ListIngredients,
    ListInstructions
  },
  data() {
    return {
      recipe: null
    }
  },
  computed: {
    ...mapGetters(['oneRecipe'])
  },
  created() {
    this.recipe = this.oneRecipe
  }
}
</script>

<style scoped>
.recipe-page .hero img {
  height: 50vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}
.recipe-page .ad-space {
  text-align: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .5) 100%), url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-position: center;
}
</style>
