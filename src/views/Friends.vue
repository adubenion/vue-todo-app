<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-3">Friends</h1>
  	<Friends />
  </div>
</template>

<script>
// @ is an alias to /src
import Friends from '@/components/Friends.vue'

export default {
  name: 'friends',
  components: {
  	Friends
  }
}
</script>
