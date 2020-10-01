<template>
  <b-container>

    <b-row>
      <b-col>
        <b-button @click='createRecipe'>
          Create new recipe
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <p>Hello world</p>
        <MyRecipeCard />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
// import { mapGetters } from 'vuex'

import MyRecipeCard from '@/components/MyRecipeCard'
export default {
  name: 'MyRecipes',

  components: { MyRecipeCard },

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
