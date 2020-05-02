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
      console.log(`Loading people form storeFunctions`)
      people_data.getData().then(response => {
        console.log(`people data:`, response.data)
        this.setPeople(response.data)
      })

      // this.setPeople([
      //   {
      //     '_id': '5d5d7ad6b0e83bc2d9d67dfb',
      //     'age': 28,
      //     'eyeColor': 'brown',
      //     'name': 'Stephens Townsend',
      //     'gender': 'male',
      //     'location': {
      //       'latitude': 26.723281,
      //       'longitude': 99.391104
      //     },
      //     'preferences': {
      //       'pet': 'bird',
      //       'fruit': 'apple'
      //     }
      //   },
      //   {
      //     '_id': '5d5d7ad625ceac160b06721f',
      //     'age': 25,
      //     'eyeColor': 'blue',
      //     'name': 'Padilla Blair',
      //     'gender': 'male',
      //     'location': {
      //       'latitude': 31.288038,
      //       'longitude': -56.647435
      //     },
      //     'preferences': {
      //       'pet': 'cat',
      //       'fruit': 'strawberry'
      //     }
      //   },
      // ])
    }
  },
}
