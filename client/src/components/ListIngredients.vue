<template>
  <b-list-group>
    <b-list-group-item
      v-for='ingredient in oneRecipe.ingredients'
      :key='ingredient._id'
    >
      {{oneRecipe.ingredientQuantities[ingredient._id]['quantity']}}
      {{oneRecipe.ingredientQuantities[ingredient._id]['unit']}}
      {{ingredient.name}}

    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListIngredients',
  computed: {
    ...mapGetters(['oneRecipe'])
  }

}
</script>
