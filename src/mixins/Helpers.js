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

    console.log(`age summary:`, summary)
    return summary
  }
}
