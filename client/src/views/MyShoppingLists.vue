<template>
  <div>
    <shopping-list-card
      v-for="shoppingList in allShoppingLists"
      :key="shoppingList._id"
      :shoppingList="shoppingList"/>
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
    }
  },
  methods: {
    ...mapActions(['getShoppingLists', 'postShoppingList', 'getIngredients'])
  },
  computed: {
    ...mapGetters(['allShoppingLists'])
  }
}
</script>

<style scoped>

</style>
