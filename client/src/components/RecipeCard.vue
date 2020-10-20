<template>
  <b-card
    :title='recipe.name'
    :img-src='image'
    img-top
    role='button'
    @click='handleClick'
    class='recipe-card'
  >
    <b-card-text>

      <b-card-sub-title class='mb-3'>
        <b-icon-heart-fill v-if="loggedInUser && liked()" variant="danger" />
        <b-icon-heart v-else/> {{ recipe.likes }}, created by {{ recipe.user.username }}
      </b-card-sub-title>

      <p>
        {{ recipe.description | snippet }}
      </p>

    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import defaultFood from '@/assets/default-food.jpg'
export default {
  name: 'RecipeCard',
  props: {
    recipe: null
  },
  data() {
    return {
      image: null
    }
  },
  methods: {
    ...mapActions(['selectRecipe']),
    handleClick() {
      this.selectRecipe(this.recipe)
      this.$router.push('recipe')
    },
    liked() {
      for (const recipe of this.loggedInUser.favourites) {
        if (this.recipe._id === recipe._id) {
          return true
        }
      }
      return false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    if (this.recipe.image) {
      this.image = this.recipe.image
    } else {
      this.image = defaultFood
    }
  }
}
</script>

<style scoped>
.recipe-card {
  transition: .5s;
}

.recipe-card:hover { opacity: .7 }

img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
