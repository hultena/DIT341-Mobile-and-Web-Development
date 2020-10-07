<template>
  <div class='recipe-page'>
    <div class='hero'>
      <b-img
        :src='this.recipe.image'
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
              Author: <b-link href="#">{{ recipe.user.username }}</b-link>
            </b-list-group-item>

            <b-list-group-item>
              Created on: {{ recipe.createdOn }}
            </b-list-group-item>

            <b-list-group-item>
              <!-- todo: add likes function -->
              <b-icon-heart @click="like" /> {{ recipe.likes }}
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
          <ad-space />
        </b-col>
      </b-row>
      <b-row class='my-5'>
        <b-col class='mb-5'>
          <h2>
            Instructions
          </h2>

          <list-instructions />

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ListIngredients from '@/components/ListIngredients'
import ListInstructions from '@/components/ListInstructions'
import { mapGetters, mapActions } from 'vuex'
import AdSpace from '@/components/AdSpace'
export default {
  name: 'RecipePage',
  components: { AdSpace, ListIngredients, ListInstructions },

  methods: {
    ...mapActions(['likeRecipe']),
    like() { this.likeRecipe(this.recipe) }
  },

  computed: { ...mapGetters(['oneRecipe']) },

  data() { return { recipe: null } },

  created() { this.recipe = this.oneRecipe }
}
</script>

<style scoped>
.recipe-page .hero img {
  height: 50vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}
</style>
