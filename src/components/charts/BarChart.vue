<template>
  <div id="bar-chart">
    <h3>{{ chartTitle }}</h3>
    <div id="bar-chart-render" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'BarChart',

    data () {
      return {
        chartData: [],
        chartType: `age`,
        dataType: `${this.chartType}Data`,
        chartTitle: ``,
      }
    },

    methods: {
      checkDataBuildChart (type) {
        // console.log(`building ${type} bar chart...`)
        this.chartType = type
        this.dataType = `${this.chartType}Data`
        this.chartTitle = `People' ${this.chartType.replace(`Color`, ` colour`)}s`

        setTimeout(() => {
          this.setChartData()
          this.renderBarChart()
        }, 500)
      },

      setChartData () {
        // let data = this.summary.summary[this.dataType]
        // // console.log(`bar chart data...`, data)
        // this.chartData = this.buildChartData(data)
        this.chartData = this.buildChartData(this.summary.summary[this.dataType])
      },

      buildChartData (data) {
        // console.log(`building bar chart data...`, data)
        let new_data = []

        for (let item in data) {
          if (data.hasOwnProperty(item)) {
            // console.log(`item=${item} -- data[key]...`, data[item])
            new_data.push({ 'type': item, 'value': data[item] })
          }
        }

        // console.log(`new_data...`, new_data)
        return new_data
      },

      renderBarChart () {
        setTimeout(() => {
          AmCharts.makeChart('bar-chart-render',
            {
              'type': 'serial',
              'categoryField': 'type',
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
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
