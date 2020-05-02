<template>
  <div id="the-chart">
    <h1>Charts</h1>
    <PieChart></PieChart>
    <BarChart></BarChart>
  </div>
</template>

<script>
  import BarChart from './BarChart'
  import PieChart from './PieChart'

  export default {
    name: 'TheChart',

    components: {
      BarChart,
      PieChart,
    }
  }
</script>

<style scoped>

</style>
