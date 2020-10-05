<template>
  <b-form @submit.stop.prevent='onSubmit'>

    <!-- TODO: Change description to make sense with search field on landing page -->
    <b-form-group
      label='Allergy warnings'
      label-for='recipe-allergies'
      description='Is your recipe safe for everyone to enjoy? Let us know if it contains any of above.'
    >

    <b-form-checkbox-group
        id='recipe-allergies'
        v-model='recipe.allergies'
        :options='allergies'
        stacked
      />

    </b-form-group>

    <b-button
      type='submit'
      block
      variant='outline-success'
    >
      Save allergy warning
    </b-button>

  </b-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeAllergies',

  props: {
    recipe: {
      user: null,
      name: '',
      category: '',
      description: '',
      image: '',
      ingredients: [],
      allergies: [],
      dietaryRestrictions: [],
      instructions: []
    }
  },

  computed: { ...mapGetters(['oneRecipe', 'loggedInUser']) },

  methods: {
    ...mapActions(['patchRecipe']),

    async onSubmit() {
      const message = await this.patchRecipe(this.recipe)

      if (message !== undefined) {
        this.$refs.observer.setErrors(message)
        console.log(message)
      }
    }
  },

  data() {
    return {
      allergies: [
        { text: 'Gluten', value: 'Gluten' },
        { text: 'Peanuts', value: 'Peanuts' },
        { text: 'Nuts', value: 'Nuts' },
        { text: 'Lactose', value: 'Lactose' },
        { text: 'Egg', value: 'Egg' },
        { text: 'Wheat', value: 'Wheat' },
        { text: 'Soy', value: 'Soy' },
        { text: 'Fish', value: 'Fish' },
        { text: 'Shellfish', value: 'Shellfish' }
      ]
    }
  },

  mounted() {
    this.recipe.user = this.loggedInUser._id
  }
}
</script>
