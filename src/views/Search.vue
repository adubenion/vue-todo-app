<template>
  <div :class="{'is-active': modal}" class="modal">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
	<div class="field is-grouped">
		<button class="button is-danger" @click="close()">X</button>
		<input class="input" :value="searchBar" @input="handleInput()" @keyup.enter="searchUsers" placeholder="Search Users" >
		<a class="button is-success" @click="searchUsers">Search</a>
		</input>
	</div>
	<div v-show="results.length > 0" class="box has-text-centered is-dark">
		<h1 style="color:black;" class="title is-5">Results</h1>
		<ul v-for="user in results" :key="user">
			<li>
				<p id="results" class="subtitle">{{user}}</p>
			</li>
		</ul>
	</div>
  </div>
</div>
</template>

<script>
	import axios from 'axios';
	axios.defaults.withCredentials = true
// @ is an alias to /src
// import Todo from '@/components/Todo.vue';

export default {
  name: 'search',
  props: {
  	modal: Boolean,
  	searchBar: String,
  	results: Array
  },
  methods: {
  	close: function() {
  		this.input = ''
  		this.result = []
  		this.$emit('close', !this.modal)
  		this.$emit('input', this.input)
  		this.$emit('search', this.result)
  	},
	handleInput: function() {
		this.input = event.target.value
		this.$emit('input', this.input)
	},
	searchUsers: function() {
		var users = []
		console.log(this.searchBar)
		if (this.searchBar !== '') {
			axios.get('http://localhost:3000/api/search_users/', {headers: {'token':this.$cookies.get('todo_app'), 'search':this.searchBar}})
			.then(response => {
				console.log(response)
				return response.data
			})
			.then(data => {
				if (data.length > 0) {
					data.forEach((i,j,k) => {
						console.log(i.username)
						users.push(i.username)
					})
					console.log(users)
					this.$emit('search', users)
				} else {
					users = ['No results found. Please refine your search.']
					this.$emit('search', users)
				}
			})
		}
	}
  }

}
</script>

