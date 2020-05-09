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
          try {
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
          } catch (e) {
            console.log(`${this.$options.name} getActiveTabId.get() error...`, e)
            return false
          }
        },

        set (name) {
          try {
            this.$router.push(`/${name === 'people-data' ? '' : name}`)
          } catch (e) {
            console.log(`${this.$options.name} getActiveTabId.set() error...`, e)
            return false
          }
        },
      },
    },

    methods: {
      emitUpdatedEvent () {
        try {
          if (this.$refs.charts) {
            this.$refs.charts.updateData()
          }
          if (this.$refs.map) {
            this.$refs.map.makeMap(true)
          }
        } catch (e) {
          console.log(`${this.$options.name} emitUpdatedEvent error...`, e)
          return false
        }
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
