
<template>
      <div>
        <!-- TODO: remove this style and make this work nicer --->
        <b-form-group>
          <b-img style="width: 3rem; height: auto" :src="image[0]" alt="as"/>
          <b-form-group>
            <b-file v-model="image" @change="handleImage" accept="image/*"/>
            <b-button @click="submit">Set</b-button>
          </b-form-group>
        </b-form-group>
      </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      image: []
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]
      /* arbitrary size of 50KiB as body-parser won't handle more than 100KiB
        we can probably change this but 50 should be sufficient for basic images
       */
      if (selectedImage.size > 51200) {
        // this.$refs.imageInput.value = null
        /* TODO: Maybe have better messages than some garbage alert.
           TODO: and please make this better than these horrible nested if statements
         */
        if (selectedImage.size > 51200) {
          alert('Image may not exceed 50kB')
        } else {
          alert('File must be an image')
        }
      } else {
        this.createBase64Image(selectedImage)
      }
    },
    createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image[0] = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    async submit(event) {
      // TODO: need to pass the image to whatever user/recipe that's supposed to have it.
      this.$emit('clicked', this.image)
    }
  }
}
</script>
<style>
</style>
