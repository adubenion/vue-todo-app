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
				    <a class="navbar-item" @click="navbarAction('/')">Home</a>
				    <a v-show="loggedIn === true" @click="navbarAction('/todos')" class="navbar-item">Todos</a>
				    <a v-show="loggedIn === true" @click="navbarAction('/friends')" class="navbar-item">Friends</a>
				    <a v-show="loggedIn === true" @click="navbarAction('/groups')" class="navbar-item">Groups</a>
				    <a v-show="loggedIn === true" @click="navbarAction('/messages')" class="navbar-item">Messages</a>
				    <a v-show="loggedIn === false" @click="navbarAction('/login')" class="navbar-item">Login</a>
				    <a v-show="loggedIn === true" @click="handleLogout" class="navbar-item">Logout</a>
				    <a v-show="loggedIn === true && modal === false" @click="isModal" class="navbar-item">Search</a>
				    <Search :modal="modal" :searchBar="searchBar" :results="results" @search="getResults($event)" @close="modal = $event" @nav="hamburger = $event" @input="search($event)" />

				  </div>
				</nav>
				<p v-show="loggedIn === true && currentUser !== ''" class="subtitle">Welcome, <b>{{ currentUser }}</b>!</p>
			</section>
		</div>
    <router-view 
    :loggedIn="loggedIn"
    :currentUser="currentUser"
    @login="loggedIn = $event"
    @welcome="welcome($event)"
    />
  </div>
</template>

<script>
	import Search from '@/components/Search.vue'
	import axios from 'axios';
	axios.defaults.withCredentials = true
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
				currentUser: '',
				modal: false,
				searchBar: '',
				results: []
			}
		},
		created() {
			if (this.$cookies.isKey('todo_app')) {
		        // axios.get('http://localhost:3000/auth')
		        // .then((response) => {
		        //   if (!(response > 200)) {
		        //   	this.currentUser = response.data.auth
		        //   }
		        // }).catch(e => {
		        //   console.log(e)
		        // })
					this.loggedIn = true
				if (localStorage.getItem("ta_cu")) {
					this.currentUser = localStorage.getItem("ta_cu")
				} else {
			        axios.get('http://localhost:3000/auth')
			        .then((response) => {
						if (!(response.status > 200)) {
							localStorage.setItem("ta_cu", response.data.auth)

						}
			        })
				}
			} else {
			this.loggedIn = false
			}
		},
		methods: {
			navbarAction: function(route) {
				this.$router.replace(route)
				this.hamburger = false
			},
			welcome: function(e) {
				this.currentUser = e
				if (!(localStorage.getItem("ta_cu") && localStorage.getItem("ta_cu") === e)) {
					localStorage.setItem("ta_cu", this.currentUser)
				}
			},
			handleLogout: function() {
				this.$cookies.remove('todo_app');
				localStorage.removeItem("ta_cu")
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
