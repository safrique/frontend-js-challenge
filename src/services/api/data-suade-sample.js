import api from './api'

const people_data = {
  getData () {
    try {
      return api(`https://updates.suade.org/files/people.json`).get()
      // .then(response => { return response })
      // .catch(e => { console.log(`get data error:`, e)})
    } catch (e) {
      console.log(`data-suade-sample error...`, e)
      return false
    }
  }
}

export default people_data
