<template>
  <div class="people-data">
    <h1>People Data</h1>

    <div id="delete_button">
      <el-button type="warning" plain @click="deleteSelectedPeople()">Delete selected</el-button>
    </div>

    <el-table
      :data="getPeopleData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="500"
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="190"
        sortable
        fixed>
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        align="center"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="220">
      </el-table-column>
      <el-table-column
        prop="age"
        label="Age"
        align="center"
        width="50"
        sortable>
      </el-table-column>
      <el-table-column
        prop="eyeColor"
        label="Eye Colour"
        align="center"
        width="100"
        sortable>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="Gender"
        align="center"
        width="75"
        sortable>
      </el-table-column>
      <el-table-column
        label="Preferences"
        align="center">
        <el-table-column
          prop="preferences[pet]"
          label="Pet"
          align="center"
          width="120"
          :filters="petFilters"
          :filter-method="filterItem"
          filter-placement="bottom-end">
        </el-table-column>
        <el-table-column
          prop="preferences[fruit]"
          label="Fruit"
          align="center"
          width="120"
          :filters="fruitFilters"
          :filter-method="filterItem"
          filter-placement="bottom-end">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="Location"
        align="center">
        <el-table-column
          prop="location[longitude]"
          label="Longitude"
          align="center"
          width="110">
        </el-table-column>
        <el-table-column
          prop="location[latitude]"
          label="Latitude"
          align="center"
          width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        width="160">
        <template
          slot="header"
          slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Search name"/>
          <el-button
            type="primary"
            round
            plain
            @click="handleAddPersonButtonClick"
            icon="el-icon-circle-plus-outline"
            style="padding: 0.5em; margin-top: 1em;">
            Add Person
          </el-button>
        </template>
        <template
          slot-scope="scope">
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

    <el-dialog title="Person data" :visible.sync="dialogFormVisible">
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
    <el-button type="primary" @click="handleEditConfirmClicked">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Helpers from '../../mixins/Helpers'

  export default {
    name: 'PeopleData',

    data () {
      return {
        search: ``,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        prankPlayed: false,
        prankText: `Sorry, you don't have access to this functionality! Please upgrade your subscription to have access to this!`,
        addingPerson: false,
        petFilters: [
          { text: 'bird', value: 'bird' },
          { text: 'cat', value: 'cat' },
          { text: 'none', value: 'none' },
          { text: 'dog', value: 'dog' },
        ],
        fruitFilters: [
          { text: 'apple', value: 'apple' },
          { text: 'strawberry', value: 'strawberry' },
          { text: 'banana', value: 'banana' },
          { text: 'mango', value: 'mango' },
        ],
        multipleSelection: [],
        form: {},
      }
    },

    computed: {
      getPeopleData () {
        try { return this.getPeople() } catch (e) {
          console.log(`${this.$options.name} getPeopleData error...`, e)
          return false
        }
      },
    },

    methods: {
      handleEdit (index, row) {
        // console.log(index, row)
        this.updateForm(row)
        this.dialogFormVisible = true
      },

      indexMethod (index) {
        return index
      },

      getFilterItemType (property) {
        return property.replace(`preferences[`, ``).replace(`]`, ``)
      },

      filterItem (value, row, column) {
        let item = this.getFilterItemType(column.property)
        // console.log(`value=${value} -- column.property: c.p.type=${typeof column.property} -- c.p.value=${column.property} -- item=${item}`)
        return row.preferences[item] === value
      },

      deleteSelectedPeople () {
        if (this.multipleSelection.length > 0) {
          // console.log(`multipleSelection`, this.multipleSelection)
          this.$confirm(`This will permanently the selected details. Continue?`,
            'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
              center: true
            })
            .then((clicked) => {
              if (clicked === `confirm`) {
                for (let person in this.multipleSelection) {
                  if (this.multipleSelection.hasOwnProperty(person)) {
                    // console.log(`selected person to delete...`, this.multipleSelection[person])
                    this.DeleteStoreData(this.multipleSelection[person])
                  }
                }

                this.$emit(`updatedSummaryData`)
                this.$message({ type: 'success', center: true, message: `details deleted` })
              } else { this.$message({ type: 'info', center: true, message: `delete canceled` }) }
            })
            .catch((e) => {
              if (e !== `cancel`) { console.log(`error on selection delete...`, e) }
              this.$message({ type: 'info', center: true, message: `delete canceled` })
            })
        } else {
          this.$message({ type: 'warning', center: true, message: `No selections made to delete` })
        }
      },

      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      resetForm () {
        try {
          this.form = {
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
          }
        } catch (e) {
          console.log(`${this.$options.name} resetForm error...`, e)
          return false
        }
      },

      handleDelete (index, row) {
        this.confirmChange(true, row, index)
      },

      confirmEdit () {
        this.confirmChange()
      },

      handleEditConfirmClicked () {
        if (this.addingPerson) {
          this.addNewPerson()
        } else { this.confirmEdit() }
      },

      confirmChange (deletePerson = false, person = null, index = null) {
        try {
          let action = (deletePerson ? `Delete` : `Edit`)
          let name = (person ? person.name : this.form.name)

          this.$confirm(`This will permanently ${action.toLowerCase()} the ${name}'s details. Continue?`,
            'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
              center: true
            })
            .then((clicked) => {
              if (clicked === `confirm`) {
                if (deletePerson) {
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
              if (e !== `cancel`) { console.log(`error on ${action.toLowerCase()}...`, e) }
              this.$message({ type: 'info', center: true, message: `${action} canceled` })
            })
            .finally(() => {
              if (!deletePerson) { this.dialogFormVisible = false }
              this.$emit(`updatedSummaryData`)
            })
        } catch (e) {
          console.log(`${this.$options.name} confirmChange error...`, e)
          return false
        }
      },

      updateForm (row) {
        try {
          this.resetForm()

          for (let item in row) {
            if (row.hasOwnProperty(item)) {
              // console.log(`item=${item} -- row[item]=`, row[item])
              this.form[item] = row[item]
              // console.log(`item=${item} -- row[item]=`, this.form[item])
            }
          }

          return true
        } catch (e) {
          console.log(`${this.$options.name} updateForm error...`, e)
          return false
        }
      },

      handleAddPersonButtonClick () {
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
            return true
          } else {
            this.$message({
              type: 'success',
              center: true,
              message: `Prank already played - refresh page to see it again... :)`
            })
            return this.handleAddNewPerson()
          }
        } catch (e) {
          console.log(`${this.$options.name} runPrank error...`, e)
          return false
        }
      },

      handleAddNewPerson () {
        try {
          this.resetForm()
          this.form._id = Helpers.generateRandomString(24)
          this.addingPerson = true
          this.dialogFormVisible = true
          return true
        } catch (e) {
          console.log(`${this.$options.name} handleAddNewPerson error...`, e)
          return false
        }
      },

      addNewPerson () {
        try {
          this.$confirm(`This will add a new person's details. Continue?`,
            'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
              center: true
            })
            .then((action) => {
              if (action === `confirm`) {
                this.people.people.push(this.form)
                this.$message({ type: 'success', center: true, message: `Adding new person completed` })
                return true
              } else { this.$message({ type: 'info', center: true, message: `Adding new person canceled` }) }
            })
            .catch((e) => {
              console.log(`error on adding new person}...`, e)
              this.$message({ type: 'info', center: true, message: `Adding new person canceled` })
            })
            .finally(() => {
              this.dialogFormVisible = false
              this.addingPerson = false
              this.$emit(`updatedSummaryData`)
            })
        } catch (e) {
          console.log(`${this.$options.name} handleAddNewPerson error...`, e)
          this.addingPerson = false
          return false
        }
      },
    },

    created () {
      this.resetForm()
    },
  }
</script>

<style scoped>
  #delete_button {
    margin-bottom: 0.5em;
    text-align: left !important;
  }
</style>
