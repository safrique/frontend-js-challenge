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
      checkDataBuildChart (type) {
        // console.log(`building ${type} bar chart...`)
        try {
          this.chartType = type
          this.dataType = `${this.chartType}Data`
          this.chartTitle = `People' ${this.chartType.replace(`Color`, ` colour`)}s`
        } catch (e) {
          console.log(`${this.$options.name} checkDataBuildChart error...`, e)
          return false
        }

        setTimeout(() => {
          this.setChartData()
          this.renderBarChart()
        }, 500)
      },

      setChartData () {
        // let data = this.summary.summary[this.dataType]
        // // console.log(`bar chart data...`, data)
        // this.chartData = this.buildChartData(data)
        try {
          this.chartData = this.buildChartData(this.summary.summary[this.dataType])
        } catch (e) {
          console.log(`${this.$options.name} setChartData error...`, e)
          return false
        }
      },

      buildChartData (data) {
        // console.log(`building bar chart data...`, data)
        let new_data = []

        try {
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              // console.log(`item=${item} -- data[key]...`, data[item])
              new_data.push({ 'category': item, 'value': data[item] })
            }
          }
        } catch (e) {
          console.log(`${this.$options.name} buildChartData error...`, e)
          return false
        }

        // console.log(`new_data...`, new_data)
        return new_data
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
