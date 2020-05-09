<template>
  <div class="app-instructions">
    <h1>App Instructions</h1>

    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <el-tooltip
            class="item"
            effect="dark"
            content="Click here to see Instructions"
            placement="right-start">
            <h2><i class="el-icon-notebook-1 header-icon"></i> Instructions</h2>
          </el-tooltip>
        </template>
        <h3>You are here <i class="el-icon-location"></i></h3>
        <div>Open each tab below for instructions on functionality to be found on each tab above.</div>
        <div>Each tab above can be navigated to by clicking on the tab or adding /charts, /map or /instructions to the
          end of the URL. The default tab is the Table tab.</div>
      </el-collapse-item>
      <el-collapse-item title="Table" name="2">
        <template slot="title">
          <el-tooltip
            class="item"
            effect="dark"
            content="Click here to see the Table instructions"
            placement="right-start">
            <h2><i class="el-icon-s-grid header-icon"></i> Table</h2>
          </el-tooltip>
        </template>
        <div>The people data from the Suade Labs
          <el-link type="success" href="https://updates.suade.org/files/people.json" target="_blank">test data</el-link>
          endpoint is listed in a data table. Note that if this endpoint is not available, a back-up copy of the data
          stored locally will be used.
        </div>
        <el-row :gutter="12">
          <el-col :span="23">
            <el-card class="box-card">
              <h3>Table layout & functionality</h3>
              <ul>
                <li v-for="line in this.tableLayout" class="text item">
                  {{ line }}
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Charts" name="3">
        <template slot="title">
          <el-tooltip
            class="item"
            effect="dark"
            content="Click here to see the Charts instructions"
            placement="right-start">
            <h2><i class="el-icon-pie-chart header-icon"></i> Charts</h2>
          </el-tooltip>
        </template>
        <div>A pie chart and bar chart display the data from the data table under the Table tab.</div>
        <el-row :gutter="12">
          <el-col :span="23">
            <el-card class="box-card">
              <h3>Charts layout & functionality</h3>
              <ul>
                <li v-for="line in this.chartsLayout" class="text item">
                  {{ line }}
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Map" name="4">
        <template slot="title">
          <el-tooltip
            class="item"
            effect="dark"
            content="Click here to see the Map instructions"
            placement="right-start">
            <h2><i class="el-icon-location-outline header-icon"></i> Map</h2>
          </el-tooltip>
        </template>
        <div>A world map shows the location of each person from the data table under the Table tab.</div>
        <el-row :gutter="12">
          <el-col :span="23">
            <el-card class="box-card">
              <h3>Charts layout & functionality</h3>
              <ul>
                <li v-for="line in this.chartsLayout" class="text item">
                  {{ line }}
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'AppInstructions',

    data () {
      return {
        currentOpenTab: `1`,
        activeNames: [(this.currentOpenTab ? this.currentOpenTab.toString() : '1')],
        tableLayout: [
          `Each person's details are listed in the table, including their name, ID, age etc.`,
          `Buttons to the right of the data are for editing and deleting a particular person's details.`,
          `In the header row above the edit and delete buttons is a search box for searching for a person by name and `
          + `below that is a button to add a new person's details.`,
          `The far left column of the table has checkboxes to select multiple people. This is for deleting multiple `
          + `people at the same time by clicking the "Delete selected" button at the top left of the table.`,
          `The following columns can be sorted by, either ascending, descending or by the default order the data came `
          + `in at: Name, Age, Eye Colour and Gender.`,
          `The following columns can be filtered by: Pet and Fruit preferences. Note that adding a new type of pet or `
          + `fruit when adding or editing a person will add this new item to the filter too.`,
        ],
        chartsLayout: [
          `By default, the age summary is displayed. This can be changed by selecting a different data item from the `
          + `dropdown list above the pie chart. Changing this selection will change the contents of both charts.`,
          `Below each chart is a data table displaying the summary data for the chart immediately above it. Changes to `
          + `the chart data items will change the data in these tables too.`,
          `Editing, adding or deleting data from the data table under the Table tab will change the display of these `
          + `charts too.`,
        ],
        mapLayout: [
          `A bullet with each person's name is shown on the map. Hovering over the person's name will display the `
          + `details of the person as per the data table.`,
          `Editing, adding or deleting data from the data table under the Table tab will change the display of the  map too.`
        ],
      }
    },

    methods: {
      handleChange (val) {
        this.currentOpenTab = val
      }
    }
  }
</script>

<style scoped>
  .app-instructions {
    text-align: left;
  }

  h1 {
    text-align: center;
  }

  .el-icon-location {
    color: red;
  }

  .header-icon {
    color: #649bd1;
  }

  li {
    margin-left: 0 !important;
  }

  .box-card {
    margin-top: 1em;
  }
</style>
