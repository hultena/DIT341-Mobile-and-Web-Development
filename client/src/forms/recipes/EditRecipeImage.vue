<template>
  <div class='image-container'>
    <b-img v-if="oneRecipe.image"
      :src='oneRecipe.image'
      alt='This is an image of what the recipe could look like cooked.'
    />
    <file-uploader
      @clicked='updateImage'
      class='image-input'
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'EditRecipeImage',

  components: { FileUploader },
  data() {
    return {
      recipe: null
    }
  },
  computed: {
    ...mapGetters(['oneRecipe'])
  },

  methods: {
    ...mapActions(['patchRecipe']),

    async updateImage(event) {
      this.recipe.image = event

      const message = await this.patchRecipe(this.recipe)

      if (message) this.$refs.observer.setErrors(message)
    }
  },
  created() {
    this.recipe = this.oneRecipe
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
  height: 50vh;
  width: 100vw;
  background: #f5f5f5
}
.image-container > .image-input,
.image-container > img {
  position: absolute;
}
.image-container > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: .4;
}
.image-container > .image-input {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
