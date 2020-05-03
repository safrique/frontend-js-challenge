<template>
  <div id="pie-chart">
    Select a category to display:
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div :loading="loading" id="pie-chart-render" style="width: 100%; height: 400px;"></div>

    <!--    <div v-if="loading"><i class="el-icon-loading"></i> Loading ...</div>-->
    <!--    <div v-else :loading="loading" id="pie-chart-render" style="width: 100%; height: 400px;"></div>-->

    <!--    <ol>-->
    <!--      <li-->
    <!--        v-for="person in getPeopleData"-->
    <!--        :key="person._id"-->
    <!--      >-->
    <!--        {{ person.name }}-->
    <!--      </li>-->
    <!--    </ol>-->

    <!--    <div>loading:{{ loading }}</div>-->

    <ol>
      <li v-for="(value, name) in getPeopleAgeSummary">
        ages {{ name }} = {{ value }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'PieChart',

    computed: {
      getPeopleData () {
        return this.people.people
      },

      getPeopleAgeSummary () {
        if (Object.keys(this.getPeopleData).length === 0) { return [] }
        return this.summariseAges(this.getPeoplePropertyData(this.getPeopleData, `age`))
      },

      loading () {
        if (Object.keys(this.getPeopleData).length === 0) {
          return false
        }

        this.options = this.buildPersonAttributes(this.getPeopleData)

        this.makePieChart(`age`)
        return true
      },

      getPersonAttributes () {
        this.buildPersonAttributes(this.getPeopleData)
      },
    },

    data () {
      return {
        options: [],
        value: ''
      }
    },

    methods: {
      getPeoplePropertyData (people, category) {
        let data = {}

        for (let person in people) {
          if (people.hasOwnProperty(person)) {
            // console.log(`person:${person} -- data`, people[person])
            // console.log(`${category}:${people[person][category]} -- type=${typeof people[person][category]}`)

            if (data.hasOwnProperty(people[person][category])) {
              data[people[person][category]]++
              continue
            }

            data[people[person][category]] = 1
          }
        }

        // console.log(`data:`, data)
        return data
      },

      buildPersonAttributes (people) {
        let data = []
        let nested = [
          `preferences`,
          `location`
        ]
        let exclude = [
          `_id`,
          `name`,
          `longitude`,
          `latitude`,
        ]
        let person = people[0]
        // console.log(`--- person:`, person)

        for (let item in person) {
          let val
          if (person.hasOwnProperty(item)) {
            if (nested.includes(item)) {
              // console.log(`item ${item} is nested`)
              for (let sub_item in person[item]) {
                if (person[item].hasOwnProperty(sub_item)) {
                  // console.log(`sub_item ${sub_item} in person[item]=${person[item][sub_item]}`)
                  if (!exclude.includes(sub_item)) {
                    // console.log(`sub_item=${sub_item} included`)
                    data.push({
                      value: sub_item,
                      label: sub_item
                    })
                    // continue
                  }
                  // console.log(`sub_item=${sub_item} excluded`)
                }
              }
            } else {
              // console.log(`item ${item} in person=${person[item]}`)
              if (!exclude.includes(item)) {
                // console.log(`item=${item} included`)
                data.push({
                  value: item,
                  label: item
                })
                // continue
              }
              // console.log(`item=${item} excluded`)
            }
          }
        }

        // console.log(`data:`, data)
        return data
      },

      summariseAges (data) {
        let summary = {}

        for (let age in data) {
          if (data.hasOwnProperty(age)) {
            age = parseInt(age)
            let from_age = (Math.trunc(age / 10) * 10).toString()
            let to_age = ((Math.trunc(age / 10) + 1) * 10 - 1).toString()
            let bracket = from_age + ` to ` + to_age
            // console.log(`age=${age} -- data=${data[age]} -- bracket:${bracket} -- summary`, summary)

            if (summary.hasOwnProperty(bracket)) {
              summary[bracket] += data[age]
              // console.log(`summary after updating:`, summary)
              continue
            }

            summary[bracket] = data[age]
            // console.log(`summary after insert:`, summary)
          }
        }

        // console.log(`age summary:`, summary)
        return summary
      },

      makePieChart (type) {
        return this.buildChart(this.getPeopleAgeSummary)
      },

      buildChart (obj) {
        let data = []
        // console.log(`buildChart obj length=${Object.keys(obj).length}`, obj)

        for (let group in obj) {
          if (obj.hasOwnProperty(group)) {
            let new_obj = {
              'category': group,
              'value': obj[group],
            }
            // console.log(`new_obj`, new_obj)
            data.push(new_obj)
          }
        }
        // console.log(`age data:`, data)

        return AmCharts.makeChart('pie-chart-render',
          {
            'type': 'pie',
            'titleField': 'category',
            'valueField': 'value',
            'dataProvider': data
          }
        )
      },

      displayData () {
        // console.log(`pie chart data`, this.getPeopleData)
        console.log(`age data`, this.getPeopleAgeSummary)
      },
    },

    created () {
      // this.makePieChart(`age`)
      // this.displayData()
    },
  }
</script>

<style scoped>

</style>
