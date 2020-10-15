<template>
  <div>
  <b-card class="my-2">
    <b-card-header v-if="ingredientState">
      <ingredient-search-bar></ingredient-search-bar>
    </b-card-header>
    <b-list-group flush>
      <b-list-group-item
        v-for="ingredient in shoppingList.ingredients"
        :key="ingredient._id"
        class="ingredient">
        <b-container>
          <b-row>
            <b-col
              v-if="ingredientState">
              <b-input-group>
                <b-form-input
                  type="text"
                  v-model="shoppingList.ingredientQuantities[ingredient._id]['quantity']"
                />
                <b-input-group-append>
                  <b-form-select
                    v-model="shoppingList.ingredientQuantities[ingredient._id]['unit']"
                    :options="unit"
                    value-field="item"
                    text-field="name"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col cols="4" >
              <span v-if="!ingredientState">
                {{shoppingList.ingredientQuantities[ingredient._id]['quantity']}}
                {{shoppingList.ingredientQuantities[ingredient._id]['unit']}}
              </span>
              {{ ingredient.name }}
              <b-icon-trash
                v-if="ingredientState"
                class="delete"
                @click="deleteIngredient(ingredient._id)"/>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
    <b-button-group class='mt-3 w-100'>
    <b-button
      @click='deleteCard'
      variant='outline-danger'
    >
      <b-icon-trash />
      Delete
    </b-button>
    <b-button
      v-if='!ingredientState'
      @click='edit'
      variant='outline-primary'
    >
      <b-icon-pencil />
      Edit
    </b-button>
    <b-button
      v-else
      @click='edit'
      variant='outline-success'
    >
      <b-icon-check2-all />
      Save
    </b-button>
  </b-button-group>
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
      ingredientState: false,
      unit: [
        { item: 'g', name: 'g' },
        { item: 'kg', name: 'kg' },
        { item: 'ml', name: 'ml' },
        { item: 'l', name: 'l' },
        { item: '', name: 'count' }
      ]
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
      if (this.ingredientState) {
        this.putShoppingList(this.shoppingList)
      }
      // shift the state
      this.ingredientState = !this.ingredientState
    },
    deleteIngredient(event) {
      const idx = this.shoppingList.ingredients.findIndex(function (shoppingList) {
        return shoppingList._id === event
      })
      this.shoppingList.ingredients.splice(idx, 1)
    }
  },
  computed: {
    ...mapGetters(['oneIngredient'])
  },
  created() {
    if (!this.shoppingList.ingredientQuantities) {
      this.shoppingList.ingredientQuantities = {}
    }
  },
  watch: {
    '$store.state.ingredients.selectedIngredient': function () {
      if (this.ingredientState && this.oneIngredient) {
        this.shoppingList.ingredients.push(this.oneIngredient)
        this.shoppingList.ingredientQuantities[this.oneIngredient._id] = { unit: '', quantity: '' }
        this.clearSelectedIngredient()
      }
    }
  }
}
</script>

<style scoped>
.delete:hover {
  color: red;
}

</style>
