import PeopleData from '../components/data/PeopleData'
import TheCharts from '../components/charts/TheCharts'
import MapChart from '../components/charts/MapChart'
import AppInstructions from '../components/usability/AppInstructions'

export default [
  //  People Data - data table
  {
    path: '/',
    name: 'people-data',
    component: PeopleData,
  },

  //  The Charts
  {
    path: '/charts',
    name: 'charts',
    component: TheCharts,
  },

  //  The Map
  {
    path: '/map',
    name: 'map',
    component: MapChart,
  },

  //  App Instructions
  {
    path: '/instructions',
    name: 'instructions',
    component: AppInstructions,
  },
]
