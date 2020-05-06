<template>
  <div class="chart-table">
    <h4 id="chart-table-header">Chart Data</h4>

    <el-table
      :data="tableData"
      border
      style="width: 27%"
      max-height="350">
      <el-table-column
        prop="category"
        label="Category"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="value"
        label="Value"
        width="180"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ChartTable',

    props: {
      tableData: {
        required: true,
        type: Array,
        placeholder: []
      }
    },
  }
</script>

<style scoped>
  #chart-table-header {
    text-align: left;
    margin-left: 6em;
  }
</style>
