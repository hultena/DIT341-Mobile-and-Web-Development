import { Api } from '@/Api'

const state = {
  // put the state here
  recipes: []
}

const getters = {
  // put state getters here
  allRecipes: function (state) {
    return state.recipes
  }
}

const mutations = {
  // put methods that mutate the state here
  setRecipes: function (state, recipes) {
    state.recipes = recipes
  },
  newRecipe: function (state, recipe) {
    state.recipes.push(recipe)
  },
  updatedRecipe: function (state, recipe) {
    // TODO: add things that make this work
  }
}

const actions = {
  // put method callers here
  async getRecipes({ commit }) {
    const res = await Api.get('/recipes')
    commit('setRecipes', res.data)
  },
  // TODO: this should probably be fixed to post to the /users/:userId/recipes
  async postRecipe({ commit }, recipe) {
    const res = await Api.post(`/users/${recipe.user}/recipes`, recipe)
    commit('newRecipe', res.data)
  },
  // TODO: this should probably be fixed to patch to the /users/:userId/recipes
  async patchRecipe({ commit }, recipe) {
    const res = await Api.patch(`/recipes/${recipe._id}`, recipe)
    commit('updatedRecipe', res.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
