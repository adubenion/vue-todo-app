<template>
  <div class="container is-fluid has-text-centered">
  	<h1 class="title is-3">Messages</h1>
  	<Messages />
  </div>
</template>

<script>
// @ is an alias to /src
	import Messages from '@/components/Messages.vue';
export default {
  name: 'messages',
  components: {
  	Messages
  }

}
</script>
