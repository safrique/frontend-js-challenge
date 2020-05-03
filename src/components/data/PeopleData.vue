<template>
  <div class="people-data">
    <h1>People Data</h1>

    <el-table
      :data="getPeopleData"
      style="width: 100%">
            <el-table-column
              prop="_id"
              label="ID"
              width="250">
            </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="200">
      </el-table-column>
      <el-table-column
        prop="age"
        label="Age"
        width="50">
      </el-table-column>
      <el-table-column
        prop="eyeColor"
        label="Eye Color"
        width="90">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="Gender"
        width="75">
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
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'PeopleData',

    computed: {
      getPeopleData () {
        let data = this.getPeople()
        console.log(`getPeopleData:`, data)
        return data
      }
    },
  }
</script>

<style scoped>

</style>
