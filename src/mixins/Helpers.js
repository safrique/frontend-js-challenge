export default {
  getPeoplePropertyData (people, category) {
    let data = {}
    try {
      let preferences = [`pet`, `fruit`]
      let nested = []
      let nested_category

      if (preferences.includes(category)) {
        for (let i = 0, j = preferences.length; i < j; i++) { nested.push(preferences[i]) }
        nested_category = `preferences`
      }

      for (let person in people) {
        if (people.hasOwnProperty(person)) {
          if (nested.includes(category)) {
            if (data.hasOwnProperty(people[person][nested_category][category])) {
              data[people[person][nested_category][category]]++
              continue
            }

            data[people[person][nested_category][category]] = 1
          } else {
            if (data.hasOwnProperty(people[person][category])) {
              data[people[person][category]]++
              continue
            }

            data[people[person][category]] = 1
          }
        }
      }
    } catch (e) {
      console.log(`Helpers getPeoplePropertyData error...`, e)
    }

    return data
  },

  getBracketsSummary (data, category) {
    let summary = {}

    try {
      for (let item in data) {
        if (data.hasOwnProperty(item)) {
          let bracket = (category === `age` ? this.getNumberItemBracket(item) : item)

          if (summary.hasOwnProperty(bracket)) {
            summary[bracket] += data[item]
            continue
          }

          summary[bracket] = data[item]
        }
      }
    } catch (e) {
      console.log(`Helpers getBracketsSummary error...`, e)
    }

    return summary
  },

  getNumberItemBracket (item) {
    try {
      item = parseInt(item)
      let from_age = (Math.trunc(item / 10) * 10).toString()
      let to_age = ((Math.trunc(item / 10) + 1) * 10 - 1).toString()
      return from_age + ` to ` + to_age
    } catch (e) {
      console.log(`Helpers getNumberItemBracket error...`, e)
      return false
    }
  },

  buildPersonAttributes (people) {
    let
      data = [],
      nested = [`preferences`, `location`],
      exclude = [`_id`, `name`, `longitude`, `latitude`,],
      person = people[0]

    try {
      for (let item in person) {
        if (person.hasOwnProperty(item)) {
          if (nested.includes(item)) {
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
    } catch (e) {
      console.log(`Helpers buildPersonAttributes error...`, e)
    }

    return data
  },

  generateRandomString (len) {
    try {
      let s = ''
      while (s.length < len) s += Math.random().toString(36).substr(2, len - s.length)
      return s
    } catch (e) {
      console.log(`Helpers buildPersonAttributes error...`, e)
      return false
    }
  }
}
