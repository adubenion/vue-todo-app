var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GroupSchema = new Schema({
	name: {
		type: String,
		required: true,
		trime: true
	},
	isPrivate: {
		type: Boolean,
		required: true
	},
	associatedUsers: {
		type: Array
	}
})
var Group = mongoose.model('Group', GroupSchema)

module.exports = Group