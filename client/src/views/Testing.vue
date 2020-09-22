<template>
  <div>
    <AddUser></AddUser>
    <h3>All Users</h3>
    <div class='users'>
      <div v-for='user in allUsers' :key='user._id' class='user'>{{ user.username }}</div>
    </div>
    <h3>All Recipes</h3>
    <div class='recipes'>
      <div v-for='recipe in allRecipes' :key='recipe._id' class='recipe'>{{ recipe.name }}</div>
    </div>
    <h3>All Ingredients</h3>
    <div class='ingredients'>
      <div v-for='ingredient in allIngredients' :key='ingredient._id' class='ingredient'>{{ ingredient.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddUser from '@/components/AddUser'
export default {
  name: 'Testing',
  components: { AddUser },
  methods: {
    ...mapActions(['getUsers', 'getRecipes', 'getIngredients'])
  },
  computed: {
    ...mapGetters(['allUsers', 'allIngredients', 'allRecipes'])
  },
  // vue lifecycle method
  created() {
    this.getUsers()
    this.getRecipes()
    this.getIngredients()
  }
}
</script>

<style scoped>

</style>
