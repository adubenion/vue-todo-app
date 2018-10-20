<template>
  <div>
    <div v-show="(username.split(' ').includes('Not', 2) === false)" :class="{'is-active': this.nav}" class="dropdown">
      <div class="dropdown-trigger">
        <button @click="() => {this.nav = !this.nav}" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Profile Menu</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div v-show="friends && !friendsPending" class="dropdown-content">
          <a @click="unfriend(id)" class="dropdown-item">
            Unfriend
          </a>
<!--           <a class="dropdown-item" @click="() => {this.$router.replace('/messages')}">
            Send Message
          </a> -->
        </div>
        <div v-show="!friends && !friendsPending" class="dropdown-content">
          <a  @click="addFriend" class="dropdown-item">
            Add Friend
          </a>
        </div>
        <div v-show="!friends && friendsPending" class="dropdown-content">
          <a @click="unfriend(id)" class="dropdown-item">
            Delete Request
          </a>
        </div>
      </div>
    </div>
    <section v-if="showProfile" class="section">
      <h1 class="title is-4">Todos for {{this.username}}</h1>
      <div v-if="incompleteTasks.length" class="card">
        <div v-for="todo in incompleteTasks" :key="todo._id" class="card-content">
          <p class="subtitle">{{todo.description}}</p>
        </div>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle">No todos to display. How productive!</p>
        </div>
      </div>
      <h1 class="title is-4">Friends of {{this.username}}</h1>
      <div v-if="friendsList.length" class="card">
        <div v-for="friend in userFriends" :key="friend._id" class="card-content">
          <router-link :to="{name: 'user', params: {username: friend.association.filter(i => i !== username).join('')}}" v-show="friend.requestAccepted === true" class="subtitle">{{friend.association.filter(i => i !== username).join('')}}</router-link>
        </div>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle" @click="() => {this.$router.replace('/friends')}">No friends to display</p>
        </div>
      </div>
        <h1 class="title is-4">Groups for {{this.username}}</h1>
      <div v-if="groups.length" class="card">
        <div v-for="group in groups" :key="group._id" class="card-content">
          <router-link :to="{name: 'group', params: {group: group.name}}" class="subtitle">{{group.name}}</router-link>
        </div>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle">No groups to display.</p>
        </div>
      </div>
    </section>
    <section v-else-if="username.split(' ').includes('Not', 2) === true">
      <div></div>
    </section>
    <section v-else class="section">
      <p class="title is-4">Once {{this.username}} is a friend, you can see their profile! Send them a request!</p>
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
    username: String, 
    userFriends: Array,
    groups: Array,
    todos: Array,
    showProfile: Boolean,
    incompleteTasks: Array,
    friendsList: Array,
    friends: Boolean,
    friendsPending: Boolean,
    id: String
  },
  data() {
    return {
      nav: false
    }
  },
  methods: {
    addFriend: function() {
      axios.post('/todo-app/api/friends/send_request/', {
        action: 'request',
        requestedUser: this.username
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        if (!(response.status > 200) && response.data.success) {
          alert('Friend request has been sent to ' + this.username + '!')
          this.nav = false
          return this.$emit('complete')
        }
      })
      .catch(e => {
        console.log(e.message)
      })
    },
    unfriend: function (id) {
      var confirm = window.confirm("Are you sure? This action cannot be undone.")
      if (confirm) {
        axios.delete('/todo-app/api/friends/unfriend/', {
          data: { 
            _id: id, 
            action: 'unfriend'
          }
        },
        {headers: {token: this.$cookies.get('todo_app')}})
        .then(response => {
          if (!(response.status > 200) && response.data.success) {
            this.nav = false
            return this.$emit('complete')
          }
        }).catch(e => {
          console.log(e.message)
        })
      } else {
        return false
      }
    }
  }
}
</script>
