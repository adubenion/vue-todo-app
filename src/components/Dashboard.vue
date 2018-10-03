<template>
  <div>
  	<h1 class="title is-4">Dashboard</h1>
  	<h1 class="title is-4">Todos</h1>
  	<h1 class="title is-4">Friends/Activity</h1>
  	<h1 class="title is-4">Groups</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue';

export default {
  name: 'dashboard',
  components: {
    Todo
  }
}
</script>
