import { Api } from '@/Api'

const state = {
  // put the state here
  users: [],
  view: '',
  loggedIn: null
}

const getters = {
  // put state getters here
  allUsers: function (state) {
    return state.users
  },
  loggedInUser: function (state) {
    return state.loggedIn
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
      const res = await Api.patch(`/users/${user._id}`, user)
      commit('setLoggedIn', res.data)
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
  async authUser({ commit }, user) {
    try {
      const res = await Api.post('/users/auth', user)
      commit('setLoggedIn', res.data)
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
