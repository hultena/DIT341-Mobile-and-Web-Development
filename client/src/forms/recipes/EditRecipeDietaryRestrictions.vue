<template>
  <b-form @submit.stop.prevent='onSubmit'>

    <b-form-group
      label='Dietary restrictions'
      label-align='left'
      label-for='recipeDietRestrictions'
      description='Which diets are your recipe safe for?'
    >

    <b-form-checkbox-group
        id='recipeDietRestrictions'
        v-model='recipe.dietaryRestrictions'
        :options='dietaryRestrictions'
        stacked
      />
    </b-form-group>

    <b-button
      type='submit'
      block
      variant='outline-success'
    >
      Save dietary restrictions
    </b-button>

  </b-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeDietaryRestrictionsForm',

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
      dietaryRestrictions: [
        { text: 'Vegan', value: 'Vegan' },
        { text: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian' },
        { text: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
        { text: 'Lacto-Ovo Vegetarian', value: 'Lacto-Ovo Vegetarian' },
        { text: 'Halaal', value: 'Halaal' },
        { text: 'Kosher', value: 'Kosher' },
        { text: 'Pescetarian', value: 'Pescetarian' }
      ]
    }
  },

  mounted() {
    this.recipe.user = this.loggedInUser._id
  }
}
</script>
