<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <validation-provider
          name="username"
          :rules="{ required: true}"
          v-slot="validationContext"
        >
          <b-form-group>
            <b-form-input
              v-model="form.username"
              :state="getValidationState(validationContext)"
              placeholder="Username"
            ></b-form-input>

            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="email"
          :rules="{ required: true}"
          v-slot="validationContext"
        >
          <b-form-group>
            <b-form-input
              v-model="form.email"
              :state="getValidationState(validationContext)"
              placeholder="E-mail"
            ></b-form-input>

            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="password"
          :rules="{ required: true}"
          v-slot="validationContext"
        >
          <b-form-group>
            <b-form-input
              v-model="form.password"
              :state="getValidationState(validationContext)"
              type="password"
              placeholder="Password"
            ></b-form-input>

            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'AddUserForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(['postUser']),
    async onSubmit() {
      const message = await this.postUser(this.form)
      if (message) {
        this.$refs.observer.setErrors(message)
      } else {
        this.resetForm()
        alert('Sign-up successful')
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    resetForm() {
      this.form = {
        username: null,
        email: null,
        password: null
      }

      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>

<style scoped>

</style>
