<template>
  <div class='profilePage'>
    <section>
      <h1>
        Welcome {{this.loggedInUser.username}}
      </h1>
      <h2>
        {{this.loggedInUser.email}}
      </h2>
      <h3>
        <b-button
          v-if="this.currentView==='ingredients'&&!addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)">
          Add Ingredients
        </b-button>
        <b-button
          v-if="this.currentView==='ingredients'&&addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)">
          Finish
        </b-button>
        <b-button
          v-if="this.currentView==='shopping'"
          @click="addShoppingList">
          Add Shopping List
        </b-button>
        <!-- Perhaps move this button to the navbar in the future? Putting it here for now -->
          <b-button
            v-if="this.currentView!=='settings'"
            @click="changeView('settings')">
            User Settings
          </b-button>
      </h3>
    </section>
    <section>
      <add-ingredient-form v-if="this.currentView==='ingredients'&&addIngredientState"/>
    </section>
    <section>
      <p v-if="this.currentView==='recipes'">Placeholder for my recipes</p>
      <my-ingredients v-if="this.currentView==='ingredients'"/>
      <my-shopping-lists v-if="this.currentView==='shopping'"/>
      <my-settings v-if="this.currentView==='settings'"/>
      <p v-if="this.currentView==='favourites'">Placeholder favourite recipes</p>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MyIngredients from '@/views/MyIngredients'
import MyShoppingLists from '@/views/MyShoppingLists'
import AddIngredientForm from '@/forms/AddIngredientForm'
import MySettings from '@/views/MySettings'
export default {
  name: 'myProfile',
  components: { MySettings, AddIngredientForm, MyShoppingLists, MyIngredients },
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
.profilePage {}
</style>
