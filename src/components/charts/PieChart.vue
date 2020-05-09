<template>
  <div id="pie-chart" :key="componentKey">
    Select a category to display:
    <el-select v-model="value" placeholder="Select" @change="checkDataBuildChart()">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div :loading="loading" id="pie-chart-render" style="width: 100%; height: 400px;"></div>

    <PieChartTable :table-data="chartData"></PieChartTable>
  </div>
</template>

<script>
  import Helpers from '../../mixins/Helpers'
  import PieChartTable from '../data/ChartTable'

  export default {
    name: 'PieChart',

    components: {
      PieChartTable,
    },

    computed: {
      getPeopleData () {
        try {
          return this.getPeople()
        } catch (e) {
          console.log(`${this.$options.name} getPeopleData error...`, e)
          return false
        }
      },

      loading () {
        try {
          if (Object.keys(this.getPeopleData).length > 0) {
            // options used for the dropdown select
            this.options = Helpers.buildPersonAttributes(this.getPeopleData)
          }

          // check if the chart is already built so it doesn't get built twice
          if (!this.chartBuilt) {
            // wait for the data then build the chart then return false, i.e. no longer loading
            setTimeout(() => {
              if (this.checkDataBuildChart()) { return false }
            }, 500)
            this.chartBuilt = true
          }

          // change the key for the main div to ensure it tries to load the components that didn't have data before
          this.componentKey++
        } catch (e) {
          console.log(`${this.$options.name} loading error...`, e)
        }
        return true
      },
    },

    data () {
      return {
        options: [],
        value: `age`,
        componentKey: 0,
        chartData: [],
        chartBuilt: false,
      }
    },

    methods: {
      checkDataBuildChart () {
        try {
          let category = `${this.value}BracketsData`
          let data = this.summary.summary[category]

          if (this.value !== `age` && typeof data === `undefined`) {
            data = this.setNewCategoryData(category, this.value)
          }

          // the data seems to take a bit of time before being set in the vuex store so we have to wait a little
          setTimeout(() => {
            if (typeof data === `undefined`) {
              data = this.summary.summary[category]
            }

            // check we have the data before trying to build the chart
            if (typeof data !== `undefined`) {
              return this.buildPieChart(data)
            }

            return false
          }, 500)
        } catch (e) {
          console.log(`${this.$options.name} checkDataBuildChart error...`, e)
          return false
        }
      },

      buildPieChart (input) {
        try {
          if (this.setChartData(input)) { return this.renderChart() }
        } catch (e) {
          console.log(`${this.$options.name} buildPieChart error...`, e)
          return false
        }
      },

      setChartData (input) {
        try {
          let display_data = []

          for (let group in input) {
            if (input.hasOwnProperty(group)) {
              let new_obj = {
                'category': group,
                'value': input[group],
              }
              display_data.push(new_obj)
            }
          }

          this.chartData = display_data
          return (this.chartData.length > 0)
        } catch (e) {
          console.log(`${this.$options.name} setChartDat error...`, e)
          return false
        }
      },

      renderChart () {
        try {
          // wait for the data to land again before building the chart
          setTimeout(() => {
            AmCharts.makeChart('pie-chart-render',
              {
                'type': 'pie',
                'titleField': 'category',
                'valueField': 'value',
                'dataProvider': this.chartData
              }
            )

            this.$emit(`renderedChart`, this.value)
            return true
          }, 500)
        } catch (e) {
          console.log(`${this.$options.name} renderChart error...`, e)
          return false
        }
      },
    },
  }
</script>

<style scoped>

</style>
