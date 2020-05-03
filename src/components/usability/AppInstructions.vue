<template>
  <div class="app-instructions">
    <h1>App Instructions</h1>
    <TheInstructions></TheInstructions>
    <hr>
    <VueLinks></VueLinks>
  </div>
</template>

<script>
  import VueLinks from '../vue-eco/VueLinks'
  import TheInstructions from './TheInstructions'

  export default {
    name: 'AppInstructions',

    components: {
      VueLinks,
      TheInstructions,
    }
  }
</script>

<style scoped>

</style>
