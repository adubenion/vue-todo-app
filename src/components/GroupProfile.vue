<template>
  <div>
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
          <a v-if="!inGroup" @click="joinGroup" class="dropdown-item">
            Join Group
          </a>
          <a v-else @click="leaveGroup" class="dropdown-item">
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
    <section v-if="inGroup" class="section">
      <h1 class="title is-4">Users in Group</h1>
        <div v-if="usersInGroup.length" class="card">
          <div v-for="user in usersInGroup" :key="user" class="card-content">
            <router-link :to="{name: 'user', params: {username: user}}" class="subtitle">{{user}}</router-link>
          </div>
        </div>
        <div v-else class="card">
          <div class="card-content">
            <p class="subtitle" >No users in group at this time</p>
          </div>
        </div>
      <h1 class="title is-4">Messages</h1>
        <div class="card">
          <div class="card-content">
            <p class="subtitle" >No Messages in group at this time</p>
          </div>
        </div>
      <h1 class="title is-4">Group Tasks</h1>
      <GroupTodo />
    </section>
    <section v-else>
      <p class="title is-4">Must be joined with group to view contents</p>
    </section>
    </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

  import GroupTodo from '@/components/GroupTodo.vue'

export default {
  name: 'groupProfile',
  components: {
    GroupTodo
  },
  props: {
    group: String,
    inGroup: Boolean,
    usersInGroup: Array,
    mssages: Array
  },
  data() {
    return {
      nav: false
    }
  },
  methods: {
    joinGroup: function() {
      axios.put('http://localhost:3000/api/groups/join_group/' + this.$route.params.group, {
        addedUser: localStorage.getItem("ta_cu"),
        action: 'join group'
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(e => {
        console.log(e.message)
      })
    },
    leaveGroup: function() {
      axios.put('http://localhost:3000/api/groups/leave_group/' + this.$route.params.group, {
        removedUser: localStorage.getItem("ta_cu"),
        action: 'leave group'
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>
