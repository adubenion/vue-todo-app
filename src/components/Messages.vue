<template>
  <div class="container is-fluid has-text-centered">
    <section class="section">
    	<h1 class="title is-4">My Messages</h1>
    </section>
    <section class="section">
      <div v-if="messages.length">
        <div v-for="message in messages" :key="message._id" >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <label class="title is-5">
                  To:
                  <p class="subtitle">{{message.to}}</p>
                </label>
                <label class="title is-5">
                  From:
                  <p class="subtitle">{{message.from}}</p>
                </label>
                <label class="title is-5">
                  Subject:
                  <p class="subtitle">{{message.subject}}</p>
                </label>
                <label class="title is-5">
                  Body
                  <p class="subtitle">{{message.body}}</p>
                </label>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Reply</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No Messages to display. Send someone a hello!</p>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
	import axios from 'axios';
	axios.defaults.withCredentials = true

export default {
  name: 'messages',
  data() {
  	return {
      messages: []
  	}
  },
  mounted() {
  	console.log("messages mounted")
    axios.get('http://localhost:3000/api/messages', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(data => {
      this.messages = data.message
    })
    .catch(e => {
        console.log(e.message)
      })
  },
  methods: {

  }

}
</script>
