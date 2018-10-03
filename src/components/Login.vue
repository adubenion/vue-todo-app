<template>
	<div>
		<div  class="container is-fluid has-text-centered">
			<p class="title is-5">
				Got an Account? Login! If not, sign up <a href="">here</a>!
			</p>
		</div>
		<section class="section">
			<div class="container is-fluid">
				<label class="subtitle">
					Username 
					<div class="field is-grouped">
						<div class="control">
							<input id="input "class="input is-medium" :value="username" @input="handleInput()" @keyup.enter="login()"/>
						</div>
					</div>
				</label>
				<label class="subtitle">
					Password 
					<div class="field is-grouped">
						<div class="control">
							<input id="input "class="input is-medium" :value="password" @input="handleInput()" @keyup.enter="login()"/>
						</div>
					</div>
				</label>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-success is is-medium" v-on:click="login()">Login</button>
					</div>
					<div class="control">
						<button class="button is-danger is is-medium" v-on:click="forgotPassword()">Forgot Password</button>
					</div>
				</div>	
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: {
			username: String,
			password: String,
			login: Function,
			loggedIn: Boolean
		},
		methods: {
			handleInput: function() {
				this.message = event.target.value
				this.$emit('input', this.message)
			}
		}
	}
</script>

<style>
	
</style>