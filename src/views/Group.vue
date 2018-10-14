<template>
  <div class="container is-fluid has-text-centered">
    <h1 class="title is-3">{{this.group}}</h1>
    <div :class="{'is-active': this.nav}" class="dropdown">
      <div class="dropdown-trigger">
        <button @click="() => {this.nav = !this.nav}" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Group Menu</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-if="!inGroup" href="#" class="dropdown-item">
            Join Group
          </a>
          <a v-else href="#" class="dropdown-item">
            Leave Group
          </a>
          <a v-show="inGroup" class="dropdown-item">
            Send Group Message
          </a>
          <a v-show="inGroup" class="dropdown-item">
            Add group task
          </a>
        </div>
      </div>
    </div>
    <GroupProfile :currentUser="group" />
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
      inGroup: false
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
        data.forEach((i,j,k) => {
          console.log(i.associatedUsers.indexOf(localStorage.getItem("ta_cu")))
          if (i.associatedUsers.indexOf(localStorage.getItem("ta_cu")) !== -1) {
            console.log('grouped')
            this.inGroup = true
          }
        })
      })
  	})
  	.catch(e => {
        console.log(e.message)
      })
  },
  watch: {
    '$route.params.username': function(un) {
    axios.get('http://localhost:3000/api/group/' + this.$route.params.group, {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      if (data.success) {
        this.group = un
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
