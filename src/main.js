import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store/store'
import _ from 'lodash'
import routes from './routes/routes'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import AmPieChart from 'amcharts3/amcharts/pie'
import StoreFunctions from './mixins/StoreFunctions'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// importing ElementUI CSS in index.html as the damn url-loader for the ttf file wouldn't work

window.Vue = Vue

Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.use(ElementUI, { locale })
Vue.use(Vuex)
Vue.use(VueRouter)
const router = new VueRouter({ routes, mode: 'history', })

Vue.mixin(StoreFunctions)

new Vue({
  el: '#app',
  // components: { App },
  store,
  router,
  _,
  AmCharts,
  AmSerial,
  AmPieChart,
  mixins: [StoreFunctions],
  created () {this.loadPeopleData()},
  render: h => h(App)
})
