<template>
  <b-container class='profile-page'>

    <b-row class='profile-header'>
      <b-col class='avatar'>
        <b-img
          :src='this.loggedInUser.image'
          alt='User avatar'
          rounded='circle'
        />
      </b-col>
      <b-col>
        <h1>
          Welcome {{this.loggedInUser.username}}
        </h1>

        <h2>
          {{this.loggedInUser.email}}
        </h2>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <b-button
          v-if="this.currentView==='ingredients'&&!addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)"
          block
          variant='primary'
        >
          <b-icon-plus-circle />
          Add Ingredient
        </b-button>
        <b-button
          v-if="this.currentView==='ingredients'&&addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)"
          block
        >
          Finish
        </b-button>
        <b-button
          v-if="this.currentView==='shopping'"
          @click="addShoppingList"
          block
          variant="primary"
        >
          <b-icon-plus-circle />
          Add Shopping List
        </b-button>
      </b-col>
    </b-row>

    <section>
      <add-ingredient-form v-if="this.currentView==='ingredients'&&addIngredientState"/>
    </section>

    <section>

      <my-recipes v-if='this.currentView==="recipes"' />
      <my-ingredients v-if="this.currentView==='ingredients'"/>
      <my-shopping-lists v-if="this.currentView==='shopping'"/>
      <my-settings v-if="this.currentView==='settings'"/>
      <my-favourites v-if="this.currentView==='favourites'"/>

    </section>

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MyRecipes from '@/views/MyRecipes'
import MyIngredients from '@/views/MyIngredients'
import MyShoppingLists from '@/views/MyShoppingLists'
import AddIngredientForm from '@/forms/AddIngredientForm'
import MySettings from '@/views/MySettings'
import MyFavourites from '@/views/MyFavourites'

export default {
  name: 'myProfile',
  components: {
    MyFavourites,
    MyRecipes,
    MySettings,
    AddIngredientForm,
    MyShoppingLists,
    MyIngredients
  },
  data() {
    return {
      addIngredientState: null,
      user: null
    }
  },

  methods: {
    ...mapActions(['getShoppingLists', 'getUserIngredients', 'changeView', 'postShoppingList']),
    changeState(state) {
      return !state
    },
    addShoppingList() {
      const shoppingList = {
        user: this.user,
        ingredients: []
      }
      this.postShoppingList(shoppingList)
    }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'allShoppingLists', 'allUserIngredients', 'currentView'])
  },

  async created() {
    this.user = this.loggedInUser._id
    await this.getShoppingLists(this.user)
    await this.getUserIngredients(this.user)
  }
}

</script>

<style scoped>
.profile-page {
  padding-top: 100px;
  padding-bottom: 100px;
}

.avatar {
  max-width: 240px !important;
}

.avatar > img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
}

@media only screen and (max-width: 417px) {
  .profile-header {
    text-align: center;
    justify-content: center;
  }
  div.avatar { padding-bottom: 30px }
}
</style>
