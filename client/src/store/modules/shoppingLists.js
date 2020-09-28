import { Api } from '@/Api'

const state = {
  // put the state here
  shoppingLists: [],
  selectedShoppingList: {}
}

const getters = {
  // put state getters here
  allShoppingLists: function (state) {
    return state.shoppingLists
  },
  oneShoppingList: function (state) {
    return state.selectedShoppingList
  }
}

const mutations = {
  // put methods that mutate the state here
  setShoppingLists: function (state, shoppingLists) {
    state.shoppingLists = shoppingLists
  },
  newShoppingList: function (state, shoppingLists) {
    state.shoppingLists.push(shoppingLists)
  },
  deletedShoppingList: function (state, id) {
    const idx = state.shoppingLists.findIndex(function (shoppingList) {
      return shoppingList._id === id
    })
    state.shoppingLists.splice(idx, 1)
  },
  updateShoppingList: function (state, updatedShoppingList) {
    const idx = state.shoppingLists.findIndex(function (shoppingList) {
      return shoppingList._id === updatedShoppingList._id
    })
    state.shoppingLists.splice(idx, 1, updatedShoppingList)
  },
  setSelectedShoppingList: function (state, shoppingList) {
    state.selectedShoppingList = shoppingList
  }
}

const actions = {
  // put method callers here
  async getShoppingLists({ commit }, id) {
    const res = await Api.get(`/users/${id}/shoppinglists/`)
    commit('setShoppingLists', res.data)
  },
  async postShoppingList({ commit }, shoppingList) {
    try {
      console.log(shoppingList)
      const res = await Api.post(`/users/${shoppingList.user}/shoppinglists/`, shoppingList)
      commit('newShoppingList', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async patchShoppingList({ commit }, shoppingList) {
    const res = await Api.patch(`/users/${shoppingList.user}/shoppinglists/${shoppingList._id}`, shoppingList)
    commit('setLoggedIn', res.data)
  },
  async deleteShoppingList({ commit }, shoppingList) {
    await Api.delete(`/users/${shoppingList.user}/shoppinglists/${shoppingList._id}`)
    commit('deletedShoppingList', shoppingList._id)
  },
  selectShoppingList: function ({ commit }, shoppingList) {
    commit('setSelectedShoppingList', shoppingList)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
