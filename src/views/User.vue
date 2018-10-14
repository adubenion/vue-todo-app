<template>
  <div class="container is-fluid has-text-centered">
    <h1 class="title is-3">{{this.username}}</h1>
    <div :class="{'is-active': this.nav}" class="dropdown">
      <div class="dropdown-trigger">
        <button @click="() => {this.nav = !this.nav}" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Profile Menu</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div v-show="friends === true && friendsPending === false" class="dropdown-content">
          <a href="#" class="dropdown-item">
            Unfriend
          </a>
          <a class="dropdown-item">
            Send Message
          </a>
        </div>
        <div v-show="friends === false && friendsPending === false" class="dropdown-content">
          <a  @click="addFriend" class="dropdown-item">
            Add Friend
          </a>
        </div>
        <div v-show="friends === false && friendsPending === true" class="dropdown-content">
          <a href="#" class="dropdown-item">
            Delete Request
          </a>
        </div>
      </div>
    </div>
    <UserProfile v-if="" :friends="friends" :friendsPending="friendsPending" :currentUser="username" />
  </div>  
</template>

<script>
// @ is an alias to /src
  import UserProfile from '@/components/UserProfile.vue'
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'user',
  components: {
    UserProfile
  },
  data() {
  	return {
  		username: '',
      nav: false,
      friends: false,
      friendsPending: false
  	}
  },
  mounted() {
  	console.log('user profile mounted')
  	axios.get('http://localhost:3000/api/user/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
  	.then(response => {
  		console.log(response)
  		return response.data
  	})
  	.then(data => {
  		if (data.success) {
  			this.username = this.$route.params.username
  		} else {
  			this.username = data.error
  		}
      return axios.get('http://localhost:3000/api/friends', {headers: {'token':this.$cookies.get('todo_app')}})
      .then(response => {
        console.log(response)
        return response.data
      })
      .then(data => {
        data.forEach((i,j,k) => {
          console.log(i.association.indexOf(localStorage.getItem("ta_cu")), i.association.indexOf(this.username))
          if (i.association.indexOf(localStorage.getItem("ta_cu")) !== -1 && i.association.indexOf(this.username) !== -1) {
            this.friends = i.friends
            if (i.requestAccepted === false) {
              this.friendsPending = !i.requestAccepted
            }
          }
        })
      })
  	})
  	.catch(e => {
        console.log(e.message)
      })
  },
  methods: {
    addFriend: function() {
      axios.post('http://localhost:3000/api/friends/send_request/', {
        action: 'request',
        requestedUser: this.username
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        console.log(response)
      })
    }
  },
  watch: {
    '$route.params.username': function(un) {
    axios.get('http://localhost:3000/api/user/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      if (data.success) {
        this.username = un
        this.$forceUpdate()
      } else {
        this.username = data.error
        this.$forceUpdate()
      }
    })
    .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>
