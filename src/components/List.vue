<template>
		<section class="section">
			<div class="container is-fluid has-text-centered">
				<div v-if="tasks.length">
					<div v-if="incompleteTasks.length">            
	          <ul v-for="task in incompleteTasks" :key="task._id">
							<div class="card">
								<div class="card-content">
									<li>
									<p class="subtitle">{{ task.description }}</p>
									</li>
								</div>
		            <footer class="card-footer">
		              <a class="card-footer-item" @click="updateTask(task._id, task.completed)" v-model="task.completed">Completed</a>
		              <a class="card-footer-item" @click="deleteTask(task._id)">Delete</a>
		            </footer>
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
									<li>
									<p class="subtitle">{{ task.description }} </p>
									</li>
								</div>
		            <footer class="card-footer">
		              <a class="card-footer-item" @click="updateTask(task._id, task.completed)" v-model="task.completed">Do Again</a>
		              <a class="card-footer-item" @click="deleteTask(task._id)">Delete</a>
		            </footer>
							</div>
	          </ul>
					</div>
				</div>
				<div v-else>
					<div class="card">
						<div class="card-content">
							<p class="subtitle">There are no todos yet</p>
						</div>
					</div>
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