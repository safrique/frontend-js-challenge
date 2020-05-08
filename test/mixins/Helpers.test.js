import Helpers from '../../src/mixins/Helpers'
import data from '../../src/assets/docs/people-data.json'

const
  category = `age`,
  ageData = {
    '20': 3,
    '21': 2,
    '23': 2,
    '24': 4,
    '25': 1,
    '26': 3,
    '27': 3,
    '28': 3,
    '29': 1,
    '30': 2,
    '31': 3,
    '33': 2,
    '34': 5,
    '35': 1,
    '36': 3,
    '37': 2,
    '38': 1,
    '39': 5,
    '40': 4
  },
  ageSummary = { '20 to 29': 22, '30 to 39': 24, '40 to 49': 4 }

describe(`Helpers`, () => {
  it(`checks getPeoplePropertyData returns the correct ${category} data`, () => {
    expect(Helpers.getPeoplePropertyData(data, category)).toEqual(ageData)
  })

  it(`checks getBracketsSummary returns the correct ${category} interval data`, () => {
    expect(Helpers.getBracketsSummary(ageData, category)).toEqual(ageSummary)
  })

  it(`checks getNumberItemBracket returns the correct interval`, () => {
    expect(Helpers.getNumberItemBracket(23)).toBe(`20 to 29`)
  })

  it(`checks generateRandomString returns the correct length random string`, () => {
    expect(Helpers.generateRandomString(13).length).toBe(13)
  })

  it(`checks generateRandomString returns a string`, () => {
    expect(typeof Helpers.generateRandomString(13)).toBe(`string`)
  })
})
