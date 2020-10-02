<template>
  <b-card
    :title='recipe.name'
    :img-src='recipe.image'
    img-top
    role='button'
    @click='handleClick'
  >
    <b-card-text>

      <b-card-sub-title class='mb-3'>
        <b-icon-heart /> {{ recipe.likes }}, created by {{ recipe.username }}
      </b-card-sub-title>

      <p>
        {{ recipe.description | snippet }}
      </p>

    </b-card-text>
  </b-card>
</template>

<script>

export default {
  name: 'RecipeCard',

  props: {
    recipe: null
  },

  methods: {
    handleClick() {
      // TODO: have 'path' equal recipeLink in props. I get errors. Idk how (?)

      // const path = 'recipeLink'
      // this.$router.push(path)

      console.log('This card has been clicked!')
    }
    // TODO: Method to have user id find username and display username instead of user id.
  }
}
</script>

<style scoped>
img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
