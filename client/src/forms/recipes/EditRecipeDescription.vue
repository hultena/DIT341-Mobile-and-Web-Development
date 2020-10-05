<template>
  <b-form @submit.stop.prevent='onSubmit'>

    <b-form-group
      label='Recipe description'
      label-align='left'
      label-for='recipe-description'
    >
      <b-form-textarea
        id='recipe-description'
        v-model='recipe.description'
        placeholder='Tell us why your recipe is delicious.'
        rows='3'
        max-rows='6'
      />

    </b-form-group>

    <b-button
      type='submit'
      block
      variant='outline-success'
    >
      Save description
    </b-button>

  </b-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeDescriptionForm',

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

  mounted() {
    this.recipe.user = this.loggedInUser._id
  }
}
</script>
