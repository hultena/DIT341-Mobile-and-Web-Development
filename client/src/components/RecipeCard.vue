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
        <b-icon-heart /> {{ recipe.likes }}, created by {{ recipe.user.username }}
      </b-card-sub-title>

      <p>
        {{ recipe.description | snippet }}
      </p>

    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RecipeCard',
  props: {
    recipe: null
  },

  methods: {
    ...mapActions(['selectRecipe']),
    handleClick() {
      this.selectRecipe(this.recipe)
      this.$router.push('recipe')
    }
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
