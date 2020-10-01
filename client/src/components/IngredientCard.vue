<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-card>
      <b-card-body>
        <b-card-title>
          <p  v-if="!state">{{ ingredient.name }}</p>
          <b-form-group v-else>
            <validation-provider
              name="name"
              :rules="{ required: true}"
              v-slot="validationContext"
            >
            <b-input
              v-model="ingredient.name"
              :state="getValidationState(validationContext)"/>
              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-card-title>
        <b-card-sub-title class="mb-2">
          <p  v-if="!state">{{ ingredient.foodType }}</p>
          <b-input v-else v-model="ingredient.foodType"/>
        </b-card-sub-title>
        <b-card-text>
          <p  v-if="!state">{{ ingredient.description }}</p>
          <b-form-group v-else>
          <validation-provider
            name="description"
            :rules="{ max: 140}"
            v-slot="validationContext"
          >
          <b-textarea
            v-model="ingredient.description"
            :state="getValidationState(validationContext)"/>
          <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </validation-provider>
          </b-form-group>
        </b-card-text>
      </b-card-body>
      <b-card-footer>
        <b-button @click="deleteCard">Delete</b-button>
        <b-button @click="handleSubmit(edit)">Edit</b-button>
      </b-card-footer>
    </b-card>
    </validation-observer>
  </div>
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

</style>
