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
            v-b-toggle.collapse-1
            variant='outline-light'
          >
            <b-icon-filter />
          </b-button>
          <b-button
            variant='outline-light'
            @click="search">
            <b-icon-search />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-collapse id="collapse-1">
      <b-card>
        <b-container>
          <b-row>

            <b-col>
              <b-form-group label="Allergies">
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="form.filters.allergies"
                  :options="allergyOptions"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group label="Dietary Restrictions">
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  v-model="form.filters.dietaryRestrictions"
                  :options="dietOptions"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>

          </b-row>
        </b-container>
      </b-card>
    </b-collapse>

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
