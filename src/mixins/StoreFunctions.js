import { mapGetters, mapActions, mapState } from 'vuex'
import api_data from '../../services/api/data-suade-sample'

export default {
  computed: {
    ...mapState(['people', 'summary']), // TODO: Don't really want to do this, rather access data via getters!!!
    // ...mapGetters('people', ['getPeople']),
    ...mapGetters('summary', ['getAgeData', 'getAgeBracketsData']),
  },

  methods: {
    ...mapGetters('people', ['getPeople']),
    ...mapActions('people', ['setPeople', 'updatePerson']),
    ...mapActions('summary', ['setData', 'setBracketsData',]),

    loadPeopleData () {
      api_data.getData().then(response => { this.setPeople(response.data) })
        .then(() => {
          let type = `age`
          this.setData({ data: this.getPeople(), category: type })
            .then(this.setBracketsData({ data: this.getAgeData, category: (type) }))
        })
    },

    editStoreData (person, delete_person = false) {
      let people = this.getPeople()
      // console.log(`updating store...`, people)
      for (let item in people) {
        // console.log(`item=${item} -- ID=${person._id} -- people[item]:`, people[item])
        if (people.hasOwnProperty(item) && people[item]._id === person._id) {
          // console.log(`found person with ID=${person._id} on index=${item} -- store.people[person]:`, this.getPeople()[item])
          if (delete_person) {
            // console.log(`deleting person item=${item} -- ID=${person._id} -- people[item]:`, people[item])
            this.people.people.splice(item, 1)
          } else {
            this.updatePerson({ index: item, data: person })
          }

          this.updateSummaryData()
          return (delete_person ? true : people[item])
        }
      }
      return false  // returning false to indicate the person wasn't found
    },

    DeleteStoreData (person) {
      // console.log(`deleting store data...`, person)
      if (!this.editStoreData(person, true)) {
        // this indicates the person wasn't found, i.e. already deleted, but we still want to update the summary data
        this.updateSummaryData()
      }
      // console.log(`deleted store data...`, person)
    },

    updateSummaryData () {
      let summary = this.summary.summary
      // console.log(`updateSummaryData:`, summary)
      for (let set in summary) {
        // console.log(`set=${set} -- summary[set]:`, summary[set])
        let replaceable = `BracketsData`
        if (set.includes(replaceable)) {
          let value = set.replace(replaceable, ``)
          // console.log(`set=${set} includes replaceable=${replaceable} -- value=${value}...`)
          this.setNewCategoryData(set, value)
          // console.log(`set new category data...`)
        } //else { console.log(`set=${set} does NOT include replaceable=${replaceable}...`) }
      }
      return true
    },

    setNewCategoryData (category, value) {
      // console.log(`setting ${value} data for category=${category}...`)
      this.setData({ data: this.getPeople(), category: value })
        .then(this.setBracketsData({ data: this.summary.summary[`${value}Data`], category: value })
          .then(() => {
            // console.log(`this.summary.summary[${category}]`, this.summary.summary[category])
            return this.summary.summary[category]
          }))
    },
  },
}
