<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-3">Home</h1>
  	<Dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'home',
  components: {
    Dashboard
  }
}
</script>
