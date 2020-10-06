<template>
  <div>
  <validation-observer
    ref='observer'
    v-slot='{ handleSubmit }'
  >
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)' >
      <div class='image-container'>
        <b-img v-if="oneRecipe.image"
               :src='oneRecipe.image'
               alt='This is an image of what the recipe could look like cooked.'
        />
        <file-uploader
          @clicked='updateImage'
          class='image-input'
        />
      </div>
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

          </b-input-group>
        </b-form-group>
      </validation-provider>
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
      <b-container>
        <b-row>
          <b-col>
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
          </b-col>
          <b-col>
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
          </b-col>
        </b-row>
      </b-container>
      <b-form-group
        label='Recipe instructions'
        label-for='recipe-instructions'
        id='instructionsContainer'
      >
        <b-input-group
          v-for='(instruction, index) in recipe.instructions'
          :key='index'
          class='pt-1 pb-3'
        >
          <b-form-input
            id='recipe-instructions'
            v-model='instruction.step'
            :name='`instructions[${index}][step]`'
            type='text'
            placeholder='Write an instruction step here.'
          />
        </b-input-group>

        <b-button
          @click='addInstruction'
          variant='outline-primary'
          block
        >
          <b-icon-plus-circle /> Add instruction
        </b-button>
      </b-form-group>
      <b-button
        type='submit'
        block
        variant='outline-success'>
        Save Changes
      </b-button>
    </b-form>
  </validation-observer>
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
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'EditRecipe',

  components: { ValidationObserver, ValidationProvider, FileUploader },

  data() {
    return {
      recipe: {},
      category: [
        { text: 'Cooking', value: 'Cooking' },
        { text: 'Baking', value: 'Baking' }
      ],
      dietaryRestrictions: [
        { text: 'Vegan', value: 'Vegan' },
        { text: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian' },
        { text: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
        { text: 'Lacto-Ovo Vegetarian', value: 'Lacto-Ovo Vegetarian' },
        { text: 'Halaal', value: 'Halaal' },
        { text: 'Kosher', value: 'Kosher' },
        { text: 'Pescetarian', value: 'Pescetarian' }
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
      ]
    }
  },

  computed: { ...mapGetters(['oneRecipe', 'loggedInUser']) },

  methods: {
    ...mapActions(['putRecipe', 'deleteRecipe']),

    async onSubmit() {
      const message = await this.putRecipe(this.recipe)

      if (message !== undefined) {
        this.$refs.observer.setErrors(message)
      }
    },
    async updateImage(event) {
      this.recipe.image = event
    },
    addInstruction() {
      this.recipe.instructions.push({ step: '' })
    },
    deleteThisRecipe() {
      this.deleteRecipe(this.recipe)
      this.$router.push('/my-profile')
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },

  created() {
    this.recipe = this.oneRecipe
  }
}
</script>
<style scoped>
.image-container {
  position: relative;
  height: 50vh;
  width: 100vw;
  background: #f5f5f5
}
.image-container > .image-input,
.image-container > img {
  position: absolute;
}
.image-container > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: .4;
}
.image-container > .image-input {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
