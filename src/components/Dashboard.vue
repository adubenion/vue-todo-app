<template>
  <div>
    <section class="section">
  	 <h1 class="title is-4">Dashboard</h1>
    </section>
    <section class="section">
      <h1 class="title is-4">My Todos</h1>
      <div v-if="incompleteTasks.length" class="card">
        <div v-for="todo in incompleteTasks" :key="todo._id" class="card-content">
          <p class="subtitle">{{todo.description}}</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/todos')}">Go to Todos</a>
        </footer>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle">No todos to display. How productive!</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/todos')}">Go to Todos</a>
        </footer>
      </div>
      <h1 class="title is-4">My Friends</h1>
      <div v-if="friendsList.length" class="card">
        <div v-for="friend in friends" :key="friend._id" class="card-content">
          <router-link :to="{name: 'user', params: {username: friend.association.filter(i => i !== currentUser).join('')}}" v-show="friend.requestAccepted === true" class="subtitle">{{friend.association.filter(i => i !== currentUser).join('')}}</router-link>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/friends')}">Go to Friends</a>
        </footer>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle" @click="() => {this.$router.replace('/friends')}">No friends to display. Send someone a request!</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/friends')}">Go to Friends</a>
        </footer>
      </div>
        <h1 class="title is-4">My Groups</h1>
      <div v-if="groups.length" class="card">
        <div v-for="group in groups" :key="group._id" class="card-content">
          <router-link :to="{name: 'group', params: {group: group.name}}" class="subtitle">{{group.name}}</router-link>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/groups')}">Go to Groups</a>
        </footer>
      </div>
      <div v-else class="card">
        <div class="card-content">
          <p class="subtitle">No groups to display. Join a community!</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="() => {this.$router.replace('/groups')}">Go to Groups</a>
        </footer>
      </div>
    </section>
    </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'dashboard',
  data() {
    return {
      todos: [],
      friends: [],
      groups: [],
      currentUser: ''
    }
  },
  mounted() {
    console.log('dashboard mounted')
    axios.get('http://localhost:3000/api/dashboard', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      this.todos = data[0].todo_docs
      this.friends = data[0].friend_docs
      this.groups = data[0].user_groups
      this. currentUser = localStorage.getItem("ta_cu")
      console.log(this.friends)
    })
    .catch(e => {
        console.log(e.message)
    })
  },
  computed: {
    friendsList: function () {
      return this.friends.filter(friend => friend.requestAccepted)
    },
    incompleteTasks: function () {
      return this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>
