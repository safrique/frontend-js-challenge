import api from '../../../services/api/data-suade-sample'
import data from '../../../assets/docs/people-data.json'

describe(`suade data sample api`, () => {
  test('API call returns the json people data file', () => {
    api.getData().then(() => {
      expect(response.body).toBe(data)
    })
  })
})
