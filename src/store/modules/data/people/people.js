// import _ from 'lodash'

const people = {
  people: {}
}

const mutations = {
  SET_PEOPLE (state, people) { state.people = people },
}

const getters = {
  // getPeople: (state) => { return (_.isEmpty(state.people)) ? [] : state.people },
  getPeople: (state) => { return state.people },
}

const actions = {
  setPeople ({ commit, state }, people) { commit('SET_PEOPLE', people) },
}

export default {
  namespaced: true,
  state: people,
  getters,
  actions,
  mutations,
}
