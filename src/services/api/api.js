import axios from 'axios'

export default (url) => {
  try {
    return axios.create({
      baseURL: url,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).get()
  } catch (e) {
    console.log(`api call error...`, e)
  }
}
