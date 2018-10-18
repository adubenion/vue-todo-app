<template>
  <div class="container is-fluid has-text-centered">
    <h1 class="title is-3">{{this.group}}</h1>
    <GroupProfile 
    :group="group" 
    :inGroup="inGroup"
    :usersInGroup="usersInGroup"
    :messages="messages" />
  </div>  
</template>

<script>
// @ is an alias to /src
  import GroupProfile from '@/components/GroupProfile.vue'
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'user',
  components: {
    GroupProfile
  },
  data() {
  	return {
  		group: '',
      nav: false,
      inGroup: false,
      usersInGroup: [],
      messages: [],
  	}
  },
  mounted() {
  	console.log('group page mounted')
  	axios.get('http://localhost:3000/api/groups/' + this.$route.params.group, {headers: {'token':this.$cookies.get('todo_app')}})
  	.then(response => {
  		console.log(response)
  		return response.data
  	})
  	.then(data => {
  		if (data.success) {
  			this.group = this.$route.params.group
  		} else {
  			this.group = data.error
  		}
      return axios.get('http://localhost:3000/api/groups', {headers: {'token':this.$cookies.get('todo_app')}})
      .then(response => {
        console.log(response)
        return response.data
      })
      .then(data => {
        var associatedUsers = data.filter(i => i.name === this.$route.params.group)
        console.log(associatedUsers)
        if (associatedUsers[0].associatedUsers.includes(localStorage.getItem("ta_cu"))) {
          this.inGroup = true
          this.usersInGroup = associatedUsers[0].associatedUsers
        } else {
          this.inGroup = false
        }
      })
  	})
  	.catch(e => {
        console.log(e.message)
      })
  },
  watch: {
    '$route.params.username': function(gr) {
    axios.get('http://localhost:3000/api/group/' + this.$route.params.group, {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      if (data.success) {
        this.group = gr
      } else {
        this.group = data.error
      }
    })
    .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>
