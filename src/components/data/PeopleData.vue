<template>
  <div class="people-data">
    <h2>People Data</h2>
    <ol>
      <li
        v-for="person in getPeople.people"
        :key="person._id"
      >
        {{ person.name }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'PeopleData',

    computed: {
      getPeople () { return this.people }
    }
  }
</script>

<style scoped>
  li {
    text-align: left !important;
    margin-left: 10em !important;
  }
</style>
