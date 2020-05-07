import { shallowMount } from '@vue/test-utils'
import PieChart from '../../components/charts/PieChart'

const wrapper = shallowMount(PieChart)

describe(`PieChart`, () => {
  // // Inspect the raw component options
  // it('has a created hook', () => {
  //   expect(typeof PieChart.checkDataBuildChart).toBe('function')
  // })

  // Inspect the component instance on mount
  it(`initial value=age`, () => {
    expect(wrapper.vm.$data.value).toBe(`age`)
  })
})
