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
        return this.getPeople()
      },

      loading () {
        // console.log(`check loading -- componentKey=${this.componentKey}...`)
        if (Object.keys(this.getPeopleData).length > 0) {
          this.options = Helpers.buildPersonAttributes(this.getPeopleData)
        }

        if (!this.chartBuilt) {
          // console.log(`chartBuilt=${this.chartBuilt}. #${this.componentKey}..`)
          setTimeout(() => {
            if (this.checkDataBuildChart()) { return false }
          }, 500)

          this.chartBuilt = true
        }

        this.componentKey++
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
            this.buildPieChart(data)
            return true
          }
          // console.log(`data still undefined - exiting...`)
          return false
        }, 500)
      },

      buildPieChart (input) {
        // console.log(`building the ${this.value} chart...`)
        this.setChartData(input)
        if (this.chartData.length) { this.renderChart() }
      },

      setChartData (input) {
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
      },

      renderChart () {
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
          // console.log(`chart built...`)
        }, 500)

        this.$emit(`renderedChart`, this.value)
      },
    },
  }
</script>

<style scoped>

</style>
