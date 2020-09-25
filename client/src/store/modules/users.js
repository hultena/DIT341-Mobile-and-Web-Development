import { Api } from '@/Api'

const state = {
  // put the state here
  users: [],
  loggedIn: ''
}

const getters = {
  // put state getters here
  allUsers: function (state) {
    return state.users
  },
  getLoggedIn: function (state) {
    return state.loggedIn
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
  }
}

const actions = {
  // put method callers here
  async getUsers({ commit }) {
    const res = await Api.get('/users')
    commit('setUsers', res.data)
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
    const res = await Api.patch(`/users/${user._id}`, user)
    commit('updatedUser', res.data)
  },
  async deleteUser({ commit }, id) {
    await Api.delete(`/users/${id}`)
    commit('deletedUser', id)
  },
  async authUser({ commit }, user) {
    try {
      await Api.post('/users/auth', user)
      commit('setLoggedIn', user)
    } catch (err) {
      return err.response.data
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
