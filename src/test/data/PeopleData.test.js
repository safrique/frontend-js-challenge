// import { shallowMount } from '@vue/test-utils'

// Trying to use ElementUI customer elements - TODO: try find a fix for not recognising them
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
const localVue = createLocalVue()
localVue.use(ElementUI)

import PeopleData from '../../components/data/PeopleData'

const wrapper = shallowMount(PeopleData)

describe(`PeopleData`, () => {
  it('PeopleData renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  // it(``, (wrapper.) => {expect().toBe()})
})
