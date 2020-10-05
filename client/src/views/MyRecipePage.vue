<template>
  <b-container>
    <h1>
      {{ recipe.name }}
    </h1>
    <b-row>
      <b-col>
        <edit-recipe-name-form :recipe='this.recipe' />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <edit-recipe-description-form :recipe='this.recipe' />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import EditRecipeNameForm from '@/forms/recipes/EditRecipeNameForm'
import EditRecipeDescriptionForm from '@/forms/recipes/EditRecipeDescriptionForm'

export default {
  name: 'MyRecipePage',

  components: { EditRecipeDescriptionForm, EditRecipeNameForm },

  computed: { ...mapGetters(['oneRecipe']) },

  data() { return { recipe: {} } },

  mounted() { this.recipe = this.oneRecipe }
}
</script>

<style scoped>

</style>
