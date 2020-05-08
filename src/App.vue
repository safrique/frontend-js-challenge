<template>
  <div id="app">
    <SuadeLogo></SuadeLogo>
    <ProjectDetails></ProjectDetails>
    <AuthorDetails></AuthorDetails>
    <TheTabs></TheTabs>
  </div>
</template>

<script>
  import AuthorDetails from './components/layout/AuthorDetails'
  import TheTabs from './components/layout/TheTabs'
  import ProjectDetails from './components/layout/ProjectDetails'
  import SuadeLogo from './components/layout/SuadeLogo'

  export default {
    name: 'app',

    components: {
      AuthorDetails,
      TheTabs,
      ProjectDetails,
      SuadeLogo,
    },
  }
</script>

<style lang="scss">
  /* import Element UI CSS */
  /* importing this here as the damn url-loader for the ttf file wouldn't work for importing in main.js */
  @import url('https://unpkg.com/element-ui/lib/theme-chalk/index.css');

  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 36px;
  }

  body {
    background-image: url('./assets/img/suade-bkg.png');
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }

  li {
    text-align: left !important;
    margin-left: 10em !important;
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
    border: 3px solid #e42c2a;
  }
</style>
