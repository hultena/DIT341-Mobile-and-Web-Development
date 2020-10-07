<template>
  <validation-observer ref='observer' v-slot='{ handleSubmit }'>
    <b-card class='my-2 ingredient-card'>
      <b-card-body>

        <b-card-title>
          <p v-if='!state'>{{ ingredient.name }}</p>
          <b-form-group v-else>
            <validation-provider
              name='name'
              :rules='{ required: true}'
              v-slot='validationContext'
            >
              <b-input
                v-model='ingredient.name'
                :state='getValidationState(validationContext)'
                placeholder='Ingredient name'
              />
              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-card-title>

        <b-card-sub-title>
          <p v-if='!state'><b>Food type:</b> {{ ingredient.foodType }}</p>
          <b-input
            v-else
            v-model='ingredient.foodType'
            placeholder='Type of ingredient'
          />
        </b-card-sub-title>

        <b-card-text>
          <p v-if='!state'><b>Description:</b> {{ ingredient.description }}</p>
          <b-form-group v-else>
            <validation-provider
              name='description'
              :rules='{ max: 140}'
              v-slot='validationContext'
            >
              <b-textarea
                v-model='ingredient.description'
                :state='getValidationState(validationContext)'
                placeholder='Ingredient description'
                class='mt-2'
              />
              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-card-text>

        <b-button-group class='mt-3 w-100'>
          <b-button
            @click='deleteCard'
            variant='outline-danger'
          >
            <b-icon-trash />
            Delete
          </b-button>
          <b-button
            v-if='!state'
            @click='handleSubmit(edit)'
            variant='outline-primary'
          >
            <b-icon-pencil />
            Edit
          </b-button>
          <b-button
            v-else
            @click='handleSubmit(edit)'
            variant='outline-success'
          >
            <b-icon-check2-all />
            Save
          </b-button>
        </b-button-group>

      </b-card-body>
    </b-card>
  </validation-observer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'IngredientCard',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    ingredient: {}
  },
  data() {
    return {
      state: false
    }
  },
  methods: {
    ...mapActions(['selectIngredient', 'deleteIngredient', 'putIngredient']),
    setChosenCard() {
      this.selectIngredient(this.ingredient)
    },
    deleteCard() {
      this.deleteIngredient(this.ingredient)
    },
    edit() {
      this.setChosenCard()
      if (this.state) {
        this.putIngredient(this.ingredient)
      }
      this.state = !this.state
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>

<style scoped>
.ingredient-card {
  min-width: 300px
}
</style>
