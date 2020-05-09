<template>
  <div id="bar-chart">
    <h3>{{ chartTitle }}</h3>
    <div id="bar-chart-render" style="width: 100%; height: 400px;"></div>
    <ChartTable :table-data="chartData" id="bar-chart-table"></ChartTable>
  </div>
</template>

<script>
  import ChartTable from '../data/ChartTable'

  export default {
    name: 'BarChart',

    components: {
      ChartTable,
    },

    data () {
      return {
        chartData: [],
        chartType: `age`,
        dataType: ``,
        chartTitle: ``,
      }
    },

    methods: {
      checkDataBuildChart (type = this.chartType) {
        try {
          this.chartType = type
          this.dataType = `${this.chartType}Data`
          let cType = this.chartType.toString()
          this.chartTitle = `People's ${cType.replace(`Color`, ` colour`)}s`

          // Waiting a bit for the data to be loaded first
          setTimeout(() => {
            if (this.setChartData()) { return this.renderBarChart() }
            return false
          }, 500)
        } catch (e) {
          console.log(`${this.$options.name} checkDataBuildChart error...`, e)
          return false
        }
      },

      setChartData () {
        try {
          this.chartData = this.buildChartData(this.summary.summary[this.dataType])
          return (this.chartData.length > 0)
        } catch (e) {
          console.log(`${this.$options.name} setChartData error...`, e)
          return false
        }
      },

      buildChartData (data) {
        let new_data = []

        try {
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              new_data.push({ 'category': item, 'value': data[item] })
            }
          }
        } catch (e) {
          console.log(`${this.$options.name} buildChartData error...`, e)
        }

        return (new_data.length > 0 ? new_data : false)
      },

      renderBarChart () {
        try {
          setTimeout(() => {
            AmCharts.makeChart('bar-chart-render',
              {
                'type': 'serial',
                'categoryField': 'category',
                'chartCursor': {},
                'graphs': [
                  {
                    'type': 'column',
                    'title': this.chartTitle,
                    'valueField': 'value',
                    'fillAlphas': 0.8
                  }
                ],

                'dataProvider': this.chartData
              }
            )
            return true
          }, 500)
        } catch (e) {
          console.log(`${this.$options.name} renderBarChart error...`, e)
          return false
        }
      },
    },
  }
</script>

<style scoped>
  #bar-chart-table {
    margin-top: 2em;
  }
</style>
