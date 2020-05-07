import { shallowMount } from '@vue/test-utils'

import PeopleData from '../../components/data/PeopleData'

const wrapper = shallowMount(PeopleData)

describe(`PeopleData`, () => {
  it('PeopleData renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  // it(``, (wrapper.) => {expect().toBe()})
})
