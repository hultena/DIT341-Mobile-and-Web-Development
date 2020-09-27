
<template>
  <div>
    <div>
      <div>
        <!-- TODO remove this style --->
        <img style="width: 3rem; height: auto" :src="image" alt="">
        <input @change="handleImage" type="file" accept="image/*">
        <b-button @click="submit">submit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      image: ''
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },
    createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
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
