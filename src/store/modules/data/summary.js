import Helpers from '../../../mixins/Helpers'
import _ from 'lodash'

const summary = {
  summary: {}
}

const mutations = {
  SET_AGE_DATA (state, peopleData) { state.summary.ageData = Helpers.getAgeSummary(peopleData) },
  SET_AGE_BRACKETS_DATA (state, ageData) { state.summary.ageBracketsData = Helpers.getAgeBracketsSummary(ageData) },
}

const getters = {
  getAgeData: (state) => { return ((_.isEmpty(state.summary.ageData)) ? [] : state.summary.ageData) },
  // getAgeBracketsData: (state) => { return ((_.isEmpty(state.summary.ageBracketsData)) ? [] : state.summary.ageBracketsData) },
  getAgeBracketsData: (state) => { return state.summary.ageBracketsData },
}

const actions = {
  setAgeData ({ commit, state }, peopleData) { commit('SET_AGE_DATA', peopleData) },
  setAgeBracketsData ({ commit, state }, ageData) { commit('SET_AGE_BRACKETS_DATA', ageData) },
}

export default {
  namespaced: true,
  state: summary,
  getters,
  actions,
  mutations,
}
