<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-3">Groups</h1>
  	<Groups />
  </div>
</template>

<script>
// @ is an alias to /src
import Groups from '@/components/Groups.vue';

export default {
  name: 'groups',
  components: {
  	Groups
  }

}
</script>
