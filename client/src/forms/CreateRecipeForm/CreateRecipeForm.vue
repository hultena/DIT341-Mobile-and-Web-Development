<template>
  <validation-observer
    ref='observer'
    v-slot='{ handleSubmit }'
  >
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)'>

      <div
        class='accordion'
        role='tablist'
      >

        <b-card
          no-body
          class='mb-1'
        >
          <b-card-header
            header-tag='header'
            class='p-1'
            role='tab'
          >
            <b-button
              block
              v-b-toggle.accordion-1
              variant='outline-primary'
            >
              Describe your recipe
            </b-button>
          </b-card-header>

          <b-collapse
            id='accordion-1'
            visible
            accordion='my-accordion'
            role='tabpanel'
          >
            <b-card-body>
              <b-card-text>

                <!-- Name input field -->
                <validation-provider
                  name='name'
                  :rules='{ required: true, min: 3, alpha_spaces: true }'
                  v-slot='validationContext'
                >
                  <b-form-group
                    label='Recipe name'
                    label-align='left'
                    label-for='recipeName'
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
                <!-- TODO: Align label and radio buttons on one line, to the left -->
                <validation-provider
                  name='category'
                  :rules='{ required: true }'
                  v-slot='validationContext'
                >
                  <b-form-group
                    label='Category'
                    label-for='recipeCategory'
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
                >
                  <b-form-textarea
                    id='recipeDescription'
                    v-model='form.description'
                    placeholder='Tell us why your recipe is delicious.'
                    rows='3'
                    max-rows='6'
                  />
                </b-form-group>

              </b-card-text>
            </b-card-body>
          </b-collapse>

        </b-card>

        <b-card
          no-body
          class='mb-1'
        >
          <b-card-header
            header-tag='header'
            class='p-1'
            role='tab'
          >
            <b-button
              block
              v-b-toggle.accordion-2
              variant='outline-primary'
            >
              Give us the recipe ingredients
            </b-button>
          </b-card-header>

          <b-collapse
            id='accordion-2'
            accordion='my-accordion'
            role='tabpanel'
          >
            <b-card-body>
              <b-card-text>

                <!-- TODO: Ingredients ??? stuff fields -->

                <!-- Allergy checkboxes -->
                <!-- TODO: Align checkboxes to the left, and on same line as label. -->
                <b-form-group
                  label='Allergy warnings'
                  label-align='left'
                  label-for='recipeAllergies'
                  description='Is your recipe safe for everyone to enjoy? Let us know if it contains any of above.'
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
                >
                  <b-form-checkbox-group
                    id='recipeDietRestrictions'
                    v-model='form.dietaryRestrictions'
                    :options='dietaryRestrictions'
                  />
                </b-form-group>

              </b-card-text>
            </b-card-body>
          </b-collapse>

        </b-card>

        <b-card
          no-body
          class='mb-1'
        >
          <b-card-header
            header-tag='header'
            class='p-1'
            role='tab'
          >
            <b-button
              block
              v-b-toggle.accordion-3
              variant='outline-primary'
            >
              Tell us how to make your recipe
            </b-button>
          </b-card-header>

          <b-collapse
            id='accordion-3'
            accordion='my-accordion'
            role='tabpanel'
          >
            <b-card-body>
              <b-card-text>

                <AddInstructions />

              </b-card-text>
            </b-card-body>
          </b-collapse>

        </b-card>

      </div>

      <b-button
        type='submit'
        variant='primary'
        block
      >
        Create recipe
      </b-button>

    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import AddInstructions from './AddInstructions'

export default {
  name: 'CreateRecipe',

  components: {
    ValidationProvider,
    ValidationObserver,
    AddInstructions
  },

  data() {
    return {
      form: {
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
  }
}
</script>
