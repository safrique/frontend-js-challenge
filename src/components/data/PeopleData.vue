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
        label="Eye Colour"
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

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form._id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Age" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Eye Colour" :label-width="formLabelWidth">
          <el-input v-model="form.eyeColor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pet" :label-width="formLabelWidth">
          <el-input v-model="form.preferences.pet" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Fruit" :label-width="formLabelWidth">
          <el-input v-model="form.preferences.fruit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Longitude" :label-width="formLabelWidth">
          <el-input v-model="form.location.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Latitude" :label-width="formLabelWidth">
          <el-input v-model="form.location.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="confirmEdit">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PeopleData',

    data () {
      return {
        search: ``,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        index: '',

        form: {
          name: '',
          id: '',
          age: '',
          eyeColor: '',
          gender: '',
          preferences: {
            pet: '',
            fruit: '',
          },
          location: {
            longitude: '',
            latitude: '',
          },
        },
      }
    },

    computed: {
      getPeopleData () { return this.getPeople() }
    },

    methods: {
      handleEdit (index, row) {
        this.index = index
        // console.log(index, row)
        this.updateForm(row)
        this.dialogFormVisible = true
      },

      handleDelete (index, row) {
        console.log(index, row)
      },

      confirmEdit () {
        // console.log(`updated form data for index=${this.index}...`)
        // console.log(`index=${this.index} -- this.form:`, this.form)
        this.updateStore(this.form)
        console.log(`emitting updatedSummaryData event from child PeopleData...`)
        this.$emit(`updatedSummaryData`)
        console.log(`emitted updatedSummaryData event from child PeopleData...`)
        // console.log(`getPeopleData:`, this.getPeopleData)
        this.dialogFormVisible = false
      },

      updateForm (row) {
        this.form = row
      },
    }
    ,
  }
</script>

<style scoped>

</style>
