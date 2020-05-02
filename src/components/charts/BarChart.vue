<template>
  <div id="bar-chart">
    <div id="bar-chart-render" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'BarChart',

    created () {
      AmCharts.makeChart('bar-chart-render',
        {
          'type': 'serial',
          'categoryField': 'type',
          'chartCursor': {},
          'graphs': [
            {
              'type': 'column',
              'title': 'Pizza types',
              'valueField': 'sold',
              'fillAlphas': 0.8
            }
          ],

          'dataProvider': [
            { 'type': 'Margherita', 'sold': 120 },
            { 'type': 'Funghi', 'sold': 82 },
            { 'type': 'Capricciosa', 'sold': 78 },
            { 'type': 'Quattro Stagioni', 'sold': 71 }
          ]
        }
      )
    },
  }
</script>

<style scoped>

</style>
