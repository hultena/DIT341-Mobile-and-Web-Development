<template>
  <div>
  <b-card>
    <b-card-header v-if="state">
      <ingredient-search-bar></ingredient-search-bar>
      {{shoppingList._id}}
    </b-card-header>
    <b-list-group flush>
      <b-list-group-item v-for="ingredient in this.shoppingList.ingredients" :key="ingredient._id">
        {{ ingredient.name }}
          <b-icon-trash
            v-if="state"
            @click="catchEvent(ingredient._id)"/>
      </b-list-group-item>
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
    ...mapActions(['selectShoppingList', 'deleteShoppingList', 'clearSelectedIngredient', 'putShoppingList']),
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
      this.setChosenCard()
      if (this.state) {
        this.putShoppingList(this.shoppingList)
      }
      // shift the state
      this.state = !this.state
    },
    catchEvent(event) {
      const idx = this.shoppingList.ingredients.findIndex(function (shoppingList) {
        return shoppingList._id === event
      })
      this.shoppingList.ingredients.splice(idx, 1)
    }
  },
  computed: {
    ...mapGetters(['oneIngredient'])
  },
  watch: {
    '$store.state.ingredients.selectedIngredient': function () {
      if (this.state && this.oneIngredient) {
        this.shoppingList.ingredients.push(this.oneIngredient)
        this.clearSelectedIngredient()
      }
    }
  }
}
</script>

<style scoped>

</style>
