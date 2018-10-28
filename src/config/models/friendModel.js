var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var FriendSchema = new Schema({
	requestingUser: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	requestedUser: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	requestAccepted: {
		type: Boolean,
		required: true
	},
	association: {
		type: Array,
		required: true
	},
	friends: {
		type: Boolean,
		required: true
	}
})
var Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend;