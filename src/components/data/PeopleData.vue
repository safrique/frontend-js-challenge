<template>
  <div class="people-data">
    <h1>People Data</h1>

    <div id="delete_button">
      <el-tooltip
        class="item"
        effect="dark"
        content="Make a selection to delete" placement="top-start">
        <el-button type="warning" plain @click="deleteSelectedPeople()">Delete selected</el-button>
      </el-tooltip>
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
          <el-tooltip
            class="item"
            effect="dark"
            content="Start typing in here to search for a name"
            placement="top-start">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Search name"/>
          </el-tooltip>
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
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="demo-ruleForm">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form._id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Age" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Eye Colour" :label-width="formLabelWidth" prop="eyeColor">
          <el-input v-model="form.eyeColor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth" prop="gender">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pet" :label-width="formLabelWidth" prop="preferences.pet">
          <el-input v-model="form.preferences.pet" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Fruit" :label-width="formLabelWidth" prop="preferences.fruit">
          <el-input v-model="form.preferences.fruit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Longitude" :label-width="formLabelWidth" prop="location.longitude">
          <el-input v-model="form.location.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Latitude" :label-width="formLabelWidth" prop="location.latitude">
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
        rules: {
          name: [
            { type: 'string', required: true, message: 'Please enter a name', trigger: 'blur' },
            { min: 2, max: 100, message: 'Length should be 2 to 100', trigger: 'blur' }
          ],
          age: [
            {
              type: 'integer',
              min: 0,
              max: 100,
              message: 'Please enter a numeric type between 0 and 100',
              trigger: 'change'
            },
            { required: true, message: 'Please enter an age', trigger: 'blur' },
          ],
          eyeColor: [
            { type: 'string', required: true, message: 'Please enter an eye colour', trigger: 'blur' },
            { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' }
          ],
          gender: [
            { type: 'string', required: true, message: 'Please enter a gender', trigger: 'blur' },
            { min: 2, max: 10, message: 'Length should be 2 to 10', trigger: 'blur' }
          ],
          preferences: {
            pet: [
              { type: 'string', required: true, message: 'Please enter a pet', trigger: 'blur' },
              { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' }
            ],
            fruit: [
              { type: 'string', required: true, message: 'Please enter a fruit', trigger: 'blur' },
              { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' }
            ],
          },
          location: {
            longitude: [
              {
                type: 'number',
                min: -180,
                max: 180,
                required: true,
                message: 'Please enter a valid longitude between -180 and 180 degrees',
                trigger: 'blur'
              },
            ],
            latitude: [
              {
                type: 'number',
                min: -180,
                max: 180,
                required: true,
                message: 'Please enter a valid latitude between -180 and 180 degrees',
                trigger: 'blur'
              },
            ],
          },
        },
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

      // checks if a new pet or fruit was added on adding or editing a person then add it to the filters
      checkAddNewPreferences () {
        for (let person in this.getPeopleData) {
          if (this.getPeopleData.hasOwnProperty(person)) {
            for (let type in this.getPeopleData[person].preferences)
              if (this.getPeopleData[person].preferences.hasOwnProperty(type)) {
                if (!this.checkPreferenceExists(type, this.getPeopleData[person].preferences[type])) {
                  this.addNewPreferenceToFilter(type,
                    {
                      text: this.getPeopleData[person].preferences[type],
                      value: this.getPeopleData[person].preferences[type]
                    })
                }
              }
          }
        }
      },

      checkPreferenceExists (type, preference) {
        if (type === `pet`) {
          for (let item in this.petFilters) {
            if (this.petFilters.hasOwnProperty(item) && this.petFilters[item].text === preference) { return true }
          }
        }

        for (let item in this.fruitFilters) {
          if (this.fruitFilters.hasOwnProperty(item) && this.fruitFilters[item].text === preference) { return true }
        }

        return false
      },

      addNewPreferenceToFilter (type, typeToAdd) {
        if (type === `pet`) {
          this.petFilters.push(typeToAdd)
          return
        }
        this.fruitFilters.push(typeToAdd)
      },

      handleEdit (index, row) {
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
        return row.preferences[item] === value
      },

      deleteSelectedPeople () {
        if (this.multipleSelection.length > 0) {
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

      handleDelete (index, row) {
        this.confirmChange(true, row, index)
      },

      handleEditConfirmClicked () {
        this.$refs['form'].validate((valid) => {
          // console.log(`validate=${valid} -- name=${this.form.name} -- rules:`, this.rules.name)
          if (valid) {
            if (this.addingPerson) {
              this.addNewPerson()
            } else { this.confirmChange() }
          } else {
            this.$message({
              type: 'error',
              center: true,
              message: `Form validation failed. Please fix the validation errors before submitting`
            })
            return false
          }
        })
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

                this.checkAddNewPreferences()
                this.$message({ type: 'success', center: true, message: `${action} completed` })
              } else { this.$message({ type: 'info', center: true, message: `${action} canceled` }) }
            })
            .catch((e) => {
              if (e !== `cancel`) { console.log(`error on ${action.toLowerCase()}...`, e) }
              this.$message({ type: 'info', center: true, message: `${action} canceled` })
            })
            .finally(() => {
              if (!deletePerson) { this.dialogFormVisible = false }
              this.resetForm()
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
            if (row.hasOwnProperty(item)) { this.form[item] = row[item] }
          }

          return true
        } catch (e) {
          console.log(`${this.$options.name} updateForm error...`, e)
          return false
        }
      },

      handleAddPersonButtonClick () {
        // refresh the page and try add a new person from the button at the top of the data table to see what this does... ;)
        this.runPrank()
      },

      runPrank () {
        try {
          if (!this.prankPlayed) {
            this.$alert(this.prankText, 'Unauthorised!!', {
              confirmButtonText: 'OK',
              center: true,
              type: `error`,
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
              this.checkAddNewPreferences()
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
