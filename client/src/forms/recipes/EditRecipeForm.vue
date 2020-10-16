<template>
  <div>
    <validation-observer
      ref='observer'
      v-slot='{ handleSubmit }'
    >

      <b-form @submit.stop.prevent='handleSubmit(onSubmit)' >
        <div class='image-container mb-5'>
          <b-img
            v-if='oneRecipe.image'
            :src='oneRecipe.image'
            alt='This is an image of what the recipe could look like cooked.'
          />
          <file-uploader
            @clicked='updateImage'
            class='image-input'
          />
        </div>

        <b-container>
          <b-row>
            <b-col>
              <validation-provider
                name='name'
                :rules='{ required: true, min: 3, alpha_spaces: true }'
                v-slot='validationContext'
              >
                <b-form-group
                  label='Recipe name'
                  label-for='recipe-name'
                  class='mb-5'
                >
                  <b-input-group>

                    <b-form-input
                      id='recipe-name'
                      v-model='recipe.name'
                      :state='getValidationState(validationContext)'
                      placeholder='Ex. "Delicious blueberry pie"'
                    />

                  </b-input-group>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col>
              <b-form-group
                label='Recipe category'
                label-for='recipe-category'
                class='mb-5'
              >
                <b-form-radio-group
                  id='recipe-category'
                  v-model='recipe.category'
                  radio-aling
                  :options='category'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label='Recipe description'
                label-align='left'
                label-for='recipe-description'
                class='mb-5'
              >
                <b-form-textarea
                  id='recipe-description'
                  v-model='recipe.description'
                  placeholder='Tell us why your recipe is delicious.'
                  rows='3'
                  max-rows='6'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class='mb-5'>
            <b-col>
              <b-form-group
                label='Dietary restrictions'
                label-align='left'
                label-for='recipe-dietary-restrictions'
                description='Which diets are your recipe safe for?'
              >

                <b-form-checkbox-group
                  id='recipe-dietary-restrictions'
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

          <b-container class="mb-5">
            <b-button
              @click='addIngredients'
              variant='outline-primary'
              block
            >
              <p v-if="ingredientState"> Finish </p>
              <p v-else>Edit Ingredients</p>
            </b-button>
            <ingredient-search-bar v-if="ingredientState"/>
            <b-list-group flush>
              <b-list-group-item
                v-for="ingredient in recipe.ingredients"
                :key="ingredient._id">
                <b-container>
                  <b-row>
                    <b-col
                      v-if="ingredientState">
                      <b-input-group>
                        <b-form-input
                          type="text"
                          v-model="recipe.ingredientQuantities[ingredient._id]['quantity']"
                        />
                        <b-input-group-append>
                          <b-form-select
                            v-model="recipe.ingredientQuantities[ingredient._id]['unit']"
                            :options="unit"
                            value-field="item"
                            text-field="name"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>
                    <b-col cols="4">
                        <span v-if="!ingredientState">
                          {{recipe.ingredientQuantities[ingredient._id]['quantity']}}
                          {{recipe.ingredientQuantities[ingredient._id]['unit']}}
                        </span>
                        {{ ingredient.name }}
                        <b-icon-trash
                          v-if="ingredientState"
                          @click="deleteIngredient(ingredient._id)"/>
                    </b-col>
                  </b-row>
                </b-container>
              </b-list-group-item>
            </b-list-group>
          </b-container>

          <b-row>
            <b-col>
              <b-form-group
                label='Recipe instructions'
                label-for='recipe-instructions'
                id='instructionsContainer'
                class='mb-5'
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
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-card class='mt-3 mb-1'>
                <b-card-title>
                  All done with editing your {{recipe.name}} recipe?
                </b-card-title>
                <b-button
                  type='submit'
                  block
                  variant='primary'
                >
                  <b-icon-check2-all />
                  Save your changes
                </b-button>
              </b-card>
            </b-col>
          </b-row>

        </b-container>
      </b-form>
    </validation-observer>

    <b-container class='my-5'>
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
              <b-icon-trash />
              Permanently delete your {{ recipe.name }} recipe
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      ref="success"
      centered
      hide-footer
      hide-header
      @hide="$router.push('my-profile')"
    >
      {{recipe.name}} successfully updated!
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import FileUploader from '@/components/FileUploader'
import IngredientSearchBar from '@/components/IngredientSearchBar'

export default {
  name: 'EditRecipe',

  components: { ValidationObserver, ValidationProvider, FileUploader, IngredientSearchBar },

  data() {
    return {
      recipe: {},
      ingredientState: false,
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
      ],
      unit: [
        { item: 'g', name: 'g' },
        { item: 'kg', name: 'kg' },
        { item: 'ml', name: 'ml' },
        { item: 'l', name: 'l' },
        { item: '', name: 'count' }
      ]
    }
  },

  computed: { ...mapGetters(['oneRecipe', 'loggedInUser', 'oneIngredient']) },

  methods: {
    ...mapActions(['putRecipe', 'deleteRecipe', 'clearSelectedIngredient']),

    async onSubmit() {
      const message = await this.putRecipe(this.recipe)

      if (message !== undefined) {
        this.$refs.observer.setErrors(message)
      } else {
        this.$refs.success.show()
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
    addIngredients() {
      this.ingredientState = !this.ingredientState
    },
    deleteIngredient(id) {
      const idx = this.recipe.ingredients.findIndex(function (ingredient) {
        return ingredient._id === id
      })
      this.recipe.ingredients.splice(idx, 1)
      delete this.recipe.ingredientQuantities[id]
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },

  created() {
    this.recipe = this.oneRecipe
    if (!this.recipe.ingredientQuantities) {
      this.recipe.ingredientQuantities = {}
    }
  },
  watch: {
    '$store.state.ingredients.selectedIngredient': function () {
      if (this.ingredientState && this.oneIngredient) {
        this.recipe.ingredients.push(this.oneIngredient)
        this.recipe.ingredientQuantities[this.oneIngredient._id] = { unit: '', quantity: '' }
        this.clearSelectedIngredient()
      }
    }
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
