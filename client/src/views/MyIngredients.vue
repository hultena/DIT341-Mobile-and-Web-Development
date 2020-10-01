<template>
  <div>
    <ingredient-card v-for="ingredient in allUserIngredients" :key="ingredient._id" :ingredient="ingredient"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IngredientCard from '@/components/IngredientCard'
export default {
  name: 'MyIngredients',
  components: {
    IngredientCard
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    ...mapActions(['getUserIngredients'])
  },
  computed: {
    ...mapGetters(['allUserIngredients', 'loggedInUser'])
  },
  created() {
    const userId = this.loggedInUser._id
    this.getUserIngredients(userId)
  }
}
</script>

<style scoped>

</style>
