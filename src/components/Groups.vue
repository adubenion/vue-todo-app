<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-4">My Groups</h1>
    <div>
      <a class="button is-info" @click="() => {this.addGroupModal = !this.addGroupModal}">Create Group</a>
      <AddGroup 
      :addGroupModal="addGroupModal" 
      :addGroupName="addGroupName" 
      @input="addGroupName = $event"
      @close="addGroupModal = $event"/>
    </div>
    <div v-if="groups.length">
      <div v-for="group in groups" :key="group._id" >
        <div class="card">
          <div class="card-content">
              <router-link :to="{name: 'group', params: {group: group.name}}" class="subtitle">{{group.name}}</router-link>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="leaveGroup(group.name)">Leave Group</a>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card-content">
            <p class="subtitle">No groups to display. Join a community!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

  import AddGroup from '@/components/AddGroup'

export default {
  name: 'friends',
  components: {
    AddGroup
  },
  data() {
  	return {
      addGroupName: '',
      addGroupModal: false,
			groups: []
  	}
  },
  mounted() {
    axios.get('/todo-app/api/groups', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      return response.data
    })
    .then(data => {
      this.groups = data
    })
    .catch(e => {
        console.log(e.message)
    })
  },
  methods: {
    joinGroup: function() {
      axios.put('/todo-app/api/groups/join_group/' + this.$route.params.group, {
        addedUser: localStorage.getItem("ta_cu"),
        action: 'join group'
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        return response.data
      })
      .catch(e => {
        console.log(e.message)
      })
    },
    leaveGroup: function(name) {
      var confirm = window.confirm('Are you sure? This action cannot be undone.')
      if (confirm) {
        axios.put('/todo-app/api/groups/leave_group/' + name, {
          removedUser: localStorage.getItem("ta_cu"),
          action: 'leave group'
        },
        {
          headers: {
            token: this.$cookies.get('todo_app')
          }
        })
        .then(response => {
          if (!(response.status > 200)) {
            return axios.get('/todo-app/api/groups', {headers: {'token':this.$cookies.get('todo_app')}})
            .then(response => {
              return response.data
            })
            .then(data => {
              this.groups = data
            })
            .catch(e => {
                console.log(e.message)
            })
          }
        })
        .catch(e => {
          console.log(e.message)
        })
      }
    }
  }
}
</script>
