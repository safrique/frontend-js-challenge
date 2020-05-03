import Helpers from '../../../mixins/Helpers'
import _ from 'lodash'

const summary = {
  summary: {}
}

const mutations = {
  SET_DATA (state, payload) {
    state.summary[`${payload.category}Data`] = Helpers.getPeoplePropertyData(payload.data, payload.category)
  },

  SET_BRACKETS_DATA (state, payload) {
    state.summary[`${payload.category}BracketsData`] = Helpers.getBracketsSummary(payload.data, payload.category)
  },
}

const getters = {
  getAgeData: (state) => { return ((_.isEmpty(state.summary.ageData)) ? [] : state.summary.ageData) },
  // getAgeBracketsData: (state) => { return ((_.isEmpty(state.summary.ageBracketsData)) ? [] : state.summary.ageBracketsData) },
  getAgeBracketsData: (state) => { return state.summary.ageBracketsData },
}

const actions = {
  setData ({ commit, state }, payload) { commit('SET_DATA', payload) },
  setBracketsData ({ commit, state }, payload) { commit('SET_BRACKETS_DATA', payload) },
}

export default {
  namespaced: true,
  state: summary,
  getters,
  actions,
  mutations,
}
