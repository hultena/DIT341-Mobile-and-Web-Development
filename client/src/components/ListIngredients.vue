<template>
  <b-list-group>
    <b-list-group-item
      v-for='(ingredient, index) in props.ingredients'
      :key='index'
    >

      <!-- todo: Populate list with ingredients, with qty, measurment and name -->
      <!-- todo: Add button with functionality to add ingredient to shopping list -->

    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'ListIngredients',

  props: {
    ingredients: Array
  }
}
</script>
