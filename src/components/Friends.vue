<template>
  <div>
    <section class="section">
      <h1 class="title is-4">My Friends</h1>
    </section>
    <section class="section">
      <h1 class="title is-5">Friends List</h1>
      <div v-if="friendsList.length">
        <div v-for="friend in friendsList" :key="friend._id" >
          <div v-if="friend.friends" class="card">
            <div class="card-content">
                <router-link :to="{name: 'user', params: {username: friend.association.filter(x => x !== currentUser).join('')}}" class="subtitle">{{friend.association.filter(x => x !== currentUser).join('')}}</router-link>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Unfriend</a>
            </footer>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No friends to display. Send someone a request!</p>
      </div>
      <hr>
      <h1 class="title is-5">Friends Requests</h1>
      <div v-if="requests.length">
        <div v-for="friend in requests" :key="friend._id" >
          <div v-show="friend.requestingUser.username !== currentUser" class="card">
            <div class="card-content">
                <router-link :to="{name: 'user', params: {username: friend.requestingUser.username}}" class="subtitle">{{friend.requestingUser.username}}</router-link>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="acceptRequest(friend._id)">Accept Request</a>
            </footer>
          </div>
          <div v-show="friend.requestingUser.username === currentUser" class="card">
            <div class="card-content">
                <router-link :to="{name: 'user', params: {username: friend.requestedUser.username}}" class="subtitle">Request sent to {{friend.requestedUser.username}}</router-link>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="acceptRequest(friend._id)">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No friend requests at this time.</p>
      </div>
    </section>
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
			friends: [],
      currentUser: ''
  	}
  },
  mounted() {
    console.log('friends mounted')
    axios.get('http://localhost:3000/api/friends', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      this.friends = data
      this. currentUser = localStorage.getItem("ta_cu")
    })
    .catch(e => {
        console.log(e.message)
      })
  },
  methods: {
    acceptRequest: function (id) {
      console.log(id)
      axios.put('http://localhost:3000/api/friends/accept_request/', {
        _id: id,
        action: "accept"
      },
      {headers: {token: this.$cookies.get('todo_app')}})
      .then(response => {
        console.log(response)
        return response.data
      }).catch(e => {
        console.log(e.message)
      })
    },
    unfriend: function (id) {
      console.log(id)
      axios.put('http://localhost:3000/api/friends/unfriend/', {
        _id: id,
        action: "unfriend"
      },
      {headers: {token: this.$cookies.get('todo_app')}})
      .then(response => {
        console.log(response)
        return response.data
      }).catch(e => {
        console.log(e.message)
      })
    }
  },
  computed: {
    friendsList: function () {
      return this.friends.filter(friend => friend.requestAccepted)
    },
    requests: function () {
      return this.friends.filter(friend => !friend.requestAccepted)
    }
  }
}
</script>
