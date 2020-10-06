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
            <b-form-input
              v-model='form.username'
              :state='getValidationState(validationContext)'
              placeholder='Write your username here'
              id='username-input'
            />
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name='email'
          :rules='{ required: true}'
          v-slot='validationContext'
        >
          <b-form-group
          label='E-mail'
          label-for='email-input'
          >
            <b-form-input
              v-model='form.email'
              :state='getValidationState(validationContext)'
              placeholder='E-mail'
              id='email-input'
            />
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name='password'
          :rules='{ required: true}'
          v-slot='validationContext'
        >
          <b-form-group
          label='Password'
          label-for='password-input'
          >
            <b-form-input
              v-model='form.password'
              :state='getValidationState(validationContext)'
              type='password'
              placeholder='Password'
              id='password-input'
            />
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <b-form-group>
          <file-uploader @clicked='setImage'/>
        </b-form-group>

        <b-button
          type='submit'
          variant='primary'
          block
        >
          <b-icon-check2-all />
          Save changes
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
        username: null,
        email: null,
        password: null,
        image: null,
        _id: null
      }
    }
  },
  methods: {
    ...mapActions(['patchUser']),
    async onSubmit() {
      const message = await this.patchUser(this.form)
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

    async setImage(event) {
      this.form.image = event
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    const user = this.loggedInUser
    this.form.username = user.username
    this.form.email = user.email
    this.form.image = user.image
    this.form._id = user._id
  }
}
</script>

<style scoped>

</style>
