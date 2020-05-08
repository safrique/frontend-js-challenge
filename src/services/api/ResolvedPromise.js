import axios from 'axios'

export const url = `https://updates.suade.org/files/people.json`

export const fetchData = async () => {
  return await axios.get(url)
}
