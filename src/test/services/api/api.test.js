//

import { shallowMount } from '@vue/test-utils'
import api from '../../../services/api/api'
import data from '../../../assets/docs/people-data.json'

// const wrapper = shallowMount(api)

describe(`api`, () => {
  test('API call returns the json people data file', () => {
    api(`https://updates.suade.org/files/people.json`).get()
      .then(() => {expect(response.body).toBe(data)})
  })
})



