<template>
	<div>
		<Input :addTask="addTask" :newTask="newTask" @input="newTask = $event" />
		<List 
		:tasks="tasks" 
		:completedTasks="completedTasks" 
		:incompleteTasks="incompleteTasks"
		:updateTask="updateTask"
		:deleteTask="deleteTask">
		</List>
	</div>
</template>

<script>
	import axios from 'axios';
	axios.defaults.withCredentials = true
	import 'bulma/css/bulma.css';

	import Header from './Header.vue';
	import Input from './Input.vue';
	import List from './List.vue';
	import SignUp from './SignUp.vue';


	export default {
		name: 'Todo',
		components: {
			Header,
			Input,
			List,
			SignUp
		},
		data () {
			return {
				newTask: '',
				tasks: [],
				username: 'username',
				password: 'password'
			}
		},
		created: function() {
				this.getTask()
		},
		methods: {
			getTask: function() {
				axios.get('/todo-app/api/todo/', {headers: {'token':this.$cookies.get('todo_app')}})
				.then(response => {
					return response.data
				})
				.then(data => {
					this.tasks = data
				})
				.catch(e => {
					console.log(e.message)
				})
			},
			addTask: function() {
				axios.post('/todo-app/api/create_todo/', {
					description: this.newTask, 
					completed: false
				},
				{
					headers: {
						token: this.$cookies.get('todo_app')
					}
				})
				.then(response => {
					if (!(response.status > 200)) {
						this.newTask = ''
						return this.getTask()
					}
				})
				.catch(e => {
					console.log(e.message)
				})
			},
			updateTask: function(id, completed) {
				axios.put('/todo-app/api/update_todo/', {
					_id: id,
					completed: !completed
				},
				{
					headers: {
						token: this.$cookies.get('todo_app')
					}
				})
				.then(response => {
					if (!(response.status > 200)) {
						return this.getTask()
					}
				})
				.catch(e => {
					console.log(e.message)
				})
			},
			deleteTask: function(id) {	
				axios.delete('/todo-app/api/delete_todo/', {
					data: {
						_id: id,
						token: this.$cookies.get('todo_app')
					}
				})
				.then(response => {
					if (!(response.status > 200)) {
						return this.getTask()
					}
				})
				.catch(e => {
					console.log(e.message)
				})
			}
		},
		computed: {
			completedTasks: function () {
				return this.tasks.filter(task => task.completed)
			},
			incompleteTasks: function () {
				return this.tasks.filter(task => !task.completed)
			}
		}
	}
</script>

<style type="text/css">
	.card {
		max-width: 800px;
		margin: 10px auto 10px auto;
	}

	.checkbox {
		height: 25px;
		width: 25px;
		display: block;
	}

	.section {
		max-width: 800px;
		margin: 0 auto;
	}

	hr {
		max-width: 800px;
		margin: 30px auto 30px auto;
		height: 5px;
		background-color: grey;
	}
</style>