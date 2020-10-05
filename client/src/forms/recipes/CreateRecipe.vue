<template>
  <div>

    <div>
      <b-button
        v-b-modal.modal-center-prevent-closing
        variant='primary'
        block
      >
        <b-icon-plus-circle /> Create a new recipe
      </b-button>

      <b-modal
        id='modal-center-prevent-closing'
        ref='modal'
        @show='resetModal'
        @hidden='resetModal'
        @ok='handleOk'
        hide-header
        hide-footer
        centered
        body-class='p-0'
      >

        <b-img
          class='header-image'
          src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
          alt='Pop-up heading image, happy people cooking.'
        />

        <validation-observer
          ref='observer'
          v-slot='{ handleSubmit }'
        >
          <b-form
            @submit.stop.prevent='handleSubmit(onSubmit)'
            class='p-5'
          >

            <validation-provider
              name='name'
              :rules='{ required: true, min: 3, alpha_spaces: true }'
              v-slot='validationContext'
            >
              <b-form-group
                label='What do you want to name your recipe?'
                label-align='left'
                label-for='recipeName'
              >
                <b-form-input
                  id='recipeName'
                  v-model='form.name'
                  :state='getValidationState(validationContext)'
                  placeholder='Ex. "Delicious blueberry pie"'
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </b-form-group>
            </validation-provider>

            <b-button-group
              class='mt-4 w-100'
            >
              <b-button
                type='reset'
                variant='outline-danger'
                @click='resetModal'
              >
                <b-icon-trash /> Cancel
              </b-button>
              <b-button
                type='submit'
                variant='outline-success'
              >
                <b-icon-check2-all /> Create recipe
              </b-button>
            </b-button-group>

          </b-form>
        </validation-observer>
      </b-modal>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'CreateRecipe',

  components: { ValidationProvider, ValidationObserver },

  data() {
    return {
      form: {
        user: null,
        name: '',
        category: '',
        description: '',
        image: '',
        ingredients: [],
        allergies: [],
        dietaryRestrictions: [],
        instructions: []
      }
    }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'oneRecipe'])
  },

  methods: {
    ...mapActions(['postRecipe', 'selectRecipe']),

    resetModal() {
      this.form.name = ''
      this.$bvModal.hide('modal-center-prevent-closing')
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.onSubmit()
    },

    async onSubmit() {
      const message = await this.postRecipe(this.form)

      if (message) {
        this.$refs.observer.setErrors(message)
        console.log(message)
      } else {
        this.selectRecipe(this.form)
        console.log(this.oneRecipe)
        await this.$router.push('/my-recipe')
      }
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  },

  created() {
    this.form.user = this.loggedInUser._id
  }
}
</script>

<style scoped>
.header-image {
  height: 30vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
