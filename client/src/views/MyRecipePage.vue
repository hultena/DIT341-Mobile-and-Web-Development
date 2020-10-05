<template>
  <div>
    <edit-recipe-image :recipe='this.recipe' />
    <b-container>
      <b-row>
        <b-col>
          <edit-recipe-name :recipe='this.recipe' />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <edit-recipe-category :recipe='this.recipe' />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <edit-recipe-description :recipe='this.recipe' />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ad-space />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <edit-recipe-dietary-restrictions :recipe='this.recipe' />
        </b-col>
        <b-col>
          <edit-recipe-allergies :recipe='this.recipe' />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <edit-recipe-instructions :recipe='this.recipe' />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card
            title='Danger zone'
          >
            <b-button
              variant='danger'
              block
              @click='deleteThisRecipe'
            >
              Delete recipe
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditRecipeName from '@/forms/recipes/EditRecipeName'
import EditRecipeDescription from '@/forms/recipes/EditRecipeDescription'
import AdSpace from '@/components/AdSpace'
import EditRecipeCategory from '@/forms/recipes/EditRecipeCategory'
import EditRecipeDietaryRestrictions from '@/forms/recipes/EditRecipeDietaryRestrictions'
import EditRecipeAllergies from '@/forms/recipes/EditRecipeAllergies'
import EditRecipeInstructions from '@/forms/recipes/EditRecipeInstructions'
import EditRecipeImage from '@/forms/recipes/EditRecipeImage'

export default {
  name: 'MyRecipePage',

  components: {
    EditRecipeName,
    EditRecipeAllergies,
    AdSpace,
    EditRecipeDescription,
    EditRecipeCategory,
    EditRecipeDietaryRestrictions,
    EditRecipeInstructions,
    EditRecipeImage
  },

  computed: { ...mapGetters(['oneRecipe']) },

  methods: {
    ...mapActions(['deleteRecipe']),

    deleteThisRecipe() {
      this.deleteRecipe(this.recipe)
      this.$router.push('/my-profile')
    }
  },

  data() { return { recipe: {} } },

  mounted() { this.recipe = this.oneRecipe }
}
</script>

<style scoped>

</style>
