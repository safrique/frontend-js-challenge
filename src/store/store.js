import Vue from 'vue'
import Vuex from 'vuex'
import people from './modules/data/people'
import summary from './modules/data/summary'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    people,
    summary,
  }
})

export default store
