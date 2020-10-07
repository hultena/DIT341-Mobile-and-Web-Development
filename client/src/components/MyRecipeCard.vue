<template>
  <b-card
    :title='this.recipe.name'
    :img-src='this.recipe.image'
    img-top
    class='recipe-card'
  >
    <b-card-text>

      <b-card-sub-title class='mb-3'>
        <b-icon-heart /> {{ this.recipe.likes }}
      </b-card-sub-title>

      <p v-if="this.recipe.description">
        {{ this.recipe.description | snippet }}
      </p>
      <p v-else>
        ...
      </p>

      <b-button
        variant='outline-primary'
        @click='visitRecipe()'
        block
      >
        <b-icon-book />
        Go to recipe
      </b-button>

    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MyRecipeCard',

  props: {
    recipe: Object
  },

  methods: {
    ...mapActions(['selectRecipe']),

    deleteRecipe() {
      // todo, issue #73
    },

    visitRecipe() {
      this.selectRecipe(this.recipe)
      this.$router.push('/my-recipe')
    }
  }
}
</script>

<style scoped>
.recipe-card {
  min-width: 300px;
}
img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
