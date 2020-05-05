<template>
  <div class="people-data">
    <h1>People Data</h1>

    <el-table
      :data="getPeopleData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="500">
      <el-table-column
        prop="name"
        label="Name"
        width="200"
        sortable
        fixed>
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="250">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        :prop="$index"-->
      <!--        label="#"-->
      <!--        width="50">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="age"
        label="Age"
        width="50"
        sortable>
      </el-table-column>
      <el-table-column
        prop="eyeColor"
        label="Eye Colour"
        width="100"
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
        align="center">
        <template
          slot="header"
          slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type a name to search"/>
          <el-button
            type="primary"
            round
            plain
            @click="handleAddPerson"
            icon="el-icon-circle-plus-outline"
            style="padding: 0.5em; margin-top: 1em;">
            Add Person
          </el-button>
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
        prankPlayed: false,
        prankText: `Sorry, you don't have access to this functionality! Please upgrade your subscription to have access to this!`,

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
        // console.log(index, row)
        this.updateForm(row)
        this.dialogFormVisible = true
      },

      handleDelete (index, row) {
        this.confirmChange(true, row, index)
      },

      confirmEdit () {
        this.confirmChange()
      },

      confirmChange (delete_person = false, person = null, index = null) {
        try {
          let action = (delete_person ? `Delete` : `Edit`)

          this.$confirm(`This will permanently ${action.toLowerCase()} the person's details. Continue?`,
            'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
              center: true
            })
            .then((action) => {
              if (action === `confirm`) {
                if (delete_person) {
                  this.getPeopleData.splice(index, 1)
                  // the splice above should take care of deleting the person from the store, but let's make sure...
                  this.DeleteStoreData(person)
                } else {
                  this.editPersonStoreData(this.form)
                }

                this.$message({ type: 'success', center: true, message: `${action} completed` })
              } else { this.$message({ type: 'info', center: true, message: `${action} canceled` }) }
            })
            .catch((e) => {
              console.log(`error on ${action.toLowerCase()}...`, e)
              this.$message({ type: 'info', center: true, message: `${action} canceled` })
            })
            .finally(() => {
              if (!delete_person) {this.dialogFormVisible = false}
              this.$emit(`updatedSummaryData`)
            })
        } catch (e) {
          console.log(`${this.$options.name} confirmChange error...`, e)
        }
      },

      updateForm (row) {
        try {
          for (let item in row) {
            if (row.hasOwnProperty(item)) {
              // console.log(`item=${item} -- row[item]=`, row[item])
              this.form[item] = row[item]
              // console.log(`item=${item} -- row[item]=`, this.form[item])
            }
          }
        } catch (e) {
          console.log(`${this.$options.name} updateForm error...`, e)
        }
      },

      handleAddPerson () {
        console.log(`add button clicked...`)
        this.runPrank()
      },

      runPrank () {
        try {
          if (!this.prankPlayed) {
            this.$alert(this.prankText, 'Unauthorised!!', {
              confirmButtonText: 'OK',
              center: true,
              type: `error`,
              // iconClass: `el-icon-bank-card`,
              callback: action => {
                this.$message({ type: 'info', center: true, message: `You've ${action}ed lack of authorisation` })
                setTimeout(() => {
                  this.$alert(`Just kidding... You have full access :)`, 'Authorised!!', {
                    confirmButtonText: 'OK',
                    center: true,
                    type: `success`,
                    callback: () => {
                      this.prankPlayed = true
                      this.$message({ type: 'success', center: true, message: `Prank completed :)` })
                    }
                  })
                }, 3000)
              }
            })
          } else {
            this.$message({
              type: 'success',
              center: true,
              message: `Prank already played - refresh page to see it again... :)`
            })
            this.addPerson()
          }
        } catch (e) {
          console.log(`${this.$options.name} runPrank error...`, e)
        }
      },

      addPerson () {
        try {
          this.$message({ type: 'success', center: true, message: `Person added` })
        } catch (e) {
          console.log(`${this.$options.name} addPerson error...`, e)
        }
      },
    }
    ,
  }
</script>

<style scoped>

</style>
