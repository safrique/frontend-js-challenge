import { mapGetters, mapActions, mapState } from 'vuex'
import api_data from '../services/api/DataSuadeSample'
import backupData from '../assets/docs/people-data.json'

export default {
  computed: {
    ...mapState(['people', 'summary']), // TODO: Don't really want to do this, rather access data via getters!!!
    ...mapGetters('summary', ['getAgeData', 'getAgeBracketsData']),
  },

  methods: {
    ...mapGetters('people', ['getPeople']),
    ...mapActions('people', ['setPeople', 'updatePerson']),
    ...mapActions('summary', ['setData', 'setBracketsData',]),

    loadPeopleData () {
      try {
        let type = `age`

        api_data.getData()
          .then(response => {
            if (typeof response.data === `undefined` || response.data.length > 0) {
              this.setPeople(response.data)
            } else {
              console.log(`API response.data had no data - using backup file...`)
              this.setPeople(backupData)
            }
          })
          .catch((e) => {
            console.log(`getting data from API error - using backup file...`, e)
            this.setPeople(backupData)
          })
          .then(() => {
            this.setData({ data: this.getPeople(), category: type })
              .then(() => {
                if (this.getPeople().length > 0) {
                  return this.setBracketsData({ data: this.getAgeData, category: (type) })
                }
                return false
              })
          })
      } catch (e) {
        console.log(`StoreFunctions loadPeopleData error...`, e)
        return false
      }
    },

    editPersonStoreData (person, delete_person = false) {
      try {
        let people = this.getPeople()
        for (let item in people) {
          if (people.hasOwnProperty(item) && people[item]._id === person._id) {
            if (delete_person) {
              this.people.people.splice(item, 1)
            } else {
              this.updatePerson({ index: item, data: person })
            }

            this.updateSummaryData()
            return (delete_person ? true : people[item])
          }
        }
      } catch (e) {
        console.log(`StoreFunctions editPersonStoreData error...`, e)
      }
      return false  // returning false to indicate the person wasn't found or there was an error
    },

    DeleteStoreData (person) {
      try {
        if (!this.editPersonStoreData(person, true)) {
          // this indicates the person wasn't found, i.e. already deleted, but we still want to update the summary data
          this.updateSummaryData()
        }
      } catch (e) {
        console.log(`StoreFunctions DeleteStoreData error...`, e)
        return false
      }
    },

    updateSummaryData () {
      try {
        let summary = this.summary.summary
        for (let set in summary) {
          let replaceable = `BracketsData`
          if (set.includes(replaceable)) {
            let value = set.replace(replaceable, ``)
            this.setNewCategoryData(set, value)
          }
        }
        return true
      } catch (e) {
        console.log(`StoreFunctions updateSummaryData error...`, e)
        return false
      }
    },

    setNewCategoryData (category, value) {
      try {
        this.setData({ data: this.getPeople(), category: value })
          .then(this.setBracketsData({ data: this.summary.summary[`${value}Data`], category: value })
            .then(() => {
              return this.summary.summary[category]
            }))
      } catch (e) {
        console.log(`StoreFunctions setNewCategoryData error...`, e)
        return false
      }
    },
  },
}
