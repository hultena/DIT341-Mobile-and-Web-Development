<template>
  <div>
    <b-row>
      <b-col
        v-for='ingredient in allUserIngredients'
        :key='ingredient._id'
      >
        <ingredient-card
          :ingredient='ingredient'
          class='my-3'
        />
      </b-col>
    </b-row>
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
  }
}
</script>

<style scoped>

</style>
