import _ from 'lodash'

const people = {
  people: {}
}

const mutations = {
  SET_PEOPLE (state, people) { state.people = people },
  UPDATE_PERSON (state, payload) { state.people[payload.index] = payload.data },
}

const getters = {
  getPeople: (state) => { return (_.isEmpty(state.people)) ? [] : state.people },
}

const actions = {
  setPeople ({ commit, state }, people) { commit('SET_PEOPLE', people) },
  updatePerson ({ commit, state }, payload) { commit('UPDATE_PERSON', payload) },
}

export default {
  namespaced: true,
  state: people,
  getters,
  actions,
  mutations,
}
