<template>
  <validation-observer ref='observer' v-slot='{ handleSubmit }'>
    <b-form @submit.stop.prevent='handleSubmit(onSubmit)'>
      <b-row>
        <b-col>
          <validation-provider
            name='username'
            :rules='{ required: true}'
            v-slot='validationContext'
          >
            <b-form-group
              label='Username'
              label-for='username-input'
            >
              <b-input-group class='min-width-check'>
                <b-input-group-prepend is-text>
                  <b-icon-person />
                </b-input-group-prepend>
                <b-form-input
                  v-model='form.username'
                  :state='getValidationState(validationContext)'
                  placeholder='Username'
                  id='username-input'
                />
              </b-input-group>

              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            name='password'
            :rules='{ required: true}'
            v-slot='validationContext'
          >
            <b-form-group
              label='Password'
              label-for='password-input'
              class='mb-5'
            >
              <b-input-group class='min-width-check'>
                <b-input-group-prepend is-text>
                  <b-icon-shield-lock />
                </b-input-group-prepend>
                <b-form-input
                  v-model='form.password'
                  :state='getValidationState(validationContext)'
                  type='password'
                  placeholder='Password'
                  label-for='password-input'
                />
              </b-input-group>
              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <b-button
        type='submit'
        variant='primary'
        block
      >
        <b-icon-door-open />
        Sign me in
      </b-button>

    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'UserLogInForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(['authUser']),
    async onSubmit() {
      const message = await this.authUser(this.form)
      if (message) {
        // TODO: Maybe change this to an alert or something in the future?
        this.$refs.observer.setErrors(message)
      } else {
        // this redirects to the page
        await this.$router.push('my-profile')
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>

<style scoped>
.min-width-check { min-width: 200px; }
</style>
