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
  <b-row>
    <b-col v-for='recipe in allFoundRecipes' :key='recipe._id'>
      <recipe-card :recipe='recipe' />
    </b-col>
  </b-row>

  <b-row>
    <b-col>
      <b-button
        variant='primary'
        @click='loadMore'
        block
        class='mt-4 mb-5'
      >
        Show more results
      </b-button>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RecipeCard from '@/components/RecipeCard'
export default {
  name: 'RecipeSearch',
  components: {
    RecipeCard
  },
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
    ...mapActions(['getSearchRecipes']),
    search() {
      this.form.page = 1
      this.$store.commit('setQuery', this.form)
      this.$store.state.recipes.foundRecipes = []
      if (this.form.value) {
        this.getSearchRecipes()
      }
    },
    loadMore() {
      if (this.$store.state.recipes.query) {
        this.form.page += 1
        this.$store.commit('setQuery', this.form)
        this.getSearchRecipes()
      }
    }
  },
  computed: {
    ...mapGetters(['allFoundRecipes'])
  }
}
</script>

<style scoped>

</style>
