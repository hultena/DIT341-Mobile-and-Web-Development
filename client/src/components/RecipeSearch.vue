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
        <b-dropdown
          split
          split-variant="outline-secondary"
          variant="outline-secondary"
          :text="filterText"
        >
          <b-dropdown-item
            @click="form.filter='name';
            filterText='Name'">
            Name
          </b-dropdown-item>
          <b-dropdown-item
            @click="form.filter='dietaryRestriction';
            filterText='Diet'">
            Diet
          </b-dropdown-item>
          <b-dropdown-item
            @click="form.filter='allergies';
            filterText='Allergy'">
            Allergy
          </b-dropdown-item>
        </b-dropdown>

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
      filterText: 'Filter'
    }
  },
  methods: {
    ...mapActions(['getRecipes']),
    search() {
      this.form.page = 1
      this.$store.commit('setQuery', this.form)
      this.$store.state.recipes.recipes = []
      this.getRecipes()
    }
  }
}
</script>

<style scoped>

</style>
