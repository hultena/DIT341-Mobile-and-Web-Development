<template>
  <b-form-group>
    <b-input-group>

      <b-form-input
        type='text'
      />

      <b-input-group-append>
        <b-button>
          Filter
        </b-button>
        <b-button
          variant='primary'
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
