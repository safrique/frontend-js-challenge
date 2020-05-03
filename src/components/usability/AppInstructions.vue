<template>
  <div class="app-instructions">
    <h1>App Instructions</h1>
    <TheInstructions></TheInstructions>
<!--    <DownloadInstructions></DownloadInstructions>-->
    <hr>
    <VueLinks></VueLinks>
  </div>
</template>

<script>
  import VueLinks from '../vue-eco/VueLinks'
  import TheInstructions from './TheInstructions'
  import DownloadInstructions from './DownloadInstructions'

  export default {
    name: 'AppInstructions',

    components: {
      VueLinks,
      TheInstructions,
      DownloadInstructions,
    }
  }
</script>

<style scoped>

</style>
