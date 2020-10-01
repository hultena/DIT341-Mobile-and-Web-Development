<template>
  <div>
    <b-button @click="addShoppingList">Add Shopping List</b-button>
    <shopping-list-card v-for="shoppingList in allShoppingLists" :key="shoppingList._id" :shoppingList="shoppingList"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShoppingListCard from '@/components/ShoppingListCard'
export default {
  name: 'MyShoppingLists',
  components: {
    ShoppingListCard
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    ...mapActions(['getShoppingLists', 'postShoppingList', 'getIngredients']),
    addShoppingList() {
      const shoppingList = {
        user: this.loggedInUser._id
      }
      this.postShoppingList(shoppingList)
    }
  },
  computed: {
    ...mapGetters(['allShoppingLists', 'loggedInUser'])
  },
  created() {
    const user = this.loggedInUser._id
    this.getShoppingLists(user)
  }
}
</script>

<style scoped>

</style>
