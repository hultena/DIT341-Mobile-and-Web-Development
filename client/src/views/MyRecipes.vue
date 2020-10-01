<template>
  <div>
    <b-button @click='createRecipe'>Create new recipe</b-button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'MyRecipes',

  computed: {
    // ...mapGetters(['loggedInUser'])
  },

  created() {
    // const userId = this.loggedInUser._id
  },

  methods: {
    createRecipe() {
      this.$router.push('/create-recipe')
    }
  }
}
</script>

<style scoped>

</style>
