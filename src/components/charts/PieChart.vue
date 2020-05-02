<template>
  <div id="pie-chart">
    <div id="pie-chart-render" style="width: 100%; height: 400px;"></div>

    <!--    <ol>-->
    <!--      <li-->
    <!--        v-for="person in getPeopleData"-->
    <!--        :key="person._id"-->
    <!--      >-->
    <!--        {{ person.name }}-->
    <!--      </li>-->
    <!--    </ol>-->

    <ol>
      <li
        v-for="(value, name) in getPeopleAgeSummary"
      >
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
        return this.summariseAges(this.getPeoplePropertyData(this.people.people, `age`))
      },
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

      summariseAges (data) {
        let summary = {}
        for (let age in data) {
          if (data.hasOwnProperty(age)) {
            let bracket = (parseInt((parseInt(age) / 10)) * 10).toString() + ` to `
              + ((parseInt(((parseInt(age) / 10)) + 1) * 10) - 1).toString()
            // console.log(`bracket:${bracket}`)

            if (summary.hasOwnProperty(bracket)) {
              summary[bracket]++
              continue
            }

            summary[bracket] = 1
          }
        }

        console.log(`age summary:`, summary)
        return summary
      },

      makePieChart (type) {
        let obj = this.getPeopleAgeSummary
        console.log(`obj length=${Object.keys(obj).length}`, obj)

        if (Object.keys(obj).length >0) {
          return this.buildChart(obj)
        }

        setTimeout(() => { return this.buildChart(this.getPeopleAgeSummary) }, 5000)

        // return AmCharts.makeChart('pie-chart-render',
        //   {
        //     'type': 'pie',
        //     'titleField': 'category',
        //     'valueField': 'column-1',
        //     'dataProvider': [
        //       {
        //         'category': 'category 1',
        //         'column-1': 8
        //       },
        //       {
        //         'category': 'category 2',
        //         'column-1': 6
        //       },
        //       {
        //         'category': 'category 3',
        //         'column-1': 2
        //       }
        //     ]
        //   }
        // )
      },

      buildChart (obj) {
        let data = []
        console.log(`buildChart obj length=${Object.keys(obj).length}`, obj)

        for (let group in obj) {
          // if (obj.hasOwnProperty(group)) {
          let new_obj = {
            'category': group,
            'value': obj[group],
          }
          console.log(`new_obj`, new_obj)
          data.push(new_obj)
          // }
        }
        console.log(`age data:`, data)

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
      this.makePieChart(`age`)
      this.displayData()
    },
  }
</script>

<style scoped>

</style>
