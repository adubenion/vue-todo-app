<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-4">My Groups</h1>
    <div v-if="groups.length">
      <div v-for="group in groups" :key="group._id" >
        <div class="card">
          <div class="card-content">
              <router-link :to="{name: 'group', params: {group: group.name}}" class="subtitle">{{group.name}}</router-link>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Leave Group</a>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card-content">
            <p class="subtitle">No groups to display. Join a community!</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">Leave Group</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'friends',
  data() {
  	return {
			groups: []
  	}
  },
  mounted() {
    console.log('groups mounted')
    axios.get('http://localhost:3000/api/groups', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      this.groups = data
    })
    .catch(e => {
        console.log(e.message)
    })
  }
}
</script>
