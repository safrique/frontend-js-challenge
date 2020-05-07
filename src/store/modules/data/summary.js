import Helpers from '../../../mixins/Helpers'
import _ from 'lodash'

const summary = {
  summary: {}
}

const mutations = {
  SET_DATA (state, payload) {
    try {
      state.summary[`${payload.category}Data`] = Helpers.getPeoplePropertyData(payload.data, payload.category)
    } catch (e) {
      console.log(`summary.js SET_DATA error...`, e)
      return false
    }
  },

  SET_BRACKETS_DATA (state, payload) {
    try {
      state.summary[`${payload.category}BracketsData`] = Helpers.getBracketsSummary(payload.data, payload.category)
    } catch (e) {
      console.log(`summary.js SET_BRACKETS_DATA error...`, e)
      return false
    }
  },
}

const getters = {
  getAgeData: (state) => {
    try {
      return ((_.isEmpty(state.summary.ageData)) ? [] : state.summary.ageData)
    } catch (e) {
      console.log(`summary.js getAgeData error...`, e)
      return false
    }
  },

  getAgeBracketsData: (state) => {
    try {
      return state.summary.ageBracketsData
    } catch (e) {
      console.log(`summary.js getAgeBracketsData error...`, e)
      return false
    }
  },
}

const actions = {
  setData ({ commit, state }, payload) {
    try {
      commit('SET_DATA', payload)
      return state.summary[`${payload.category}Data`]
    } catch (e) {
      console.log(`summary.js setData error...`, e)
      return false
    }
  },

  setBracketsData ({ commit, state }, payload) {
    try {
      commit('SET_BRACKETS_DATA', payload)
      return state.summary[`${payload.category}BracketsData`]
    } catch (e) {
      console.log(`summary.js setBracketsData error...`, e)
      return false
    }
  },
}

export default {
  namespaced: true,
  state: summary,
  getters,
  actions,
  mutations,
}
