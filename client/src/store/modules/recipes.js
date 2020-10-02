import { Api } from '@/Api'

const state = {
  // put the state here
  recipes: [],
  userRecipes: [],
  oneRecipe: null
}

const getters = {
  // put state getters here
  allRecipes: function (state) {
    return state.recipes
  },

  allUserRecipes: function (state) {
    return state.userRecipes
  },

  oneRecipe: function (state) {
    return state.oneRecipe
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

  setOneRecipe: function (state, recipe) {
    state.oneRecipe = recipe
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
  async getRecipes({ commit }, click) {
    const res = await Api.get('/recipes', { params: { page: click, limit: 5 } })
    commit('setRecipes', res.data)
  },

  async getUserRecipes({ commit }, id) {
    try {
      const res = await Api.get(`/users/${id}/recipes/`)
      commit('setUserRecipes', res.data)
    } catch (error) {
      return error.response.data
    }
  },

  async postRecipe({ commit }, recipe) {
    try {
      const res = await Api.post(`/users/${recipe.user}/recipes`, recipe)
      commit('newRecipe', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async likeRecipe({ commit }, recipe) {
    try {
      const likes = { likes: recipe.likes + 1 }
      recipe.likes += 1
      await Api.patch(`/recipes/${recipe._id}`, likes)
      commit('updatedRecipe', recipe)
    } catch (err) {
      return err.response.data
    }
  },

  async patchRecipe({ commit }, recipe) {
    try {
      await Api.patch(`/users/${recipe.user}/recipes/${recipe._id}`, recipe)
      commit('updatedRecipe', recipe)
    } catch (err) {
      return err.response.data
    }
  },
  selectRecipe({ commit }, recipe) {
    commit('setOneRecipe', recipe)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
