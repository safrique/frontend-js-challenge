<template>
  <div id="the-tabs">
    <el-tabs v-model="getActiveTabId" type="border-card">
      <el-tab-pane name="people-data">
        <span slot="label"><i class="el-icon-s-grid"></i> Table</span>
        <PeopleData></PeopleData>
      </el-tab-pane>

      <el-tab-pane name="charts">
        <span slot="label"><i class="el-icon-pie-chart"></i> Charts</span>
        <TheCharts></TheCharts>
      </el-tab-pane>

      <el-tab-pane name="map">
        <span slot="label"><i class="el-icon-location-outline"></i> Map</span>
        <MapChart></MapChart>
      </el-tab-pane>

      <el-tab-pane name="instructions">
        <span slot="label"><i class="el-icon-notebook-1"></i> Instructions</span>
        <AppInstructions></AppInstructions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TheCharts from '../charts/TheCharts'
  import PeopleData from '../data/PeopleData'
  import MapChart from '../charts/MapChart'
  import AppInstructions from '../usability/AppInstructions'

  export default {
    name: 'TheTabs',

    components: {
      TheCharts,
      PeopleData,
      MapChart,
      AppInstructions,
    },

    computed: {
      getActiveTabId: { // Manages the active tab to navigate to depending on the URL
        get () {
          switch (this.$route.name) {
            case 'charts':
              return 'charts'
            case 'map':
              return 'map'
            case 'instructions':
              return 'instructions'
            default:
              return 'people-data'
          }
        },

        set (name) {
          this.$router.push(`/${name === 'people-data' ? '' : name}`)
        },
      },
    },
  }
</script>

<style scoped>
  #the-tabs {
    margin-top: 2em;
    margin-bottom: 36px !important;
    color: #2c3e50 !important;
  }
</style>
