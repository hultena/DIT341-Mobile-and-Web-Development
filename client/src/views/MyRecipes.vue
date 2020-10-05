<template>
  <section>
    <b-row>
      <b-col>
        <CreateRecipeForm />
      </b-col>
    </b-row>

    <b-row class='mt-3 mb-5'>
      <b-col
        v-for='recipe in allUserRecipes'
        :key='recipe._id'
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
import CreateRecipeForm from '@/forms/recipes/CreateRecipeForm'
export default {
  name: 'MyRecipes',

  components: { CreateRecipeForm, MyRecipeCard },

  computed: {
    ...mapGetters(['allUserRecipes', 'loggedInUser'])
  },

  created() {
    const userId = this.loggedInUser._id
    this.getUserRecipes(userId)
    console.log(this.allUserRecipes)
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
