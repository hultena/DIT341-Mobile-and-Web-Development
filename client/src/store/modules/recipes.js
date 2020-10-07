import { Api } from '@/Api'

const state = {
  // put the state here
  recipes: [],
  userRecipes: [],
  userFavourites: [],
  query: {},
  selectedRecipe: null
}

const getters = {
  // put state getters here
  allRecipes: function (state) {
    return state.recipes
  },

  oneRecipe: function (state) {
    return state.selectedRecipe
  },

  allUserRecipes: function (state) {
    return state.userRecipes
  },
  selectedQuery: function (state) {
    return state.query
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
  setQuery: function (state, query) {
    state.query = query
  },

  newRecipe: function (state, recipe) {
    state.recipes.push(recipe)
  },

  newFavouriteRecipe: function (state, recipe) {
    state.userFavourites.push(recipe)
  },

  updatedRecipe: function (state, updatedRecipe) {
    state.recipes.splice(indexFinder(updatedRecipe._id, state.recipes), 1, updatedRecipe)
    state.userRecipes.splice(indexFinder(updatedRecipe._id, state.userRecipes), 1, updatedRecipe)
  },

  deleteFavouriteRecipe: function (state, recipe) {
    const idx = indexFinder(recipe._id, state.userFavourites)
    state.userFavourites.splice(idx, 1)
  },

  deletedRecipe: function (state, id) {
    const idx = indexFinder(id, state.recipes)
    const idx2 = indexFinder(id, state.userRecipes)
    state.recipes.splice(idx, 1)
    state.userRecipes.splice(idx2, 1)
  }
}

const actions = {
  // GETTERS

  async getRecipes({ commit }) {
    try {
      const query = queryStringBuilder()
      const res = await Api.get('/recipes', { params: query })
      commit('setRecipes', res.data)
    } catch (error) {
      return error.response.data
    }
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
      commit('setSelectedRecipe', res.data)
      commit('newRecipe', res.data)
    } catch (error) { return error.response.data }
  },

  // CHANGES

  async likeRecipe({ commit, rootState }, recipe) {
    try {
      if (indexFinder(recipe._id, state.userFavourites) >= 0) {
        recipe.likes -= 1
        commit('deleteFavouriteRecipe', recipe)
      } else {
        recipe.likes += 1
        commit('newFavouriteRecipe', recipe)
      }
      const likes = { likes: recipe.likes }
      const favourites = favouritesCreator()
      await Api.patch(`/users/${rootState.users.loggedIn._id}`, favourites)
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
      await Api.put(`/users/${recipe.user}/recipes/${recipe._id}`, recipe)
      commit('updatedRecipe', recipe)
    } catch (error) { return error.response.data }
  },

  // DELETIONS

  async deleteRecipe({ commit }, recipe) {
    try {
      await Api.delete(`/users/${recipe.user}/recipes/${recipe._id}`)
      commit('deletedRecipe', recipe._id)
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

function indexFinder(id, array) {
  return array.findIndex(function (recipe) {
    return recipe._id === id
  })
}
// function to create query string parameters
function queryStringBuilder() {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(state.query)) {
    if (value) {
      if (typeof value === 'object') {
        for (const [key2, value2] of Object.entries(value)) {
          if (Array.isArray(value2) && value2.length > 0) {
            params.append(`${key}`, `${key2}=${value2}`)
          } else if (!Array.isArray(value2) && value2) {
            params.append(`${key}`, `${key2}=${value2}`)
          }
        }
      } else {
        params.append(key, value)
      }
    }
  }
  return params
}

function favouritesCreator() {
  const value = []
  for (const favourite of state.userFavourites) {
    value.push({ _id: favourite._id })
  }
  return { favourites: value }
}
