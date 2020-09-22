import { Api } from '@/Api'

const state = {
  // put the state here
  users: []
}

const getters = {
  // put state getters here
  allUsers: function (state) {
    return state.users
  }
}

const mutations = {
  // put methods that mutate the state here
  setUsers: function (state, users) {
    state.users = users
  },
  newUser: function (state, user) {
    state.users.push(user)
  }
}

const actions = {
  // put method callers here
  async getUsers({ commit }) {
    const res = await Api.get('/users')
    commit('setUsers', res.data)
  },
  async postUser({ commit }, user) {
    const res = await Api.post('/users', user)
    commit('newUser', res.data)
  },
  async patchUser({ commit }, user) {
    const res = await Api.patch(`/users/${user._id}`, user)
    commit('updatedUser', res.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
