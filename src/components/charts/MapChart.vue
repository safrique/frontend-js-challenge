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
        return this.makeMap()
      },
    },

    data () {
      return {
        descriptionMessage: ` is now selected.</br></br>Close this description box to unselect the area.`,
      }
    },

    methods: {
      makeMap () {
        setTimeout(() => {
          let map = AmCharts.makeChart('map-chart-render', {
            'type': 'map',
            'theme': 'light',
            'projection': 'eckert3',
            'dataProvider': {
              'map': 'worldLow',
              'getAreasFromMap': true,
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
                {
                  // 'id': 'GB',
                  // 'description': `United Kingdom${this.descriptionMessage}`,
                  'color': '#00B33C',
                  'images': [{
                    'latitude': 31.288038,
                    'longitude': -56.647435,
                    // 'type': 'circle',
                    // 'label': 'London'
                  }]
                },
              ],
            },
            'areasSettings': {
              'autoZoom': true,
              'selectedColor': '#CC0000'
            },
            'smallMap': {
              'backgroundAlpha': 0.5
            },
            'listeners': [{
              'event': 'descriptionClosed',
              'method': (ev) => { ev.chart.selectObject() }
            }]
          })
          return false
        }, 500)

        return true
      },
    },
  }
</script>

<style scoped>

</style>
