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
            v-b-toggle.collapse-2
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
    <b-collapse id="collapse-2">
      <b-card>
        <b-container>
          <b-row>

            <b-col>
              Sort by
              <b-form-group>
                <b-form-select
                v-model="form.sort"
                :options="sortingOptions"
                />
              </b-form-group>
            </b-col>

            <b-col>
              Order
              <b-form-group>
                <b-icon-caret-down-square
                  class="order-button"
                  v-if="form.order === 'desc'"
                  @click="form.order='asc'"/>
                <b-icon-caret-up-square
                  class="order-button"
                  v-else
                  @click="form.order='desc'"/>
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
        limit: 5,
        order: 'asc',
        sort: 'createdOn'
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
      ],
      sortingOptions: [
        { text: 'Date', value: 'createdOn' },
        { text: 'Likes', value: 'likes' },
        { text: 'Name', value: 'name' }
      ]
    }
  },
  methods: {
    ...mapActions(['getRecipes']),
    search() {
      // weird that this has to be manually set to 1 when resending a new query
      this.form.page = 1
      this.$store.commit('setQuery', this.form)
      this.$store.state.recipes.recipes = []
      this.getRecipes()
    }
  }
}
</script>
<style scoped>
.order-button {
  height: 2em;
  width: 2em;
}
.order-button:hover {
  fill: rgba(0,0,0,.6)
}

</style>
