var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
saltRounds = Number(process.env.SALT_WORK_FACTOR);

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
})
var User = mongoose.model('User', UserSchema);

module.exports = User;