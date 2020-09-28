
<template>
      <div>
        <!-- TODO: remove this style and make this work nicer --->
        <b-img style="width: 3rem; height: auto" :src="stringImage" alt=""/>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
              <validation-provider
                name="image"
                :rules="{ size:50, image: true }"
                v-slot="validationContext"
                >
              <b-form-group>
                <b-form-file v-model="image" @change="handleImage" accept="image/*" :state="getValidationState(validationContext)" />
                <b-button @click="onSubmit">Set</b-button>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
              </validation-provider>
            </b-form>
          </validation-observer>
      </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'home',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      image: null,
      stringImage: null
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]
      /* arbitrary size of 50KiB as body-parser won't handle more than 100KiB
        we can probably change this but 50 should be sufficient for basic images
       */
      this.createBase64Image(selectedImage)
    },
    createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.stringImage = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async onSubmit(event) {
      // TODO: need to pass the image to whatever user/recipe that's supposed to have it.
      this.$emit('clicked', this.stringImage)
    }
  }
}
</script>
<style>
</style>
