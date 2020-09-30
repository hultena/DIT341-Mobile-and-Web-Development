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
  updateShoppingList: function (state, updatedShoppingList) {
    state.shoppingLists.splice(indexFinder(updatedShoppingList._id), 1, updatedShoppingList)
  },
  deletedShoppingList: function (state, id) {
    state.shoppingLists.splice(indexFinder(id), 1)
  },
  setSelectedShoppingList: function (state, shoppingList) {
    state.selectedShoppingList = shoppingList
  }
}

const actions = {
  // put method callers here
  async getShoppingLists({ commit }, id) {
    try {
      const res = await Api.get(`/users/${id}/shoppinglists/`)
      commit('setShoppingLists', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async postShoppingList({ commit }, shoppingList) {
    try {
      const res = await Api.post(`/users/${shoppingList.user}/shoppinglists/`, shoppingList)
      commit('newShoppingList', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async patchShoppingList({ commit }, shoppingList) {
    try {
      console.log(shoppingList)
      // TODO: try to figure out why it doesn't work when I use the passed in object but it works when I use the state
      const res = await Api.patch(`/users/${shoppingList.user}/shoppinglists/${shoppingList._id}`, state.selectedShoppingList)
      commit('updateShoppingList', res.data)
    } catch (err) {
      return err.response.data
    }
  },
  async deleteShoppingList({ commit }, shoppingList) {
    try {
      await Api.delete(`/users/${shoppingList.user}/shoppinglists/${shoppingList._id}`)
      commit('deletedShoppingList', shoppingList._id)
    } catch (err) {
      return err.response.data
    }
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
function indexFinder(id) {
  return state.shoppingLists.findIndex(function (shoppingList) {
    return shoppingList._id === id
  })
}
