<template>
  <div id="pie-chart">
    <div id="pie-chart-render" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'PieChart',

    created () {
      AmCharts.makeChart('pie-chart-render',
        {
          'type': 'pie',
          'titleField': 'category',
          'valueField': 'column-1',
          'dataProvider': [
            {
              'category': 'category 1',
              'column-1': 8
            },
            {
              'category': 'category 2',
              'column-1': 6
            },
            {
              'category': 'category 3',
              'column-1': 2
            }
          ]
        }
      )
    },
  }
</script>

<style scoped>

</style>
