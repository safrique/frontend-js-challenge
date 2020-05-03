export default {
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

  getBracketsSummary (data, category) {
    let summary = {}

    for (let item in data) {
      if (data.hasOwnProperty(item)) {
        let bracket = (category === `age` ? this.getNumberItemBracket(item) : item)
        // console.log(`item=${item} -- data=${data[item]} -- bracket:${bracket} -- summary`, summary)

        if (summary.hasOwnProperty(bracket)) {
          summary[bracket] += data[item]
          // console.log(`summary after updating:`, summary)
          continue
        }

        summary[bracket] = data[item]
        // console.log(`summary after insert:`, summary)
      }
    }

    // console.log(`item summary:`, summary)
    return summary
  },

  getNumberItemBracket (item) {
    item = parseInt(item)
    let from_age = (Math.trunc(item / 10) * 10).toString()
    let to_age = ((Math.trunc(item / 10) + 1) * 10 - 1).toString()
    return from_age + ` to ` + to_age
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