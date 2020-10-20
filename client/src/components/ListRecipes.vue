<template>
  <b-container class='list-recipes'>
    <b-row>
      <b-col
        v-for='recipe in this.allUserRecipes'
        :key='recipe._id'
        class='mb-3'
      >
        <recipe-card :recipe='recipe' />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RecipeCard from '@/components/RecipeCard'

export default {
  name: 'ListRecipes',
  components: { RecipeCard },
  props: {
    user: {},
    recipes: []
  },

  computed: { ...mapGetters(['allUserRecipes']) },

  methods: { ...mapActions(['getUserRecipes']) },

  created() {
    this.getUserRecipes(this.user._id)
  }
}
</script>
