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
              v-model='user.username'
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
              v-model='user.email'
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
              v-model='user.password'
              :state='getValidationState(validationContext)'
              type='password'
              placeholder='Password'
              id='password-input'
            />
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <b-form-group
          label='Profile photo'
          label-for='image-input'
        >
          <file-uploader
            id='image-input'
            @clicked='setImage'
          />
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
    <b-modal
      ref="success"
      centered
      hide-footer
      hide-header
      @hide="changeView('recipes')"
    >
      <div @click="$refs.success.hide()">
      <b-icon-check2/>
      <span class="modal-text">
      {{user.username}} successfully updated!
      </span>
      </div>
    </b-modal>
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
      user: {}
    }
  },
  methods: {
    ...mapActions(['patchUser', 'changeView']),
    async onSubmit() {
      const message = await this.patchUser(this.user)
      if (message) {
        this.$refs.observer.setErrors(message)
      } else {
        this.$refs.success.show()
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async setImage(event) {
      this.user.image = event
    },
    test() {
      console.log('hello')
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    this.user = this.loggedInUser
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
