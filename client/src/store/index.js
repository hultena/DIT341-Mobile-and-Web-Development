import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import recipes from './modules/recipes'
import ingredients from './modules/ingredients'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    users,
    recipes,
    ingredients
  }
})
