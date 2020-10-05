<template>
  <validation-observer
    ref='observer'
    v-slot='{ handleSubmit }'
  >
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)' >
      <validation-provider
        name='name'
        :rules='{ required: true, min: 3, alpha_spaces: true }'
        v-slot='validationContext'
      >
        <b-form-group
          label='Recipe name'
          label-for='input-field'
        >
          <b-input-group>

            <b-form-input
              id='input-field'
              v-model='recipe.name'
              :state='getValidationState(validationContext)'
              placeholder='Ex. "Delicious blueberry pie"'
            />

            <b-input-group-append>
              <b-button
                variant='outline-success'
                type='submit'
              >
                Save name
              </b-button>
            </b-input-group-append>

          </b-input-group>
        </b-form-group>
      </validation-provider>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeNameForm',

  components: { ValidationObserver, ValidationProvider },

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
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },

  mounted() {
    this.recipe.user = this.loggedInUser._id
    console.log(this.recipe)
  }
}
</script>
