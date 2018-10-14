<template>
  <div>
    <section class="section">
     <h1 class="title is-4">Info</h1>
    </section>
    <section class="section">
      <h1 class="title is-4">Users in Group</h1>
      <h1 class="title is-4">Messages</h1>
      <h1 class="title is-4">Group Tasks</h1>
    </section>
    </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'groupProfile',
  data() {
    return {

    }
  },
  mounted() {
    
  },
  computed: {

  }
}
</script>
