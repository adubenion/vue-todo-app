<template>
  <div :class="{'is-active': addGroupModal}" class="modal">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box">
        <h1 class="subtitle">Create a Group!</h1>
        <label>
          Group Name
        </label>
        <div class="field is-grouped">
          <button class="button is-danger" @click="close">X</button>
          <input class="input" :value="addGroupName" @input="handleInput($event)" @keyup.enter="addGroupSubmit" placeholder="Please add a name for new group" >
          <button class="button is-success" @click="addGroupSubmit">Create</button>
          </input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import axios from 'axios';
  axios.defaults.withCredentials = true

export default {
  name: 'addGroup',
  props: {
    addGroupName: String,
    addGroupModal: Boolean
  },
  data() {
  	return {

  	}
  },
  methods: {
    close: function() {

      this.input = ''
      this.$emit('close', !this.addGroupModal)
      this.$emit('input', this.input)
    },
    handleInput: function(event) {
      this.input = event.target.value
      this.$emit('input', this.input)
    },
    addGroupSubmit: function() {
      axios.post('/todo-app/api/create_group/', {
        name: this.addGroupName, 
      },
      {
        headers: {
          token: this.$cookies.get('todo_app')
        }
      })
      .then(response => {
        return response.data
      })
      .catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>
