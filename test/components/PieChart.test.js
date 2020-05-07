import { shallowMount } from '@vue/test-utils'
import PieChart from '../../src/components/charts/PieChart'
import PieChartTable from '../../src/components/data/ChartTable'

// // Trying to use ElementUI customer elements - TODO: try find a fix for not recognising them
// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import ElementUI from 'element-ui'
// const localVue = createLocalVue()
// localVue.use(ElementUI)

const wrapper = shallowMount(PieChart)

describe(`PieChart`, () => {
  it('PieChart renders a vue instance', () => {expect(wrapper.isVueInstance()).toBe(true)})

  it(`initial value=age, i.e. type of data displayed`, () => {expect(wrapper.vm.$data.value).toBe(`age`)})

  it(`Contains the PieChartTable component`, () => {expect(wrapper.contains(PieChartTable)).toBe(true)})

  it(`Contains the chart containing div`, () => {expect(wrapper.contains('div#pie-chart-render')).toBe(true)})

  it(`Contains the dropdown with other options of data types to display`, () => {expect(wrapper.contains('el-select')).toBe(true)})
})
