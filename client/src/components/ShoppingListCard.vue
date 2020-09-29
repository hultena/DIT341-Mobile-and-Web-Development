<template>
  <div>
  <b-card @click="setChosenCard">
    <b-card-body>
      <b-card-title>Card Title</b-card-title>
      <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
      <b-list-group-item v-for="ingredient in allIngredients" :key="ingredient._id">{{ ingredient.name }}</b-list-group-item>
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
export default {
  name: 'ShoppingListCard',
  data() {
    return {
      state: false
    }
  },
  props: {
    shoppingList: {}
  },
  methods: {
    ...mapActions(['selectShoppingList', 'deleteShoppingList']),
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
      // TODO: Enable editing of card
      this.state = !this.state
      console.log(this.state)
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>

<style scoped>

</style>
