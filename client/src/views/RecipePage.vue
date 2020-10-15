<template>
  <div class='recipe-page'>
    <div class='hero'>
      <b-img
        :src='this.recipe.image'
        alt='Responsive image'
      />
    </div>
    <b-container>
      <b-row class='mt-5'>
        <b-col>

          <h1>
            {{ recipe.name }}
          </h1>

          <b-list-group
            v-if='!loggedInUser'
            horizontal='md'
          >

            <b-list-group-item>
              Author:
              <b-link
                role='button'
                @click='visitProfile'
              >
                {{ author.username }}
              </b-link>
            </b-list-group-item>

            <b-list-group-item>
              Created on: {{ recipe.createdOn }}
            </b-list-group-item>

            <b-list-group-item>
              <b-icon-heart /> {{ recipe.likes }}
            </b-list-group-item>

          </b-list-group>

          <b-list-group
            v-else
            horizontal='md'
          >

            <b-list-group-item v-if='this.author._id !== this.loggedInUser._id'>
              Author:
              <b-link
                role='button'
                @click='visitProfile'
              >
                {{ author.username }}
              </b-link>
            </b-list-group-item>

            <b-list-group-item v-else>
              <b-link
                role='button'
                @click='editRecipe'
              >
                <b-icon-pencil />
                Edit your recipe
              </b-link>
            </b-list-group-item>

            <b-list-group-item>
              Created on: {{ recipe.createdOn }}
            </b-list-group-item>

            <b-list-group-item>
              <b-icon-heart @click="like" /> {{ recipe.likes }}
            </b-list-group-item>

          </b-list-group>

        </b-col>
      </b-row>
      <b-row class='mt-5'>
        <b-col>
          <h2>
            Recipe description
          </h2>
          <p>
            {{ recipe.description }}
          </p>
        </b-col>
      </b-row>
      <b-row class='mt-5'>
        <b-col>

          <h2>
            Ingredients
          </h2>

          <list-ingredients/>

        </b-col>
        <b-col>
          <ad-space />
        </b-col>
      </b-row>
      <b-row class='my-5'>
        <b-col class='mb-5'>
          <h2>
            Instructions
          </h2>

          <list-instructions />

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ListIngredients from '@/components/ListIngredients'
import ListInstructions from '@/components/ListInstructions'
import { mapGetters, mapActions } from 'vuex'
import AdSpace from '@/components/AdSpace'

export default {
  name: 'RecipePage',
  components: { AdSpace, ListIngredients, ListInstructions },

  methods: {
    ...mapActions(['likeRecipe', 'selectUser']),

    like() { this.likeRecipe(this.recipe) },

    visitProfile() {
      this.$router.push('/profile')
    },

    editRecipe() {
      this.$router.push('/my-recipe')
    }
  },

  computed: {
    ...mapGetters(['oneRecipe', 'loggedInUser'])
  },

  data() {
    return {
      author: null,
      recipe: null
    }
  },

  created() {
    this.recipe = this.oneRecipe
    this.author = this.recipe.user
    this.selectUser(this.author)
  }
}
</script>

<style scoped>
.recipe-page .hero img {
  height: 50vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}
</style>
