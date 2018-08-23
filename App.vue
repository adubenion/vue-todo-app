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
				    <a v-show="loggedIn === false" @click="() => {this.$router.replace('/login')}" class="navbar-item">Login</a>
				    <a v-show="loggedIn === true" @click="handleLogout" class="navbar-item">Logout</a>
				  </div>
				</nav>
				<p v-show="loggedIn === true" class="subtitle">Welcome, <b>{{ user }}</b>!</p>
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
	export default {
		name: 'App',
		data() {
			return {
				title: 'Todo App',
				hamburger: false,
				loggedIn: false,
				user: ''
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
			handleLogout() {
				this.$cookies.remove('todo_app');
				this.$router.replace('/login')
				this.loggedIn = false
			}
		},
		computed: {
			check() {
				if (this.$cookies.isKey('todo_app')) {
					this.loggedIn = true
				} else {
					this.loggedIn = false
				}
			}
		}
	}
</script>
<style />
