<template>
  <div>
    <b-row>
      <b-col
        v-for='ingredient in allUserIngredients'
        :key='ingredient._id'
        class="col-xl-4 col-lg-4 col-md-6 col-sm-12"
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
