<template>
  <div class='recipe-page'>
    <div class='hero'>
      <b-img
        :src='image'
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
              Created on: {{ date }}
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
              Created on: {{ date }}
            </b-list-group-item>

            <b-list-group-item>
              <b-icon-heart-fill
                variant="danger"
                @click="like"
                v-if="loggedInUser && liked()"
              />
              <b-icon-heart
                v-else
                @click="like"
              />
              {{ recipe.likes }}
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
          <b-button
            v-if="loggedInUser"
            @click="addToShoppingList()"
            variant="outline-primary">
            <b-icon-cart4/>
            Add To Shopping List
          </b-button>
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
import defaultFood from '@/assets/default-food.jpg'
export default {
  name: 'RecipePage',
  components: { AdSpace, ListIngredients, ListInstructions },

  methods: {
    ...mapActions(['likeRecipe', 'selectUser', 'postShoppingList']),

    like() { this.likeRecipe(this.recipe) },

    visitProfile() {
      this.$router.push('/profile')
    },

    editRecipe() {
      this.$router.push('/my-recipe')
    },
    addToShoppingList() {
      const shoppingList = {
        user: this.loggedInUser._id,
        ingredients: [],
        ingredientQuantities: this.recipe.ingredientQuantities
      }
      for (const ingredient of this.recipe.ingredients) {
        shoppingList.ingredients.push(ingredient._id)
      }
      this.postShoppingList(shoppingList)
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
    ...mapGetters(['oneRecipe', 'loggedInUser'])
  },

  data() {
    return {
      author: null,
      recipe: null,
      date: null,
      image: null
    }
  },

  created() {
    this.recipe = this.oneRecipe
    this.author = this.recipe.user
    if (this.recipe.createdOn) {
      this.date = this.recipe.createdOn.slice(0, 10)
    }
    this.selectUser(this.author)
    if (this.recipe.image) {
      this.image = this.recipe.image
    } else {
      this.image = defaultFood
    }
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
