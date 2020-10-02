import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import recipes from './modules/recipes'
import ingredients from './modules/ingredients'
import shoppingLists from './modules/shoppingLists'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    users,
    recipes,
    ingredients,
    shoppingLists
  }
})
