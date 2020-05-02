<template>
  <div id="app">
    <img src="./assets/img/suade.png">
    <h1>{{ msg }}</h1>
    <h3>{{ purpose }}</h3>
    <h4>
      {{ created_by }}
      <a href="http://safrique.uk" target="_blank">{{ author }} <img src="./assets/img/sfq-full.png" height="13"/></a>
    </h4>
    <h5>
      See this project on
      <a href="http://github.com/safrique/frontend-js-challenge" target="_blank">
        GitHub <img src="./assets/img/GitHub-Mark-32px.png" height="13"/>
      </a>
    </h5>

    <hr>
    <TheCharts></TheCharts>

    <hr>
    <PeopleData></PeopleData>

    <hr>
    <VueLinks></VueLinks>
  </div>
</template>

<script>
  import TheCharts from './components/charts/TheCharts'
  import PeopleData from './components/data/PeopleData'
  import VueLinks from './components/vue-eco/VueLinks'

  export default {
    name: 'app',

    data () {
      return {
        msg: 'Data Visualisation Dashboard',
        purpose: `Frontend JavaScript Challenge`,
        created_by: `Created by `,
        author: `Josef van Niekerk`,
      }
    },

    components: {
      TheCharts,
      PeopleData,
      VueLinks,
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
