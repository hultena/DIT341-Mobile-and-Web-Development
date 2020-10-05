<template>
  <div>
  <b-form-group>
    <b-input-group class='mb-3'>

      <b-form-input
        v-model="form.value"
        type='text'
        placeholder='Type something you want to search for here'
        @keyup.enter="search"
      />

      <b-input-group-append>
        <b-button
          variant='outline-primary'
          @click="search">
          <b-icon-search />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RecipeSearch',
  data() {
    return {
      form: {
        value: null,
        filter: 'name',
        page: 1,
        limit: 5
      },
      filterText: 'Search by'
    }
  },
  methods: {
    ...mapActions(['getRecipes']),
    search() {
      this.$store.commit('setQuery', this.form)
      this.$store.state.recipes.recipes = []
      this.getRecipes()
    }
  }
}
</script>

<style scoped>

</style>
