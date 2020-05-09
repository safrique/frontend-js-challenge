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
      // tells the charts that the data has been changed so re-render
      updateData () {
        try {
          if (this.$refs.pie) {
            this.$refs.pie.checkDataBuildChart()
          } else { return false }

          return this.updateBarChart()
        } catch (e) {
          console.log(`${this.$options.name} updateData error...`, e)
          return false
        }
      },

      updateBarChart (type) {
        try {
          if (this.$refs.bar) {
            return this.$refs.bar.checkDataBuildChart(type)
          }
        } catch (e) {
          console.log(`${this.$options.name} updateBarChart error...`, e)
          return false
        }
      },

      emitChartBuiltEvent (type) {
        return this.updateBarChart(type)
      },
    },
  }
</script>

<style scoped>

</style>
