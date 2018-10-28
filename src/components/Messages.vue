<template>
  <div class="container is-fluid has-text-centered">
    <section class="section">
    	<h1 class="title is-4">My Messages</h1>
    </section>
    <section class="section">
      <div v-if="messages.length">
        <div v-for="message in messages" :key="message._id" >
          <div v-show="!showMessage" class="card">
            <div class="card-content">
              <div>
                  <p class="subtitle">From: {{message.from}} Subject: {{message.subject}}</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Read</a>
            </footer>
          </div>
          <div v-show="showMessage" class="card">
            <div class="card-content">
              <div>
                  <p class="subtitle">From: {{message.from}} To: {{message.to}}</p>
                  <p class="subtitle">Subject: {{message.subject}}</p>
                  <p class="subtitle">Body: <p class="subtitle">{{message.body}}</p></p>
                  <p class="subtitle"></p>
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
      showMessage: false,
      messages: []
  	}
  },
  mounted() {
    axios.get('/todo-app/api/messages', {headers: {'token':this.$cookies.get('todo_app')}})
    .then(response => {
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
