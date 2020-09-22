import { Api } from '@/Api'

const state = {
  // put the state here
  ingredients: []
}

const getters = {
  // put state getters here
  allIngredients: function (state) {
    return state.ingredients
  }
}

const mutations = {
  // put methods that mutate the state here
  setIngredients: function (state, ingredients) {
    state.ingredients = ingredients
  },
  newIngredient: function (state, ingredient) {
    state.ingredients.push(ingredient)
  },
  updatedIngredient: function (state, ingredient) {
    // TODO: Make this work
  }
}

const actions = {
  // put method callers here
  async getIngredients({ commit }) {
    const res = await Api.get('/ingredients')
    commit('setIngredients', res.data)
  },
  // TODO: this should probably be fixed to post to the /users/:userId/ingredients
  async postIngredient({ commit }, ingredient) {
    const res = await Api.post('/ingredients', ingredient)
    commit('newIngredient', res.data)
  },
  // TODO: this should probably be fixed to post to the /users/:userId/ingredients
  async patchIngredient({ commit }, ingredient) {
    const res = await Api.patch(`/ingredients/${ingredient._id}`, ingredient)
    commit('updatedIngredient', res.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
