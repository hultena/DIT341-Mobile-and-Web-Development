<template>
  <div>
    <b-form-group>
      <b-input-group class='mb-3'>
        <b-form-input
          v-model="form.filters.name"
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
    <b-form-group label="Allergies">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="form.filters.allergies"
        :options="allergyOptions"
      ></b-form-checkbox-group>
    </b-form-group>
    <b-form-group label="Dietary Restrictions">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="form.filters.dietaryRestrictions"
        :options="dietOptions"
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AdvancedSearch',
  data() {
    return {
      form: {
        filters: {
          name: null,
          allergies: [],
          dietaryRestrictions: []
        },
        page: 1,
        limit: 5
      },
      filterText: 'Search by',
      allergyOptions: [
        { text: 'Gluten', value: 'Gluten' },
        { text: 'Peanuts', value: 'Peanuts' },
        { text: 'Nuts', value: 'Nuts' },
        { text: 'Lactose', value: 'Lactose' },
        { text: 'Egg', value: 'Egg' },
        { text: 'Wheat', value: 'Wheat' },
        { text: 'Soy', value: 'Soy' },
        { text: 'Fish', value: 'Fish' },
        { text: 'Shellfish', value: 'Shellfish' }
      ],
      dietOptions: [
        { text: 'Vegan', value: 'Vegan' },
        { text: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian' },
        { text: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
        { text: 'Lacto-Ovo Vegetarian', value: 'Lacto-Ovo Vegetarian' },
        { text: 'Halaal', value: 'Halaal' },
        { text: 'Kosher', value: 'Kosher' },
        { text: 'Pescetarian', value: 'Pescetarian' }
      ]
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
