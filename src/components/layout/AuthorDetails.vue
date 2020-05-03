<template>
  <div class="author-details">
    <TheAuthor></TheAuthor>
    <GithubDetails></GithubDetails>
  </div>
</template>

<script>
  import GithubDetails from './GithubDetails'
  import TheAuthor from './TheAuthor'

  export default {
    name: 'AuthorDetails',

    components: {
      GithubDetails,
      TheAuthor,
    },
  }
</script>

<style scoped>
  .github-details {
    margin-left: 1em;
  }
</style>
