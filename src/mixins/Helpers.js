export default {
  getAgeSummary (peopleData) {
    // console.log(`getting age summary data from Helpers...`)
    return this.getPeoplePropertyData(peopleData, `age`)
  },

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

  getAgeBracketsSummary (data) {
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

  buildPersonAttributes (people) {
    let
      data = [],
      nested = [`preferences`, `location`],
      exclude = [`_id`, `name`, `longitude`, `latitude`,],
      person = people[0]

    for (let item in person) {
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
}
