<template>
		<section class="section">
			<div class="container is-fluid has-text-centered">
				<div v-if="tasks.length">
					<div v-if="incompleteTasks.length">            
	          <ul v-for="task in incompleteTasks" :key="task._id">
							<div class="card">
								<div class="card-content">
									<input class="checkbox is-right" type="checkbox" v-on:click="updateTask(task._id, task.completed)" v-model="task.completed"> 
										<li>
										<p class="subtitle">{{ task.description }}</p>
										</li>
									<input class="button is-danger" type="button" value="DELETE" v-on:click="deleteTask(task._id)">
								</div>
							</div>
	          </ul>
					</div>
					<p class="subtitle" v-else>
						All tasks have been completed!
					</p>
					<hr>
					<div v-if="completedTasks.length">            
	          <ul v-for="task in completedTasks" :key="task._id">
							<div class="card">
								<div class="card-content">
										<input class="checkbox" type="checkbox" v-model="task.completed" v-on:click="updateTask(task._id, task.completed)">
										<li>
										<p class="subtitle">{{ task.description }} </p>
										</li>
									<input class="button is-info" type="button" value="DONE" v-on:click="deleteTask(task._id)">
								</div>
							</div>
	          </ul>
					</div>
				</div>
				<div v-else>
					There are no tasks yet
				</div>
			</div>
		</section>
</template>

<script>

	export default {
		name: 'List',
		props: {
			tasks: Array,
			completedTasks: Array,
			incompleteTasks: Array,
			updateTask: Function,
			deleteTask: Function
		}
	}
</script>