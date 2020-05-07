import api from '../../../src/services/api/api'
import data from '../../../src/assets/docs/people-data.json'

describe(`api`, () => {
  test('API call returns the json people data file', () => {
    api(`https://updates.suade.org/files/people.json`).get()
      .then(() => {expect(response.body).toBe(data)})
  })
})



