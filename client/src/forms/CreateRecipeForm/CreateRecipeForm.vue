<template>
  <validation-observer
    ref='observer'
    v-slot='{ handleSubmit }'
  >
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)'>

      <validation-provider
        name='name'
        :rules='{ required: true, min: 3, alpha_spaces: true }'
        v-slot='validationContext'
      >
        <b-form-group
          label='Recipe name'
          label-align='left'
          label-for='recipeName'
          class='mb-5'
        >
          <b-form-input
            id='recipeName'
            v-model='form.name'
            :state='getValidationState(validationContext)'
            placeholder='Ex. "Delicious blueberry pie"'
          />

          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>

        </b-form-group>
      </validation-provider>

      <!-- Category radio buttons -->
      <validation-provider
        name='category'
        :rules='{ required: true }'
        v-slot='validationContext'
      >
        <b-form-group
          label='Category'
          label-for='recipeCategory'
          class='mb-5'
        >
          <b-form-radio-group
            id='recipeCategory'
            v-model='form.category'
            radio-aling
            :state='getValidationState(validationContext)'
            :options='category'
          />
        </b-form-group>
      </validation-provider>

      <!-- Description text area -->
      <b-form-group
        label='Description'
        label-align='left'
        label-for='recipeDescription'
        class='mb-5'
      >
        <b-form-textarea
          id='recipeDescription'
          v-model='form.description'
          placeholder='Tell us why your recipe is delicious.'
          rows='3'
          max-rows='6'
        />
      </b-form-group>

      <!-- File uploader for recipe image -->
      <div class='mb-5'>
        <p>
          Upload an image of your recipe
        </p>
        <FileUploader />
      </div>

      <!-- TODO: Ingredients ??? stuff fields -->

      <!-- Allergy checkboxes -->
      <!-- TODO: Align checkboxes to the left, and on same line as label. -->
      <b-form-group
        label='Allergy warnings'
        label-align='left'
        label-for='recipeAllergies'
        description='Is your recipe safe for everyone to enjoy? Let us know if it contains any of above.'
        class='mb-5'
      >
        <b-form-checkbox-group
          id='recipeAllergies'
          v-model='form.allergies'
          :options='allergies'
        />
      </b-form-group>

      <!-- Dietary restrictions checkboxes -->
      <!-- TODO: Align checkboxes to the left, and on same line as label. -->
      <b-form-group
        label='Dietary restrictions'
        label-align='left'
        label-for='recipeDietRestrictions'
        description='Which diets are your recipe safe for?'
        class='mb-5'
      >
        <b-form-checkbox-group
          id='recipeDietRestrictions'
          v-model='form.dietaryRestrictions'
          :options='dietaryRestrictions'
        />
      </b-form-group>

      <AddInstructions />

      <b-button
        type='submit'
        variant='primary'
        block
        class='my-5'
      >
        Create recipe
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
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import FileUploader from '@/components/FileUploader'
import AddInstructions from './AddInstructions'

export default {
  name: 'CreateRecipe',

  components: {
    ValidationProvider,
    ValidationObserver,
    AddInstructions,
    FileUploader
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

  created() {
    this.form.user = this.loggedInUser._id
  }
}
</script>
