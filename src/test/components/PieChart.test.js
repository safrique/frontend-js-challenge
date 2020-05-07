import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'

import PieChart from '../../components/charts/PieChart'
import PieChartTable from '../../components/data/ChartTable'

// Trying to use ElementUI customer elements - TODO: try find a fix for not recognising them
const localVue = createLocalVue()
localVue.use(ElementUI)

const wrapper = shallowMount(PieChart)

describe(`PieChart`, () => {
  // Check it renders as a Vue instance
  it('PieChart renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  // Test the initial type of data displayed
  it(`initial value=age`, () => {
    expect(wrapper.vm.$data.value).toBe(`age`)
  })

  it(`Contains the PieChartTable component`, () => {
    expect(wrapper.contains(PieChartTable)).toBe(true)
  })

  it(`Contains the chart containing div`, () => {
    expect(wrapper.contains('div#pie-chart-render')).toBe(true)
  })

  it(`Contains the dropdown with other options of data types to display`, () => {
    expect(wrapper.contains('el-select')).toBe(true)
  })

  // it(``, (wrapper.) => {expect().toBe()})
})
