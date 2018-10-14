var mongoose = require('mongoose'),
Schema = mongoose.Schema

var TodoSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  user: {
  	type: Schema.Types.ObjectId,
    ref: "User",
  	required: true
  }
});
var Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;