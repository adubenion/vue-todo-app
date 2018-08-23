<template>
	<div>
		<section class="section">
			<div  class="container is-fluid has-text-centered">
				<p class="title is-5">
					Got an Account? Login! If not, sign up <router-link to="/sign-up">here</router-link>!
				</p>
			</div>
			<div class="container is-fluid">
				<p v-show="flag.incorrectLogin" class="message is-danger has-text-centered">Username or Password is incorrect. Please try again.</p>
				<label class="subtitle">
					Username 
					<div class="field">
						<div class="control">
							<input name="username" type="email" class="input is-medium" v-model="username" @keyup.enter="handleLogin()" />
						</div>
					</div>
				</label>
				<label class="subtitle">
					Password 
					<div class="field">
						<div class="control">
							<input type="password" class="input is-medium" v-model="password" @keyup.enter="handleLogin()"/>
						</div>
					</div>
				</label>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-success is is-medium" v-on:click="handleLogin()">Login</button>
						<p>Forgot password?</p>
					</div>
<!-- 					<div class="control">
						<button class="button is-danger is-medium">Forgot Password</button>
					</div> -->
				</div>	
			</div>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'Login',
		props: {
			loggedIn: Boolean,
			user: String
		},
		data() {
			return{
				username: '',
				password: '',
				flag: {
					incorrectLogin: false
				}
			}
		},
		methods: {
			handleLogin: function () {
				if (this.username != '' && this.password != '') {
					axios.post('http://localhost:3000/login/do', {
						username: this.username,
						password: this.password
					}).then(response => {
						return response.data.data
					}).then(data => {
						if (data !== null) {
							this.$cookies.set('todo_app', `${data.token}`, '1H')
							this.username = data.user.username
							this.$emit('welcome', this.username)
							this.message = true
							this.$emit('login', this.message)
							return this.$router.replace('/')
						} else {
							this.flag.incorrectLogin = true
							this.username = ''
							this.password = ''
						}
					}).catch(e => {console.log(e.message)})
				}
			}
		}
	}
</script>

<style>
	
</style>