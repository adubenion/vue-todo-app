<template>
  <div class="container is-fluid has-text-centered">
    <h1 class="title is-3">{{this.username}}</h1>
    <UserProfile 
    :username="username" 
    :showProfile="showProfile" 
    :userFriends="userFriends"
    :friends="friends"
    :friendsPending="friendsPending"
    :groups="groups"
    :todos="todos"
    :friendsList="friendsList"
    :incompleteTasks="incompleteTasks"
    :id="id" 
    @complete="reload"/>
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
      id: '',
  		username: '',
      friends: false,
      friendsPending: false,
      userFriends: [],
      groups: [],
      todos: []
  	}
  },
  mounted() {
  	axios.get('http://localhost:3000/api/user/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
  	.then(response => {
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
        return response.data
      })
      .then(data => {
        if (data.length) {
          var association = data.filter(i => i.association.includes(localStorage.getItem("ta_cu")) && i.association.includes(this.username))
          if (association.length) {
            this.friends = association[0].friends
            this.friendsPending = !association[0].requestAccepted
            this.id = association[0]._id
              return axios.get('http://localhost:3000/api/user_profile/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
              .then(response => {
                return response.data
              })
              .then(data => {
                this.todos = data[0].todo_docs
                this.userFriends = data[0].friend_docs
                this.groups = data[0].user_groups
              })
              .catch(e => {
                  console.log(e.message)
              })
          } else {
            this.friends = false
            this.friendsPending = false
          }
        } else {
          this.friends = false
          this.friendsPending = false
        }
      })
      .catch(e => {
        console.log(e.message)
      })
  	})
  	.catch(e => {
        console.log(e.message)
    })
  },
  methods: {
    reload: function() {
      axios.get('http://localhost:3000/api/user/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
      .then(response => {
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
          return response.data
        })
        .then(data => {
          if (data.length) {
            var association = data.filter(i => i.association.includes(localStorage.getItem("ta_cu")) && i.association.includes(this.username))
            if (association.length) {
              this.friends = association[0].friends
              this.friendsPending = !association[0].requestAccepted
              this.id = association[0]._id
                return axios.get('http://localhost:3000/api/user_profile/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
                .then(response => {
                  return response.data
                })
                .then(data => {
                  this.todos = data[0].todo_docs
                  this.userFriends = data[0].friend_docs
                  this.groups = data[0].user_groups
                })
                .catch(e => {
                    console.log(e.message)
                })
            } else {
              this.friends = false
              this.friendsPending = false
            }
          } else {
            this.friends = false
            this.friendsPending = false
          }
        })
        .catch(e => {
          console.log(e.message)
        })
      })
      .catch(e => {
          console.log(e.message)
      })
    }
  },
  computed: {
    showProfile: function() {
      if (this.username === localStorage.getItem("ta_cu")) {
        return true
      } else {
        if (this.friends && !this.friendsPending) {
          return true
        } else {
          return false
        }
      }
    },
    friendsList: function () {
      return this.userFriends.filter(friend => friend.requestAccepted)
    },
    incompleteTasks: function () {
      return this.todos.filter(todo => !todo.completed)
    }
  },
  watch: {
    '$route.params.username': function(un) {
    axios.get('http://localhost:3000/api/user/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      return response.data
    })
    .then(data => {
      if (data.success) {
        this.username = un
        return axios.get('http://localhost:3000/api/friends', {headers: {'token':this.$cookies.get('todo_app')}})
        .then(response => {
          return response.data
        })
        .then(data => {
          if (data.length) {
            var association = data.filter(i => i.association.includes(localStorage.getItem("ta_cu")) && i.association.includes(this.username))
            if (association.length) {
              this.friends = association[0].friends
              this.friendsPending = !association[0].requestAccepted
                return axios.get('http://localhost:3000/api/user_profile/' + this.$route.params.username, {headers: {'token':this.$cookies.get('todo_app')}})
                .then(response => {
                  return response.data
                })
                .then(data => {
                  this.todos = data[0].todo_docs
                  this.userFriends = data[0].friend_docs
                  this.groups = data[0].user_groups
                })
                .catch(e => {
                    console.log(e.message)
                })
            } else {
              this.friends = false
              this.friendsPending = false              
            }
          } else {
            this.friends = false
            this.friendsPending = false
          }
        })
        .catch(e => {
          console.log(e.message)
        })
      } else {
        this.username = data.error
      }
    })
    .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>
