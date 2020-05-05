<template>
  <div id="the-tabs">
    <el-tabs v-model="getActiveTabId" type="border-card">
      <el-tab-pane
        name="people-data"
        :lazy="true">
        <span slot="label"><i class="el-icon-s-grid"></i> Table</span>
        <PeopleData @updatedSummaryData="emitUpdatedEvent"></PeopleData>
      </el-tab-pane>

      <el-tab-pane
        name="charts"
        :lazy="true">
        <span slot="label"><i class="el-icon-pie-chart"></i> Charts</span>
        <TheCharts ref="charts"></TheCharts>
      </el-tab-pane>

      <el-tab-pane
        name="map"
        :lazy="true">
        <span slot="label"><i class="el-icon-location-outline"></i> Map</span>
        <MapChart ref="map"></MapChart>
      </el-tab-pane>

      <el-tab-pane
        name="instructions"
        :lazy="true">
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

    methods: {
      emitUpdatedEvent () {
        // console.log(`emitting updated-summary-data event from parent TheTabs...`)
        // TODO: Check if this $emit is needed...
        // this.$emit(`updatedSummaryData`)
        // console.log(`TheTabs refs:`, this.$refs)
        if (this.$refs.charts) {
          this.$refs.charts.updateData()
        }
        if (this.$refs.map) {
          // console.log(`triggering map update...`)
          this.$refs.map.makeMap(true)
        } // else { console.log(`this.$refs.charts not yet registered...`) }
        // console.log(`emitted updated-summary-data event from parent TheTabs...`)
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
