<template>
  <div class='create-recipe-page'>
    <b-container class='my-5'>
      <b-row class='mb-5'>
        <b-col>
          <h1>
            Edit your {{ this.recipe.name }} recipe
          </h1>
          <h5>
            Change the information below if you want to update your recipe.
            Keep it the same if you're happy with it.
            Just don't forget to save.
          </h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <edit-recipe-form :recipe='this.recipe' />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditRecipeForm from '@/forms/recipes/EditRecipeForm'

export default {
  name: 'EditRecipePage',

  components: { EditRecipeForm },

  data() {
    return { recipe: null }
  },

  computed: {
    ...mapGetters(['selectedRecipe'])
  },

  mounted() {
    this.recipe = this.selectedRecipe
  }
}
</script>

<style scoped>

</style>
