<template>
  <b-form-group>
    <b-input-group class='mb-3'>

      <b-form-input
        type='text'
        placeholder='Type something you want to search for here'
      />

      <b-input-group-append>

        <b-button
          v-b-toggle.collapse-1
          variant='outline-secondary'
        >
          <b-icon-filter />
        </b-button>

        <b-button variant='outline-primary'>
          <b-icon-search />
        </b-button>

      </b-input-group-append>
    </b-input-group>

    <b-collapse id="collapse-1">
      <p>
        Filter options go here.
      </p>
      <!-- TODO: Add filter options -->
    </b-collapse>

    <div>
      <RecipeCard
        :image-src='cardImage'
        :title='cardTitle'
        :likes='cardLikes'
        :description='cardDescription'
      />
    </div>

  </b-form-group>
</template>

<script>
// import { MapActions } from 'vuex'
import RecipeCard from './RecipeCard'

export default {
  name: 'RecipeSearch',

  components: { RecipeCard },

  data() {
    return {
      cardImage: 'https://images.unsplash.com/photo-1566217224819-e093a5a0798e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
      cardTitle: 'Recipe name',
      cardLikes: 34,
      cardDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  },

  methods: {
  }
}
</script>

<style scoped>

</style>
