var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MessageSchema = new Schema({
	to: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	read: {
		type: Boolean,
		required: true
	}
})
var Message = mongoose.model('Message', MessageSchema)

module.exports = Message