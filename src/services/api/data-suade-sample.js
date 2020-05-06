import api from './api'

const people_data = {
  getData () {
    return api(`https://updates.suade.org/files/people.json`).get()
      // .then(response => { return response })
      // .catch(e => { console.log(`get data error:`, e)})
  }
}

export default people_data
