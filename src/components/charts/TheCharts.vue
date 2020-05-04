<template>
  <div id="the-chart">
    <h1>Charts</h1>
    <PieChart ref="pie"></PieChart>
    <BarChart></BarChart>
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
        // console.log(`updateData method triggered in TheCharts...`)
        // console.log(`TheCharts refs:`, this.$refs)
        if (this.$refs.pie) {
          // console.log(`updating PieChart data...`)
          this.$refs.pie.checkDataBuildChart()
        }
      },
    },
  }
</script>

<style scoped>

</style>
