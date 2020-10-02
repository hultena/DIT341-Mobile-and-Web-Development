<template>
  <b-card
    :title='this.recipe.name'
    img-src='https://images.unsplash.com/photo-1548848221-0c2e497ed557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    img-top
  >
    <b-card-text>

      <b-card-sub-title class='mb-3'>
        <b-icon-heart /> {{ this.recipe.likes }}
      </b-card-sub-title>

      <p>
        {{ this.recipe.description | snippet }}
      </p>

      <b-button-group class='w-100'>

        <b-button
          variant='outline-success'
          @click='editRecipe()'
        >
          <b-icon-pencil />
          Edit recipe
        </b-button>

        <b-button
          variant='outline-danger'
          @click='deleteRecipe()'
        >
          <b-icon-trash />
          Delete recipe
        </b-button>

        <b-button
          variant='outline-primary'
          @click='visitRecipe()'
        >
          <b-icon-book />
          Go to recipe
        </b-button>

      </b-button-group>

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

    editRecipe() {
      this.selectRecipe(this.recipe)
      this.$router.push('/edit-recipe')
    },

    visitRecipe() {
      // todo, issue #75
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
