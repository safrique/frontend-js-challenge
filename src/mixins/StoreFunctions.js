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
    // ...mapGetters('summary', ['getAgeData', 'getAgeBracketsData']),
    ...mapActions('summary', ['setAgeData', 'setAgeBracketsData']),

    loadPeopleData () {
      api_data.getData().then(response => { this.setPeople(response.data) })
        .then(() => {
          this.setAgeData(this.getPeople())
            // .then(this.setAgeBracketsData(this.getAgeData()))
            .then(this.setAgeBracketsData(this.getAgeData))
        })
    }
  },
}
