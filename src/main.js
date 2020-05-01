import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './assets/js/store/index'
import _ from 'lodash'
import routes from './assets/js/routes/routes'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import AmPieChart from 'amcharts3/amcharts/pie'
import storeFunctions from './assets/js/mixins/storeFunctions'

window.Vue = Vue

Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.use(Vuex)
Vue.use(VueRouter)
const router = new VueRouter({ routes, mode: 'history', })

new Vue({
  el: '#app',
  store,
  router,
  _,
  AmCharts,
  AmSerial,
  AmPieChart,
  mixins: [storeFunctions],
  created () {this.loadPeopleData()},
  render: h => h(App)
})
