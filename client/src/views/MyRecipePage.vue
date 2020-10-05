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
        <edit-recipe-category-form :recipe='this.recipe' />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <edit-recipe-description-form :recipe='this.recipe' />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ad-space />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <edit-recipe-dietary-restrictions-form :recipe='this.recipe' />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import EditRecipeNameForm from '@/forms/recipes/EditRecipeNameForm'
import EditRecipeDescriptionForm from '@/forms/recipes/EditRecipeDescriptionForm'
import AdSpace from '@/components/AdSpace'
import EditRecipeCategoryForm from '@/forms/recipes/EditRecipeCategory'
import EditRecipeDietaryRestrictionsForm from '@/forms/recipes/EditRecipeDietaryRestrictionsForm'

export default {
  name: 'MyRecipePage',

  components: {
    EditRecipeDietaryRestrictionsForm,
    EditRecipeCategoryForm,
    AdSpace,
    EditRecipeDescriptionForm,
    EditRecipeNameForm
  },

  computed: { ...mapGetters(['oneRecipe']) },

  data() { return { recipe: {} } },

  mounted() { this.recipe = this.oneRecipe }
}
</script>

<style scoped>

</style>
