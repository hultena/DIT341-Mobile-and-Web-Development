<template>
  <div>
    <validation-observer ref='observer' v-slot='{ handleSubmit }'>
      <b-form @submit.stop.prevent='handleSubmit(onSubmit)'>
        <validation-provider
          name='username'
          :rules='{ required: true}'
          v-slot='validationContext'
        >
          <b-form-group
            label='Username'
            label-for='username-input'
          >
            <b-input-group>
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

        <b-row>
          <b-col>
            <validation-provider
              name='email'
              :rules='{ required: true}'
              v-slot='validationContext'
            >
              <b-form-group
                label='E-mail'
                label-for='email-input'
              >
                <b-input-group class='min-width-check'>
                  <b-input-group-prepend is-text>
                    <b-icon-envelope />
                  </b-input-group-prepend>
                  <b-form-input
                    v-model='form.email'
                    :state='getValidationState(validationContext)'
                    placeholder='E-mail'
                    id='email-input'
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
                    id='password-input'
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
          <b-icon-person-plus />
          Sign me up
        </b-button>

      </b-form>
    </validation-observer>
    <b-modal
      ref="success"
      centered
      hide-footer
      hide-header
      @hide="logInUser"
    >
      <div @click="$refs.success.hide()">
        <b-icon-check2/>
        <span class="modal-text">
          {{form.username}} successfully registered!
        </span>
      </div>
    </b-modal>
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
    ...mapActions(['postUser', 'authUser']),
    async onSubmit() {
      const message = await this.postUser(this.form)
      if (message) {
        this.$refs.observer.setErrors(message)
      } else {
        this.$refs.success.show()
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async logInUser() {
      const user = {
        username: this.form.username,
        password: this.form.password
      }
      await this.authUser(user)
      await this.$router.push('my-profile')
    }
  }
}
</script>

<style scoped>
.min-width-check { min-width: 200px; }

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
