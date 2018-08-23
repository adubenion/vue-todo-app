<template>
	<div>
		<section class="hero is-info is-bold">
			<div class="hero-body">
				<div class="container is-fluid has-text-centered">
					<h1 class="title">{{ title }}</h1>				
				</div>				
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		props: ['title'],
		data() {
			title: 'ToDo List'
		}
	}
</script>