<template>
  <b-container>
    <h1>
      {{ recipe.name }}
    </h1>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyRecipePage',

  computed: { ...mapGetters(['oneRecipe']) },

  data() { return { recipe: {} } },

  mounted() { this.recipe = this.oneRecipe }
}
</script>

<style scoped>

</style>
