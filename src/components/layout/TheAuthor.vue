<template>
    <span class="the-author">
      {{ created_by }}
      <a href="http://safrique.uk" target="_blank">
        {{ author }} <img class="pulse" src="../../assets/img/sfq-full.png" height="13" alt="safrique logo"/>
      </a>
    </span>
</template>

<script>
  export default {
    name: 'TheAuthor',

    data () {
      return {
        created_by: `Created by `,
        author: `Josef van Niekerk`,
      }
    },
  }
</script>

<style scoped>
  .pulse {
    margin-left: 0.5em;
  }
</style>
