<template>
  <div class="suade_logo">
    <a href="https://suade.org" target="_blank" id="suade-logo-link">
      <img src="../../assets/img/suade_logo_circle_solid_red.svg" alt="Suade logo" height="55">
      <span id="suade-link">SUADE</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'SuadeLogo'
  }
</script>

<style scoped>
  .suade_logo, #suade-logo-link {
    text-align: left;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding-left: 0.5em;
  }

  #suade-link {
    padding-left: 13px;
    font-weight: bold;
    letter-spacing: 0.15em;
  }
</style>
