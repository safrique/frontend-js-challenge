<template>
  <div class="people-data">
    <h1>People Data</h1>

    <el-table
      :data="getPeopleData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="500">
      <el-table-column
        prop="_id"
        label="ID"
        width="250"
        fixed>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="200"
        sortable
        fixed>
      </el-table-column>
      <el-table-column
        prop="age"
        label="Age"
        width="50"
        sortable>
      </el-table-column>
      <el-table-column
        prop="eyeColor"
        label="Eye Color"
        width="90"
        sortable>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="Gender"
        width="75"
        sortable>
      </el-table-column>
      <el-table-column label="Preferences">
        <el-table-column
          prop="preferences[pet]"
          label="Pet"
          width="120">
        </el-table-column>
        <el-table-column
          prop="preferences[fruit]"
          label="Fruit"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="Location">
        <el-table-column
          prop="location[longitude]"
          label="Longitude"
          width="120">
        </el-table-column>
        <el-table-column
          prop="location[latitude]"
          label="Latitude"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type a name to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'PeopleData',

    data () {
      return {
        search: ``
      }
    },

    computed: {
      getPeopleData () {
        // let data = this.getPeople()
        // console.log(`getPeopleData:`, data)
        // return data
        return this.getPeople()
      }
    },

    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    },
  }
</script>

<style scoped>

</style>
