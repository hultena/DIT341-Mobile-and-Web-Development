<template>
  <b-card
    :title='this.recipe.name'
    :img-src='image'
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

      <b-button-group class='mt-3 w-100'>

        <b-button
          variant='dark'
          @click='visitRecipe()'
          size='sm'
        >
          Go to recipe
        </b-button>

        <b-button
          variant='outline-dark'
          @click='editRecipe()'
          size='sm'
        >
          Edit recipe
        </b-button>
      </b-button-group>

    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'
import defaultFood from '@/assets/default-food.jpg'

export default {
  name: 'MyRecipeCard',
  data() {
    return {
      image: null
    }
  },
  props: {
    recipe: Object
  },

  methods: {
    ...mapActions(['selectRecipe']),

    editRecipe() {
      this.selectRecipe(this.recipe)
      this.$router.push('/my-recipe')
    },

    visitRecipe() {
      this.selectRecipe(this.recipe)
      this.$router.push('/recipe')
    }
  },
  created() {
    if (this.recipe.image) {
      this.image = this.recipe.image
    } else {
      this.image = defaultFood
    }
  }
}
</script>

<style scoped>
img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
