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
    ...mapActions('people', ['setPeople']),
    ...mapActions('summary', ['setData', 'setBracketsData',]),

    loadPeopleData () {
      api_data.getData().then(response => { this.setPeople(response.data) })
        .then(() => {
          this.setData({ data: this.getPeople(), category: `age` })
            .then(this.setBracketsData({ data: this.getAgeData, category: `age` }))
        })
    }
  },
}
