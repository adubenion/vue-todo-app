<template>
	<div>
		<section class="section">
			<div class="container is-fluid has-text-centered">
				<p class="title is-5">
					Sign up
				</p>
			</div>
			<div class="container is-fluid">
				<p v-show="flags.success" class="message is-success has-text-centered">Sign-up successful!</p>
				<p v-show="flags.failure" class="message is-danger has-text-centered">Sign-up Unsuccessful. Please try again.</p>
				<label class="subtitle">
					E-Mail 
					<div class="field">
						<div class="control">
							<input type="email" class="input is-medium" v-model="email" @keyup.enter="handleSignUp()"/>
						</div>
					</div>
				</label>
				<p v-show="!validateEmail" class="message is-warning">must be valid email address</p>
				<label class="subtitle">
					Username 
					<div class="field">
						<div class="control">
							<input class="input is-medium" v-model="username" @keyup.enter="handleSignUp()"/>
						</div>
					</div>
				</label>
				<p v-show="!validateUsername" class="message is-warning">valid username is between 4 - 32 characters</p>
				<label class="subtitle">
					Password 
					<div class="field">
						<div class="control">
							<input type="password" class="input is-medium" v-model="password" @keyup.enter="handleSignUp()"/>
						</div>
					</div>
				</label>
				<label class="subtitle">
					Confirm Password 
					<div class="field">
						<div class="control">
							<input  type="password" class="input is-medium" v-model="confirm" @keyup.enter="handleSignUp()"/>
						</div>
					</div>
				</label>
				<p v-show="!validatePassword" class="message is-warning">passwords do not match</p>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-success is is-medium" v-on:click="handleSignUp()">Sign Up</button>
					</div>
					<div class="control">
						<router-link to="/login"><button class="button is-warning is is-danger">Cancel</button></router-link>
					</div>
				</div>		
			</div>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'SignUp',
		data() {
			return {
				email: '',
				username: '',
				password: '',
				confirm: '',
				flags: {
					success: false,
					failure: false
				}
			}
		},
		methods: {
			handleSignUp() {
				this.flags.failure = false
				this.flags.success = false
				if (this.validateEmail && this.validateUsername && this.validatePassword) {
					axios.post('http://localhost:3000/api/create_user', {
						email: this.email,
						username: this.username,
						password: this.password,
						passwordConf: this.confirm
					})
					.then(response => {
						if (!(response.status > 200)) {
							this.flags.success = true
							return this.$router.replace('/')
						}
					})
					.catch(e => {
						console.log(e.message)
					})
				} else {
					this.flags.failure = true
				}
			}
		},
		computed: {
			validateEmail: function() {
				if (this.email != '') {
					if (/^.[^@]*@.[^@]+\.[a-z]{2,6}$/.test(this.email)) {
						return true 
					} else {
						return false
					}
				} else {
					return true
				}
			},
			validateUsername: function() {
				if (this.username != '') {
					if (/^\w{4,32}$/.test(this.username)) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			},
			validatePassword: function() {
				if (this.password != '' && this.confirm != '') {
					if (this.password == this.confirm) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			}
		}
	}
</script>

<style>
	
</style>