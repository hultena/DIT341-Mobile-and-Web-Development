<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
      <validation-provider
        name="name"
        :rules="{ required: true}"
        v-slot="validationContext"
      >
      <b-form-group>
        <b-form-input
          v-model="form.name"
          :state="getValidationState(validationContext)"
          placeholder="Ingredient name"
        />
        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
      </b-form-group>
      </validation-provider>

      <validation-provider
        name="food type"
        :rules="{}"
        v-slot="validationContext"
      >
      <b-form-group>
        <b-form-input
          id="type-input"
          :state="getValidationState(validationContext)"
          v-model="form.foodType"
          placeholder="Type of ingredient"
        />
        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
      </b-form-group>
      </validation-provider>

      <validation-provider
        name="description"
        :rules="{ max: 140}"
        v-slot="validationContext"
      >
      <b-form-group>
        <b-form-textarea
          id="description-input"
          :state="getValidationState(validationContext)"
          v-model="form.description"
          placeholder="Enter a description of the ingredient"
          rows="3"
        />
        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
      </b-form-group>
      </validation-provider>
      <b-button type="submit" variant="primary">Create ingredient</b-button>
    </b-form>
    </validation-observer>
    <b-modal
      ref="success"
      centered
      hide-footer
      hide-header
    >
      <div @click="$refs.success.hide()">
        <b-icon-check2/>
        <span class="modal-text">
      {{form.name}} successfully created!
      </span>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'AddIngredientForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        user: null,
        name: null,
        foodType: null,
        description: null
      }
    }
  },
  methods: {
    ...mapActions(['postIngredient']),
    async onSubmit() {
      const message = await this.postIngredient(this.form)
      if (message) {
        this.$refs.observer.setErrors(message)
      } else {
        this.$refs.success.show()
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'allIngredients', 'allUserIngredients'])
  },
  created() {
    this.form.user = this.loggedInUser._id
  }
}
</script>

<style scoped>
.bi-check2 {
  position: relative;
  top: 1.2em;
  fill: green;
  width: 2em;
  height: 2em;
}
/deep/ .modal-text {
  position: relative;
  top: 1em;
}

/deep/ .modal-body > div {
  padding: 0;
  height: 100%;
  width: 100%;
}
/deep/ .modal-body {
  text-align: center;
  height: 5em;
  padding: 0;
  margin: 0;
}
</style>
