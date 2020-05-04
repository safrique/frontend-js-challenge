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
  </div>
</template>

<script>
  import Helpers from '../../mixins/Helpers'

  export default {
    name: 'PieChart',

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
          data = this.setNewCategoryData(category)
        }

        // console.log(`checking data again...`)
        if (typeof data !== `undefined`) {
          this.buildPieChart(data)
          return true
        }
        return false
      },

      setNewCategoryData (category) {
        // console.log(`setting ${this.value} data...`)
        this.setData({ data: this.getPeople(), category: this.value })
          .then(this.setBracketsData({ data: this.summary.summary[`${this.value}Data`], category: this.value })
            .then(() => { return this.summary.summary[category] }))
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
            // console.log(`new_obj`, new_obj)
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
      },

      displayData () {
        // console.log(`pie chart data`, this.getPeopleData)
        // console.log(`age data`, this.getPeopleAgeSummary)
      },

      // getPeoplePropertyData (people, category) {
      //   let data = {}
      //
      //   for (let person in people) {
      //     if (people.hasOwnProperty(person)) {
      //       // console.log(`person:${person} -- data`, people[person])
      //       // console.log(`${category}:${people[person][category]} -- type=${typeof people[person][category]}`)
      //
      //       if (data.hasOwnProperty(people[person][category])) {
      //         data[people[person][category]]++
      //         continue
      //       }
      //
      //       data[people[person][category]] = 1
      //     }
      //   }
      //
      //   // console.log(`data:`, data)
      //   return data
      // },
      //
      // summariseAges (data) {
      //   let summary = {}
      //
      //   for (let age in data) {
      //     if (data.hasOwnProperty(age)) {
      //       age = parseInt(age)
      //       let from_age = (Math.trunc(age / 10) * 10).toString()
      //       let to_age = ((Math.trunc(age / 10) + 1) * 10 - 1).toString()
      //       let bracket = from_age + ` to ` + to_age
      //       // console.log(`age=${age} -- data=${data[age]} -- bracket:${bracket} -- summary`, summary)
      //
      //       if (summary.hasOwnProperty(bracket)) {
      //         summary[bracket] += data[age]
      //         // console.log(`summary after updating:`, summary)
      //         continue
      //       }
      //
      //       summary[bracket] = data[age]
      //       // console.log(`summary after insert:`, summary)
      //     }
      //   }
      //
      //   // console.log(`age summary:`, summary)
      //   return summary
      // },
    },

    created () {
      // this.makePieChart(`age`)
      // this.displayData()
    },
  }
</script>

<style scoped>

</style>
