<template>
  <div class="project-details">
    <img class="spin" id="suade-img" src="../../assets/img/suade.png" alt="Suade image">
    <h1>{{ heading }}</h1>
    <h3>{{ purpose }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'ProjectDetails',

    data () {
      return {
        heading: 'Data Visualisation Dashboard',
        purpose: `Frontend JavaScript Challenge`,
      }
    },
  }
</script>

<style scoped>

</style>
