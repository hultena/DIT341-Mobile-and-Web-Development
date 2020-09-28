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

        <b-form-group>
          <img :src="form.image">
          <file-uploader @clicked="setImage"/>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import FileUploader from '@/components/FileUploader'
export default {
  name: 'EditUserForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    FileUploader
  },
  data() {
    return {
      form: {
        username: this.$store.state.users.loggedIn.username,
        email: this.$store.state.users.loggedIn.email,
        password: null,
        image: this.$store.state.users.loggedIn.image
      }
    }
  },
  methods: {
    ...mapActions(['patchUser']),
    async onSubmit() {
      const user = this.form
      user._id = this.$store.state.users.loggedIn._id
      const message = await this.patchUser(user)
      if (message) {
        this.$refs.observer.setErrors(message)
      } else {
        // TODO: maybe remove this annoying alert
        alert('Success!')
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    setImage(event) {
      this.form.image = event
    }
  }
}
</script>

<style scoped>

</style>
