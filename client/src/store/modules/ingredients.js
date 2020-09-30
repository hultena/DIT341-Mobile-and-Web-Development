import { Api } from '@/Api'

const state = {
  // put the state here
  ingredients: [],
  userIngredients: [],
  selectedIngredient: {}
}

const getters = {
  // put state getters here
  allIngredients: function (state) {
    return state.ingredients
  },
  allUserIngredients: function (state) {
    return state.userIngredients
  },
  oneIngredient: function (state) {
    return state.selectedIngredient
  }
}

const mutations = {
  // put methods that mutate the state here
  setIngredients: function (state, ingredients) {
    state.ingredients = ingredients
  },
  setUserIngredients: function (state, ingredients) {
    state.userIngredients = ingredients
  },
  setSelectedIngredient: function (state, ingredient) {
    state.selectedIngredient = ingredient
  },
  newIngredient: function (state, ingredient) {
    state.ingredients.push(ingredient)
    state.userIngredients.push(ingredient)
  },
  updatedIngredient: function (state, updatedIngredient) {
    const idx = indexFinder(updatedIngredient._id)
    state.ingredients.splice(idx[0], 1, updatedIngredient)
    state.userIngredients.splice(idx[1], 1, updatedIngredient)
  },
  deletedIngredient: function (state, id) {
    const idx = indexFinder(id)
    state.ingredients.splice(idx[0], 1)
    state.userIngredients.splice(idx[1], 1)
  }
}

const actions = {
  // put method callers here
  async getIngredients({ commit }) {
    try {
      const res = await Api.get('/ingredients')
      commit('setIngredients', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async getUserIngredients({ commit }, id) {
    try {
      const res = await Api.get(`/users/${id}/ingredients/`)
      commit('setUserIngredients', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async postIngredient({ commit }, ingredient) {
    try {
      const res = await Api.post(`/users/${ingredient.user}/ingredients/`, ingredient)
      commit('newIngredient', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async patchIngredient({ commit }, ingredient) {
    try {
      const res = await Api.patch(`/users/${ingredient.user}/ingredients/`, ingredient)
      commit('updatedIngredient', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async deleteIngredient({ commit }, ingredient) {
    try {
      await Api.delete(`/users/${ingredient.user}/ingredients/${ingredient._id}`)
      commit('deletedIngredient', ingredient._id)
    } catch (err) {
      return err.response.data
    }
  },
  selectIngredient({ commit }, ingredient) {
    commit('setSelectedIngredient', ingredient)
  },
  clearSelectedIngredient({ commit }) {
    commit('setSelectedIngredient', null)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
function indexFinder(id) {
  const idx = state.ingredients.findIndex(function (ingredient) {
    return ingredient._id === id
  })
  const idx2 = state.userIngredients.findIndex(function (ingredient) {
    return ingredient._id === id
  })
  return [idx, idx2]
}
