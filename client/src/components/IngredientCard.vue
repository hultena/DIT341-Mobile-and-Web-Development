<template>
  <div>
    <b-card @click="setChosenCard">
      <b-card-body>
        <b-card-title>{{ this.ingredient.name }}</b-card-title>
        <b-card-sub-title class="mb-2">{{this.ingredient.foodType}}</b-card-sub-title>
        <b-card-text>
          {{ this.ingredient.description }}
        </b-card-text>
      </b-card-body>
      <b-card-footer>
        <b-button @click="deleteCard">Delete</b-button>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IngredientCard',
  props: {
    ingredient: {}
  },
  methods: {
    ...mapActions(['selectIngredient', 'deleteIngredient']),
    setChosenCard() {
      this.selectIngredient(this.ingredient)
    },
    deleteCard() {
      this.deleteIngredient(this.ingredient)
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>

<style scoped>

</style>
