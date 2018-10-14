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
	<div v-show="searched === true" class="box has-text-centered">
		<h1 style="color:black;" class="title is-4">Results</h1>
		<h1 v-show="usersFromSearch.length" style="color:black;" class="title is-5">Users</h1>
		<ul v-for="user in usersFromSearch" :key="user.username">
			<li>
				<router-link :to="{name: 'user', params: {username: user.username}}" class="subtitle" @click.native="close(false)">{{user.username}}</router-link>
			</li>
		</ul>
		<h1 v-show="friends.length" style="color:black;" class="title is-5">Friends</h1>
		<ul v-for="friend in friends" :key="friend._id">
			<li>
				<router-link :to="{name: 'user', params: {username: friend.association.filter(i => i != currentUser).join('')}}" class="subtitle" @click.native="close(false)">{{friend.association.filter(i => i != currentUser).join('')}}</router-link>
			</li>
		</ul>
		<h1 v-show="groups.length" style="color:black;" class="title is-5">Groups</h1>
		<ul v-for="group in groups" :key="group._id">
			<li>
				<router-link :to="{name: 'group', params: {group: group.name}}" class="subtitle" @click.native="close(false)">{{group.name}}</router-link>
			</li>
		</ul>
		<h1 v-show="todos.length" style="color:black;" class="title is-5">Todos</h1>
		<ul v-for="todo in todos" :key="todo._id">
			<li>
				<router-link to="/todos" class="subtitle" @click.native="close(false)">Todo: {{todo.description}}, Completed: {{todo.completed?('Yes'):('No')}}</router-link>
			</li>
		</ul>
	</div>
  </div>aa
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
  data() {
  	return {
	  	usersFromSearch: [],
	  	friends: [],
	  	groups: [],
	  	todos: [],
	  	currentUser: '',
	  	searched: false
  	}
  },
	methods: {
		close: function(nav) {

			this.input = ''
			this.usersFromSearch = []
			this.friends = [],
			this.groups = [],
			this.todos = [],
			this.$emit('close', !this.modal)
			this.$emit('input', this.input)
			this.$emit('search', this.result)
			this.searched = false
			this.currentUser = ''
			if (nav !== null) {
				this.$emit('nav', nav)
			}
		},
		handleInput: function() {
			this.input = event.target.value
			this.$emit('input', this.input)
		},
		searchUsers: function() {
			var users = []
			console.log(this.searchBar)
			if (this.searchBar !== '') {
				axios.get('http://localhost:3000/api/search/', {headers: {'token':this.$cookies.get('todo_app'), 'search':this.searchBar}})
				.then(response => {
					console.log(response)
					return response.data
				})
				.then(data => {

					if (data.length > 0) {
						this.searched = true
						if (data[0].length !== undefined && data[0] !== null) {
							this.usersFromSearch = data[0]
							console.log(this.usersFromSearch)
						} else {
							this.usersFromSearch = ['No results found. Please refine your search.']	
						}

						if (data[1] !== undefined && data[1] !== null) {
						this.friends = data[1]
						console.log(this.friends)
						} else {
							this.friends = ['No results found. Please refine your search.']
						}

						if (data[2] !== undefined && data[1] !== null) {
						this.groups = data[2]
						console.log(this.groups)
						} else {
							this.groups = ['No results found. Please refine your search.']
						}

						if (data[3] !== undefined && data[1] !== null) {
						this.todos = data[3]
						console.log(this.todos)
						} else {
							this.todos = ['No results found. Please refine your search.']
						}
						localStorage.getItem("ta_cu")?(this.currentUser = localStorage.getItem("ta_cu")):(this.currentUser = data[4][0].username)
					} else {
						users = ['No results found. Please refine your search.']
						this.$emit('search', users)
					}
				})
				.catch(e => {
					console.log(e.message)
				})
			}
		},
	}

}
</script>

