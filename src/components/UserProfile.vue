<template>
  <div>
    <section class="section">
     <h1 class="title is-4">Info</h1>
    </section>
    <section v-if="showProfile" class="section">
      <h1 class="title is-4">Todos</h1>
      <h1 class="title is-4">Friends</h1>
      <h1 class="title is-4">Groups</h1>
    </section>
    <section v-else class="section">
      <p class="title is-4">Once {{this.currentUser}} is a friend, you can see their profile! Send them a request!</p>
    </section>
    </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'userProfile',
  props: {
    currentUser: String,
    friends: Boolean,
    friendsPending: Boolean
  },
  data() {
    return {

    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/user_profile', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(e => {
        console.log(e.message)
    })
    console.log(this.friends)
  },
  computed: {
    showProfile() {
      if (this.currentUser === localStorage.getItem("ta_cu")) {
        return true
      } else {
        if (this.friends === true && this.friendsPending === false) {
          return true
        } else {
          return false
        }
      }
    }
  },
  watch: {
    showProfile(value) {
      console.log(value)
      if (value) {
        this.$forceUpdate()
        return true
      } else {
        this.$forceUpdate()
        return false
      }
    }
  }
}
</script>
