require('dotenv').config()
var express = require('express'),
mongoose = require('mongoose'),
Schema = mongoose.Schema
ObjectId = require('mongodb').ObjectID;
bodyparser = require('body-parser'),
cors = require('cors'),
jwt = require('jsonwebtoken'),
secret = String(process.env.SECRET_KEY),
cookieParser = require('cookie-parser'),
bcrypt = require('bcrypt'),
saltRounds = Number(process.env.SALT_WORK_FACTOR);


var app = express()
var db


app.use(bodyparser.json());
app.use(cors({credentials: true, origin: `${process.env.CORS_ORIGIN_DEV}`}));
app.use(cookieParser())



// TODO
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
  	required: true
  }
});
var Todo = mongoose.model('Todo', TodoSchema)

app.get('/api/todo/', (req, res, next) => {
	var token = req.cookies.todo_app;
	var id 
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			id = decodedToken.id
			Todo.find({user: new ObjectId(id)}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})
app.post('/api/create_todo/', (req, res, next) => {
	var token = req.cookies.todo_app;
	var id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			id = decodedToken.id
			var todo ={
				description: req.body.description,
				completed: req.body.completed,
				user: id
			}
			Todo.create(todo, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})
app.put('/api/update_todo/', (req, res,next) => {
	var token = req.cookies.todo_app;
	var id = req.body._id;
	var completed = req.body.completed;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Todo.updateOne({_id: new ObjectId(id)}, {$set: {completed: completed}}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})
app.delete('/api/delete_todo/', (req, res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Todo.deleteOne({_id: new ObjectId(id) }, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})

// USER / AUTH
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

var FriendSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId
	},
	friendUsername: {
		type: String,
		required: true
	},
	requestAccepted: {
		type: Boolean,
		required: true
	}
})
var Friend = mongoose.model('Friend', FriendSchema)

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

var MessageSchema = new Schema({
	to: {
		type: String,
		required: true
	},
	from: {
		type: Schema.Types.ObjectId,
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

app.post('/login/do', (req,res,next) => {
	var userData = {
		username: req.body.username
	}
	User.findOne(userData, (err, user) => {
		if (user !== null) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				var token = jwt.sign({id: user._id}, secret, {expiresIn:'1h'});
				res.json({status:"success", message: "user found!!!", data:{user: {_id:user._id, email:user.email,username:user.username}, token:token}})
			} else {
				res.json({status:"error", message: "Invalid email/password!!!", data:null})
			}
		} else {
			res.json({status:"error", message: "Invalid email/password!!!", data:null})
		}
	}).catch(e => console.log(e))
})
app.post('/api/create_user', (req,res,next) => {
	if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
		var userData = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
		}
		console.log(userData)
		User.create(userData,(err, result) => {if (!err){res.send(result)}else{(next(err))}})
	} else {
		next()
	}
})
app.get('/api/search_users/', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			User.find({username: new RegExp(`${req.headers.search}`)}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})
app.put('/api/update_user:id', (req,res) => {
	res.send('<h1>Updating user...</h1>')
})
app.delete('/api/delete_user', (req,res) => {
	res.send('<h1>Deleting user...</h1>')
})

app.get('/auth', (req,res,next) => {
	var token = req.cookies.todo_app
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			id = decodedToken.id
			res.status(200).send('auth')
		} else {
			res.status(500).send(err)
			next()
		}
	})
})

mongoose.connect(process.env.MONGO_DB_URI_DEV, { useNewUrlParser: true }, err => {
	if (!err) {console.log('connected to db')} 
	else {console.log(err)}
})
.catch(e => console.log(e.message))
app.listen(process.env.API_PORT, () => {
	console.log('app running on port 3000...')
})		