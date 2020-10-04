import { Api } from '@/Api'

const state = {
  // put the state here
  recipes: [],
  foundRecipes: [],
  userRecipes: [],
  query: {},
  selectedRecipe: null
}

const getters = {
  // put state getters here
  allRecipes: function (state) {
    return state.recipes
  },

  selectedRecipe: function (state) {
    return state.selectedRecipe
  },

  allUserRecipes: function (state) {
    return state.userRecipes
  },
  allFoundRecipes: function (state) {
    return state.foundRecipes
  }
}

const mutations = {
  // put methods that mutate the state here

  setUserRecipes: function (state, recipes) {
    state.userRecipes = recipes
  },

  setRecipes: function (state, recipes) {
    state.recipes = state.recipes.concat(recipes)
  },

  setSelectedRecipe: function (state, recipe) {
    state.selectedRecipe = recipe
  },
  setFoundRecipes: function (state, recipes) {
    state.foundRecipes = state.foundRecipes.concat(recipes)
  },
  setQuery: function (state, query) {
    state.query = query
  },

  newRecipe: function (state, recipe) {
    state.recipes.push(recipe)
  },

  updatedRecipe: function (state, updatedRecipe) {
    state.recipes.splice(indexFinder(this.updatedRecipe._id), 1, updatedRecipe)
  }
}

const actions = {
  // GETTERS

  async getRecipes({ commit }, click) {
    try {
      // TODO: maybe change this fixed limit of 5
      const res = await Api.get('/recipes', { params: { page: click, limit: 5 } })
      commit('setRecipes', res.data)
    } catch (error) { return error.response.data }
  },
  async getSearchRecipes({ commit }) {
    try {
      // TODO: maybe change this fixed limit of 5
      const res = await Api.get('/recipes', {
        params: state.query
      })
      commit('setFoundRecipes', res.data)
    } catch (error) { return error.response.data }
  },

  async getUserRecipes({ commit }, id) {
    try {
      const res = await Api.get(`/users/${id}/recipes/`)
      commit('setUserRecipes', res.data)
    } catch (error) { return error.response.data }
  },

  // CREATIONS

  async postRecipe({ commit }, recipe) {
    try {
      const res = await Api.post(`/users/${recipe.user}/recipes`, recipe)
      commit('newRecipe', res.data)
    } catch (error) { return error.response.data }
  },

  // CHANGES

  async likeRecipe({ commit }, recipe) {
    try {
      const likes = { likes: recipe.likes + 1 }
      recipe.likes += 1
      await Api.patch(`/recipes/${recipe._id}`, likes)
      commit('updatedRecipe', recipe)
    } catch (error) { return error.response.data }
  },

  async patchRecipe({ commit }, recipe) {
    try {
      await Api.patch(`/users/${recipe.user}/recipes/${recipe._id}`, recipe)
      commit('updatedRecipe', recipe)
    } catch (error) { return error.response.data }
  },

  async putRecipe({ commit }, recipe) {
    try {
      await Api.put(`/users/${recipe.user}/recipes/${recipe._id}`, state.selectedRecipe)
      commit('updatedRecipe', recipe)
    } catch (error) { return error.response.data }
  },

  // SELECTIONS

  selectRecipe({ commit }, recipe) {
    commit('setSelectedRecipe', recipe)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

function indexFinder(id) {
  return state.recipes.findIndex(function (recipe) {
    return recipe._id === id
  })
}
