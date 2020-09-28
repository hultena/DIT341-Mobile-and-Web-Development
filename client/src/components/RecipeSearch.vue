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
      <RecipeCard />
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
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
