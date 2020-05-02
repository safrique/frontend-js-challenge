import PeopleData from '../components/data/PeopleData'
import TheCharts from '../components/charts/TheCharts'

export default [
  //  People Data - data table
  {
    path: '/people',
    name: 'people-data',
    component: PeopleData,
  },

  //  The Charts
  {
    path: '/charts',
    name: 'charts',
    component: TheCharts,
  },
]
