<template>
  <div id="the-chart">
    <h1>Charts</h1>
    <PieChart ref="pie" @renderedChart="emitChartBuiltEvent"></PieChart>
    <BarChart ref="bar"></BarChart>
  </div>
</template>

<script>
  import BarChart from './BarChart'
  import PieChart from './PieChart'

  export default {
    name: 'TheCharts',

    components: {
      BarChart,
      PieChart,
    },

    methods: {
      updateData () {
        try {
          // console.log(`updateData method triggered in TheCharts...`)
          // console.log(`TheCharts refs:`, this.$refs)
          if (this.$refs.pie) {
            // console.log(`updating PieChart data...`)
            this.$refs.pie.checkDataBuildChart()
          }

          this.updateBarChart()
        } catch (e) {
          console.log(`${this.$options.name} updateData error...`, e)
          return false
        }
      },

      updateBarChart (type) {
        try {
          // console.log(`updating ${type} bar chart from TheCharts...`)
          if (this.$refs.bar) {
            // console.log(`updating PieChart data...`)
            this.$refs.bar.checkDataBuildChart(type)
          }
        } catch (e) {
          console.log(`${this.$options.name} updateBarChart error...`, e)
          return false
        }
      },

      emitChartBuiltEvent (type) {
        // console.log(`TheCharts refs:`, this.$refs)
        this.updateBarChart(type)
      },
    },
  }
</script>

<style scoped>

</style>
