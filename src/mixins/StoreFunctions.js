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
          this.setData({ data: this.getPeople(), category: `age` })
            .then(this.setBracketsData({ data: this.getAgeData, category: `age` }))
        })
    },

    updateStore (person) {
      let people = this.getPeople()
      // console.log(`updating store...`, people)
      for (let item in people) {
        // console.log(`item=${item} -- ID=${person._id} -- people[item]:`, people[item])
        if (people.hasOwnProperty(item) && people[item]._id === person._id) {
          this.updatePerson({ index: item, data: person })
          // console.log(`found person with ID=${person._id} on index=${item} -- store.people[person]:`, this.getPeople()[item])
          console.log(`summary data:`, this.summary.summary)
          return people[item]
        }
      }
    },


  },
}
