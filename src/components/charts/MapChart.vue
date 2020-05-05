<template>
  <div class="map-chart">
    <h1>Map</h1>

    <div :loading="loading" id="map-chart-render" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'MapChart',

    computed: {
      loading () {
        // console.log(`loading...`)
        return this.makeMap()
        // return true
      },
    },

    data () {
      return {
        descriptionMessage: ` is now selected.</br></br>Close this description box to unselect the area.`,
        mapPeopleData: [],
        category: `location`,
      }
    },

    methods: {
      makeMap () {
        setTimeout(() => {
          if (this.mapPeopleData && this.mapPeopleData.length === 0) { this.setMapData() }

          setTimeout(() => {
            let map = AmCharts.makeChart('map-chart-render', {
              'type': 'map',
              'theme': 'light',
              'projection': 'eckert3',
              'dataProvider': {
                'map': 'worldLow',
                'getAreasFromMap': true,
                'images': this.mapPeopleData,
                'areas': [
                  {
                    'id': 'US',
                    'description': `United States${this.descriptionMessage}`,
                    'color': '#FF7F50',
                    'images': [{
                      'latitude': 40.712784,
                      'longitude': -74.005941,
                      'type': 'circle',
                      'label': 'New York',
                    }]
                  },
                  {
                    'id': 'GB',
                    'description': `United Kingdom${this.descriptionMessage}`,
                    'color': '#FFD700',
                    'images': [{
                      'latitude': 51.5074,
                      'longitude': -0.1278,
                      'type': 'circle',
                      'label': 'London'
                    }]
                  },
                ],
              },
              'areasSettings': {
                'autoZoom': false,
                'selectedColor': '#CC0000'
              },
              'listeners': [{
                'event': 'descriptionClosed',
                'method': (ev) => { ev.chart.selectObject() }
              }]
            })
            return false
          }, 500)
        }, 500)

        return true
      },

      setMapData () {
        // console.log(`mapPeopleData...`, this.mapPeopleData)
        let people = this.getPeople()

        for (let person in people) {
          // console.log(`person=${person} -- name=${people[person].name} -- latitude=${people[person].location.latitude} -- people[person]`, people[person])
          if (people.hasOwnProperty(person)) {
            this.mapPeopleData.push({
              'type': 'circle',
              'label': people[person].name,
              'latitude': people[person].location.latitude,
              'longitude': people[person].location.longitude,
              'rollOverScale': 1.5,
              'balloonText':
                `<strong>Attributes:</strong><br>Age: ${people[person].age}; Eye colour: ${people[person].eyeColor};<br>
                <strong>Preferences:</strong><br>Pet: ${people[person].preferences.pet}; Fruit: ${people[person].preferences.fruit};<br>
                <strong>Location:</strong><br>Longitude: ${people[person].location.longitude}; Latitude: ${people[person].location.latitude};`,
            })
          } //else {console.log(`people does NOT have own property person=${person}...`)}
        }

        // console.log(`mapPeopleData...`, this.mapPeopleData)
      },
    },

    // mounted () {
    //   console.log(`loading...`)
    //   return this.makeMap()
    // },
  }
</script>

<style scoped>

</style>
