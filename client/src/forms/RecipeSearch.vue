<template>
  <b-form-group>
    <b-input-group>

      <b-form-input
        type='text'
        placeholder='Recipe search words go here ...'
      />

      <b-input-group-append>
        <b-button
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
  </b-form-group>
</template>

<script>
export default {
  name: 'RecipeSearch'
}
</script>

<style scoped>

</style>
