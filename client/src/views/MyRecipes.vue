<template>
  <section>
    <b-row>
      <b-col>
        <create-recipe />
      </b-col>
    </b-row>

    <b-row>
      <b-col
        v-for='recipe in allUserRecipes'
        :key='recipe._id'
        class="col-xl-3 col-lg-4 col-md-5 col-sm-12"
      >
        <MyRecipeCard
          :recipe='recipe'
          class='my-3'
        />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MyRecipeCard from '@/components/MyRecipeCard'
import CreateRecipe from '@/forms/recipes/CreateRecipe'
export default {
  name: 'MyRecipes',

  components: { CreateRecipe, MyRecipeCard },

  computed: {
    ...mapGetters(['allUserRecipes', 'loggedInUser'])
  },

  created() {
    const userId = this.loggedInUser._id
    this.getUserRecipes(userId)
  },

  methods: {
    ...mapActions(['getUserRecipes']),

    createRecipe() {
      this.$router.push('/create-recipe')
    }
  }
}
</script>

<style scoped>

</style>
