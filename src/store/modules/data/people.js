import _ from 'lodash'

const people = {
  people: {}
}

const mutations = {
  SET_PEOPLE (state, people) {
    try { state.people = people } catch (e) {
      console.log(`people.js SET_PEOPLE error...`, e)
      return false
    }
  },

  UPDATE_PERSON (state, payload) {
    try { state.people[payload.index] = payload.data } catch (e) {
      console.log(`people.js UPDATE_PERSON error...`, e)
      return false
    }
  },
}

const getters = {
  getPeople: (state) => {
    try { return (_.isEmpty(state.people)) ? [] : state.people } catch (e) {
      console.log(`people.js getPeople error...`, e)
      return false
    }
  },
}

const actions = {
  setPeople ({ commit, state }, people) {
    try { commit('SET_PEOPLE', people) } catch (e) {
      console.log(`people.js setPeople error...`, e)
      return false
    }
  },

  updatePerson ({ commit, state }, payload) {
    try { commit('UPDATE_PERSON', payload) } catch (e) {
      console.log(`people.js updatePerson error...`, e)
      return false
    }
  },
}

export default {
  namespaced: true,
  state: people,
  getters,
  actions,
  mutations,
}
