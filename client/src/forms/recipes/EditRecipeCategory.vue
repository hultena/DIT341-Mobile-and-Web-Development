<template>
  <b-form @submit.stop.prevent='onSubmit'>

    <b-form-group
      label='Recipe category'
      label-align='left'
      label-for='recipe-category'
    >

      <b-form-radio-group
        id='recipe-category'
        v-model='recipe.category'
        radio-aling
        :options='category'
      />

    </b-form-group>

    <b-button
      type='submit'
      block
      variant='outline-success'
    >
      Save category
    </b-button>

  </b-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeCategoryForm',

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
      category: [
        { text: 'Cooking', value: 'Cooking' },
        { text: 'Baking', value: 'Baking' }
      ]
    }
  },

  mounted() {
    this.recipe.user = this.loggedInUser._id
  }
}
</script>
