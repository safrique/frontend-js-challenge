import axios from 'axios'

export default (url) => {
  return axios.create({
    baseURL: url,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
