<template>
  <div>
  <b-card @click="setChosenCard">
    <b-card-header v-if="state">
      <ingredient-search-bar></ingredient-search-bar>
    </b-card-header>
    <b-list-group flush>
      <b-list-group-item v-for="ingredient in this.ingredients" :key="ingredient._id">{{ ingredient.name }}</b-list-group-item>
    </b-list-group>

    <b-card-footer>
      <b-button @click="deleteCard">Delete</b-button>
      <b-button @click="edit">Edit</b-button>
    </b-card-footer>
  </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IngredientSearchBar from '@/components/IngredientSearchBar'
export default {
  name: 'ShoppingListCard',
  components: { IngredientSearchBar },
  data() {
    return {
      ingredients: [],
      state: false
    }
  },
  props: {
    shoppingList: {}
  },
  methods: {
    ...mapActions(['selectShoppingList', 'deleteShoppingList', 'clearSelectedIngredient']),
    setChosenCard() {
      this.selectShoppingList(this.shoppingList)
    },
    allIngredients() {
      return this.shoppingList.ingredients
    },
    deleteCard() {
      this.deleteShoppingList(this.shoppingList)
    },
    edit() {
      // TODO: Add saving of card when state ends
      this.state = !this.state
    }
  },
  computed: {
    ...mapGetters(['oneIngredient'])
  },
  watch: {
    '$store.state.ingredients.selectedIngredient': function () {
      if (this.state && this.oneIngredient) {
        this.ingredients.push(this.oneIngredient)
        this.clearSelectedIngredient()
        console.log(this.ingredients)
      }
    }
  },
  created() {
    this.ingredients = this.shoppingList.ingredients
  }
}
</script>

<style scoped>

</style>
