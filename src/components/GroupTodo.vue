<template>
	<div>
		<GroupTodoInput :addTask="addTask" :newTask="newTask" @input="newTask = $event" />
		<GroupTodoList 
		:tasks="tasks" 
		:completedTasks="completedTasks" 
		:incompleteTasks="incompleteTasks"
		:updateTask="updateTask"
		:deleteTask="deleteTask" />
	</div>
</template>

<script>
	import axios from 'axios';
	axios.defaults.withCredentials = true
	import 'bulma/css/bulma.css';

	import GroupTodoInput from './GroupTodoInput.vue';
	import GroupTodoList from './GroupTodoList.vue';


	export default {
		name: 'GroupTodo',
		components: {
			GroupTodoInput,
			GroupTodoList
		},
		data () {
			return {
				newTask: '',
				tasks: [],
			}
		},
		created: function() {
				this.getTask()
		},
		methods: {
			getTask: function() {
				axios.get('/todo-app/api/group_todo/' + this.$route.params.group, {headers: {'token':this.$cookies.get('todo_app')}})
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
				axios.post('/todo-app/api/create_group_todo/' + this.$route.params.group, {
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
				axios.put('/todo-app/api/update_group_todo/' + this.$route.params.group, {
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
				axios.delete('/todo-app/api/delete_group_todo/' + this.$route.params.group, {
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