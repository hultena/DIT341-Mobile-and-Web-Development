<template>
<div>
  <b-input-group-text>
    <b-form-input v-model="text" @keyup.delete="backspacePress"/>
  </b-input-group-text>
  <b-list-group>
    <b-list-group-item v-for="ingredient in found" :key="ingredient._id" @click="setIngredient(ingredient)">
      {{ ingredient.name }}
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// constant for minimum search string to autocomplete
const MIN_TEXT_LENGTH = 2
export default {
  name: 'IngredientSearchBar',
  data() {
    return {
      text: '',
      found: []
    }
  },
  methods: {
    ...mapActions(['getIngredients', 'selectIngredient']),
    filterArr(word) {
      return this.allIngredients.filter(function (ingredient) {
        return ingredient.name.toLowerCase().includes(word.toLowerCase())
      })
    },
    setIngredient(ingredient) {
      this.selectIngredient(ingredient)
    },
    backspacePress() {
      if (this.text.length <= MIN_TEXT_LENGTH) {
        this.found = null
      }
    }
  },
  computed: {
    ...mapGetters(['allIngredients', 'oneIngredient'])
  },
  created() {
    this.getIngredients()
  },
  watch: {
    text: function () {
      if (this.text.length >= MIN_TEXT_LENGTH) {
        this.found = this.filterArr(this.text)
      }
    }
  }
}
</script>

<style scoped>

</style>
