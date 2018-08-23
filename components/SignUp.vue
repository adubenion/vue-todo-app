<template>
	<div class="container is-fluid has-text-centered">
		<label class="subtitle">
			Username 
			<div class="field is-grouped">
				<div class="control">
					<input id="input "class="input is-medium" v-model="username" @keyup.enter="login()"/>
				</div>
			</div>
		</label>
		<label class="subtitle">
			Password 
			<div class="field is-grouped">
				<div class="control">
					<input id="input "class="input is-medium" v-model="password" @keyup.enter="handleLogin()"/>
				</div>
			</div>
		</label>		
	</div>
</template>

<script>
	export default {
		name: 'SignUp'
	}
</script>

<style>
	
</style>