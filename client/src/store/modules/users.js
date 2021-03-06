import { Api } from '@/Api'

const state = {
  // put the state here
  users: [],
  view: 'recipes',
  loggedIn: null,
  selected: null
}

const getters = {
  // put state getters here
  allUsers: function (state) {
    return state.users
  },
  loggedInUser: function (state) {
    return state.loggedIn
  },
  selectedUser: function (state) {
    return state.selected
  },
  currentView: function (state) {
    return state.view
  }
}

const mutations = {
  // put methods that mutate the state here
  setUsers: function (state, users) {
    state.users = users
  },

  newUser: function (state, user) {
    state.users.push(user)
  },

  deletedUser: function (state, id) {
    const idx = state.users.findIndex(function (user) {
      return user._id === id
    })
    state.users.splice(idx, 1)
  },

  setLoggedIn: function (state, user) {
    state.loggedIn = user
  },

  setSelectedUser: function (state, user) {
    state.selected = user
  },

  setView: function (state, view) {
    state.view = view
  }
}

const actions = {
  // put method callers here
  async getUsers({ commit }) {
    try {
      const res = await Api.get('/users')
      commit('setUsers', res.data)
    } catch (err) {
      return err.response.data
    }
  },

  async getUser({ commit }, id) {
    try {
      const res = await Api.get(`/users/${id}`)
      commit('setSelectedUser', res.data)
    } catch (error) {
      return error.response.data
    }
  },

  async postUser({ commit }, user) {
    try {
      const res = await Api.post('/users', user)
      commit('newUser', res.data)
    } catch (err) {
      return err.response.data
    }
  },

  async patchUser({ commit }, user) {
    try {
      await Api.patch(`/users/${user._id}`, user)
      commit('setLoggedIn', user)
    } catch (err) {
      return err.response.data
    }
  },

  async deleteUser({ commit }, id) {
    try {
      await Api.delete(`/users/${id}`)
      commit('deletedUser', id)
    } catch (err) {
      return err.response.data
    }
  },

  async authUser({ commit, rootState }, user) {
    try {
      const res = await Api.post('/users/auth', user)
      commit('setLoggedIn', res.data)
      // this is ugly but no idea how to do it better
      rootState.recipes.userFavourites = res.data.favourites
    } catch (err) {
      return err.response.data
    }
  },

  async deauthUser({ commit }, user) {
    try {
      const res = await Api.post('/users/deauth', user)
      commit('setLoggedIn', res.data)
    } catch (err) {
      return err.response.data
    }
  },

  async deleteAllUsers({ commit }) {
    try {
      await Api.delete('/users')
      commit('setUsers', [])
    } catch (err) {
      return err.response.data
    }
  },

  async changeView({ commit }, view) {
    commit('setView', view)
  },

  selectUser({ commit }, user) {
    commit('setSelectedUser', user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
