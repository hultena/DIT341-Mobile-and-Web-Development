<template>
  <b-form-group>
    <b-input-group>

      <b-form-input
        type='text'
        placeholder='Recipe search words go here ...'
      />

      <b-input-group-append>

        <b-button
          v-b-toggle.collapse-1
          variant='outline-secondary'
        >
          <b-icon-filter />
        </b-button>

        <b-button
          variant='outline-primary'
        >
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

  </b-form-group>
</template>

<script>
export default {
  name: 'RecipeSearch'
}
</script>

<style scoped>

</style>
