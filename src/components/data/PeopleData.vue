<template>
  <div class="people-data">
    <h1>People Data</h1>
    <ol>
      <li
        v-for="person in getPeople"
        :key="person._id"
      >
        {{ person.name }} - aged {{ person.age }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'PeopleData',

    computed: {
      getPeople () { return this.people.people }
    }
  }
</script>

<style scoped>

</style>
