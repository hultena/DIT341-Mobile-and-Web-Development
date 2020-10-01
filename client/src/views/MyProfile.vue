<template>
  <div class='profilePage'>
    <section>
      <h1>
        Welcome {{this.loggedInUser.username}}
        <router-link to="my-settings">
        <b-button>Settings</b-button>
        </router-link>
        <b-button
          v-if="currentView==='ingredients'&&!addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)">
          Add Ingredients</b-button>
        <b-button
          v-if="currentView==='ingredients'&&addIngredientState"
          @click="addIngredientState=changeState(addIngredientState)">
          Finish</b-button>
      </h1>
      <h2>
        {{this.loggedInUser.email}}
      </h2>
    </section>
    <section>
      <add-ingredient-form v-if="currentView==='ingredients'&&addIngredientState"/>
    </section>
    <section>
      <p v-if="this.currentView==='recipes'">Placeholder for my recipes</p>
      <my-ingredients v-if="this.currentView==='ingredients'"/>
      <my-shopping-lists v-if="this.currentView==='shopping'"/>
      <p v-if="this.currentView==='favourites'">Placeholder favourite recipes</p>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MyIngredients from '@/views/MyIngredients'
import MyShoppingLists from '@/views/MyShoppingLists'
import AddIngredientForm from '@/forms/AddIngredientForm'
export default {
  name: 'myProfile',
  components: { AddIngredientForm, MyShoppingLists, MyIngredients },
  data() {
    return {
      addIngredientState: null
    }
  },
  methods: {
    ...mapActions(['']),
    changeState(state) {
      return !state
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'allShoppingLists', 'allUserIngredients', 'currentView'])
  }
}

</script>

<style scoped>
.profilePage {}
</style>
