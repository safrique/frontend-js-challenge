import 'babel-polyfill'
import axios from 'axios'
import { fetchData, url } from '../../../src/services/api/ResolvedPromise'
import peopleData from '../../../src/assets/docs/people-data.json'

jest.mock('axios')

describe('fetchData', () => {
  it('fetches data successfully from an API and checks the called URL', async () => {
    const data = peopleData
    axios.get.mockImplementationOnce(() => Promise.resolve(data))
    await expect(fetchData()).resolves.toEqual(data)
    expect(axios.get).toHaveBeenCalledWith(url)
  })
})
