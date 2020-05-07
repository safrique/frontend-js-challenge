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
        // console.log(`check loading -- componentKey=${this.componentKey}...`)
        try {
          if (Object.keys(this.getPeopleData).length > 0) {
            this.options = Helpers.buildPersonAttributes(this.getPeopleData)
          }

          if (!this.chartBuilt) {
            // console.log(`chartBuilt=${this.chartBuilt}. #${this.componentKey}..`)
            setTimeout(() => {
              if (this.checkDataBuildChart()) { return false }
            }, 500)

            this.chartBuilt = false
          }

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
          // console.log(`category=${this.value} -- checking it exists...`)
          let data = this.summary.summary[category]

          if (this.value !== `age` && typeof data === `undefined`) {
            // console.log(`chart data undefined - setting it again...`)
            data = this.setNewCategoryData(category, this.value)
            // console.log(`reset chart data...`, data)
          }
          // console.log(`chart data...`, data)

          // console.log(`waiting before carrying on...`)
          // the data seems to take a bit of time before being set in the vuex store so we have to wait a little
          setTimeout(() => {
            // console.log(`waited - trying again...`)
            if (typeof data === `undefined`) {
              // console.log(`data still undefined - going to trying again...`)
              data = this.summary.summary[category]
              // console.log(`tried again...`, data)
            }

            // console.log(`checking data again...`)
            if (typeof data !== `undefined`) {
              return this.buildPieChart(data)
            }
            // console.log(`data still undefined - exiting...`)
            return false
          }, 500)
        } catch (e) {
          console.log(`${this.$options.name} checkDataBuildChart error...`, e)
          return false
        }
      },

      buildPieChart (input) {
        // console.log(`building the ${this.value} chart...`)
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
          // console.log(`chartData:`, this.chartData)
          return (this.chartData.length > 0)
        } catch (e) {
          console.log(`${this.$options.name} setChartDat error...`, e)
          return false
        }
      },

      renderChart () {
        try {
          setTimeout(() => {
            // console.log(`building ${this.value} chart now...`)
            AmCharts.makeChart('pie-chart-render',
              {
                'type': 'pie',
                'titleField': 'category',
                'valueField': 'value',
                'dataProvider': this.chartData
              }
            )

            this.$emit(`renderedChart`, this.value)
            // console.log(`chart built...`)
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
