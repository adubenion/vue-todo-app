<template>
  <div id="app">
		<div>
			<section class="hero is-info is-bold">
				<div class="hero-body">
					<div class="container is-fluid has-text-centered">
						<h1 class="title">{{ title }}</h1>				
					</div>				
				</div>
				<nav class="navbar" role="navigation" aria-label="main navigation">
				  <div class="navbar-brand">
				    <!-- navbar items, navbar burger... -->
				    <a :class="{'is-active': hamburger}" @click="() => {this.hamburger = !hamburger}" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
				    	<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
				    </a>
				  </div>
				  <div :class="{'is-active': hamburger}" class="navbar-menu">
				    <!-- navbar start, navbar end -->
				    <a class="navbar-item" @click="() => {this.$router.replace('/')}">Home</a>
				    <a v-show="loggedIn === true" @click="() => {this.$router.replace('/todos')}" class="navbar-item">Todos</a>
				    <a v-show="loggedIn === true" @click="() => {this.$router.replace('/friends')}" class="navbar-item">Friends</a>
				    <a v-show="loggedIn === true" @click="() => {this.$router.replace('/groups')}" class="navbar-item">Groups</a>
				    <a v-show="loggedIn === true" @click="() => {this.$router.replace('/messages')}" class="navbar-item">Messages</a>
				    <a v-show="loggedIn === false" @click="() => {this.$router.replace('/login')}" class="navbar-item">Login</a>
				    <a v-show="loggedIn === true" @click="handleLogout" class="navbar-item">Logout</a>
				    <a v-show="loggedIn === true && modal === false" @click="isModal" class="navbar-item">Search</a>
				    <Search :modal="modal" :searchBar="searchBar" :results="results" @search="getResults($event)" @close="modal = $event" @input="search($event)" />

				  </div>
				</nav>
				<p v-show="loggedIn === true && user !== ''" class="subtitle">Welcome, <b>{{ user }}</b>!</p>
			</section>
		</div>
    <router-view 
    :loggedIn="loggedIn"
    :user="user"
    @login="loggedIn = $event"
    @welcome="user = $event"
    />
  </div>
</template>

<script>
	import Search from './views/Search.vue'
	export default {
		name: 'App',
		components: {
			Search
		},
		data() {
			return {
				title: 'Todo App',
				hamburger: false,
				loggedIn: false,
				user: '',
				modal: false,
				searchBar: '',
				results: []
			}
		},
		mounted() {
			if (this.$cookies.isKey('todo_app')) {
					this.loggedIn = true
			} else {
					this.loggedIn = false
			}
		},
		methods: {
			handleLogout: function() {
				this.$cookies.remove('todo_app');
				this.$router.replace('/login')
				this.loggedIn = false
			},
			isModal: function() {
				this.modal = !this.modal
			},
			search: function(e) {
				this.searchBar = e
			},
			getResults: function(e) {
				this.results = e
				console.log(e)
			}
		},
		computed: {
			check: function() {
				if (this.$cookies.isKey('todo_app')) {
					this.loggedIn = true
				} else {
					this.loggedIn = false
				}
			}
		}
	}
</script>
<style >
	#search {
		max-width: 200px;
		min-width: 200px;
	}
	#results {
		color: black;
	}
</style>
