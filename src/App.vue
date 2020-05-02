<template>
  <div id="app">
    <img class="spin" id="suade-img" src="./assets/img/suade.png">
    <h1>{{ msg }}</h1>
    <h3>{{ purpose }}</h3>
    <span>
      {{ created_by }}
      <a href="http://safrique.uk" target="_blank">{{ author }}
        <img class="pulse" src="./assets/img/sfq-full.png" height="13"/>
      </a>
    </span>
    <span>
      See this project on
      <a href="http://github.com/safrique/frontend-js-challenge" target="_blank">
        GitHub <img class="rotate" src="./assets/img/GitHub-Mark-32px.png" height="13"/>
      </a>
    </span>

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

  .rotate {
    animation: rotation 3s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .pulse {
    animation: pulse 2s infinite;
    margin: 50px auto 0;
    animation-direction: alternate;
    -webkit-animation-name: pulse;
    animation-name: pulse;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.5);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .spin {
    border-radius: 75%;
    -webkit-transition: -webkit-transform .8s ease-in-out;
    transition: transform .8s ease-in-out;
  }

  .spin:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }

  #suade-img {
    /*padding: 3px;*/
    border: 3px solid #e42c2a;
    /*background-color: darkblue;*/
  }
</style>
