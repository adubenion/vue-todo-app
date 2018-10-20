<template>
	<section class="section">
		<div class="container is-fluid has-text-centered">
			<label class="subtitle">
				Please enter a new ToDo 
				<div class="field is-grouped">
					<input id="input" class="input is-medium" :value="newTask" @input="handleInput($event)" @keyup.enter="addTask()"/>
					<button class="button is-info is is-medium" v-on:click="addTask()">ADD</button>	
				</div>
			</label>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Input',
		props: {
			newTask: String,
			addTask: Function,
		},
		data() {
			return {
				task: ''
			}
		},
		methods: {
			handleInput: function(event) {
				this.message = event.target.value
				this.$emit('input', this.message)
			}
		}
	}
</script>