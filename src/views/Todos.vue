<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-3">Todos</h1>
  	<Todo />
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue';

export default {
  name: 'todos',
  components: {
    Todo
  }
}
</script>
