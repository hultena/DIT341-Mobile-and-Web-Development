<template>
  <div>
    <b-row>
      <b-col
        v-for="shoppingList in allShoppingLists"
        :key="shoppingList._id"
        class="col-12">
        <shopping-list-card
          :shoppingList="shoppingList"
          class="my-3"/>
      </b-col>
    </b-row>
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
