<template>
  <validation-observer
    ref='observer'
    v-slot='{ handleSubmit }'
  >
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)'>
      <b-button
        type='submit'
        variant='primary'
        block
        class='my-5'
      >
        Save changes
      </b-button>

    </b-form>
  </validation-observer>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  ValidationObserver
} from 'vee-validate'

export default {
  name: 'EditRecipeForm',

  components: {
    ValidationObserver
  },

  props: {
    recipe: Object
  },

  data() {
    return {
      form: {
        user: null,
        name: null,
        category: null,
        description: null,
        ingredients: [],
        allergies: [],
        dietaryRestrictions: [],
        instructions: []
      },
      category: [
        { text: 'Cooking', value: 'Cooking' },
        { text: 'Baking', value: 'Baking' }
      ],
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
      ],
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

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  methods: {
    ...mapActions(['postRecipe']),

    async onSubmit() {
      const message = await this.postRecipe(this.form)

      if (message) this.$refs.observer.setErrors(message)
      else alert('Form submitted! \n\n' + JSON.stringify(this.form, null, 2))
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },

  mounted() {
    this.form.user = this.loggedInUser._id
    this.form.name = this.props.recipe.name
    this.form.category = this.props.recipe.category
    this.form.description = this.props.recipe.description
  }
}
</script>
