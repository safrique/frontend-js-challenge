import { mapGetters, mapActions, mapState } from 'vuex'
import people_data from '../../services/api/data-suade-sample'

export default {
  computed: {
    ...mapGetters('people', ['getPeople']),
    ...mapState(['people']),
  },

  methods: {
    ...mapActions('people', ['setPeople']),

    loadPeopleData () {
      // console.log(`Loading people form storeFunctions`)
      people_data.getData().then(response => {
        // console.log(`people data:`, response.data)
        this.setPeople(response.data)
      })
    }
  },
}
