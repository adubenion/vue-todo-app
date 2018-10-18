require('dotenv').config()

// SERVER REQS
var express = require('express'),
http = require('http'),
mongoose = require('mongoose'),
Schema = mongoose.Schema
ObjectId = require('mongodb').ObjectID;
bodyparser = require('body-parser'),
cors = require('cors'),
jwt = require('jsonwebtoken'),
secret = String(process.env.SECRET_KEY),
cookieParser = require('cookie-parser'),
bcrypt = require('bcrypt'),
saltRounds = Number(process.env.SALT_WORK_FACTOR),

// MODELS
Todo = require('./models/todoModel'),
User = require('./models/userModel'),
Friend = require('./models/friendModel'),
Group = require('./models/groupModel'),
Message = require('./models/messageModel');

// SERVER
var app = express(),
server = http.createServer(app)

// CONFIG
app.use(bodyparser.json());
app.use(cors({credentials: true, origin: `${process.env.CORS_ORIGIN_DEV}`}));
app.use(cookieParser())



// TODO
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
			Todo.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {completed: completed}}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
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
			Todo.findOneAndDelete({_id: new ObjectId(id) }, (err, result) => {if (!err){res.send(result)}else{next(err)}})
		} else {
			next(err)
		}
	})
})
app.get('/api/group_todo/:group', (req, res, next) => {
	var token = req.cookies.todo_app;
	var groupName = req.params.group;
	var id ;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Group.findOne({name: groupName}, (err, result) => {
				if (!err) {
					id = result._id
					Todo.find({user: new ObjectId(id)}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
				} else {
					res.json({error: 'Group ' + groupName + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})
app.post('/api/create_group_todo/:group', (req, res, next) => {
	var token = req.cookies.todo_app;
	var groupName = req.params.group
	var id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Group.findOne({name: groupName}, (err, result) => {
				if (!err) {
					id = result._id
					var todo ={
						description: req.body.description,
						completed: req.body.completed,
						user: id
					}
					Todo.create(todo, (err, result) => {if (!err){res.send(result)}else{next(err)}})
				} else {
					res.json({error: 'Group ' + groupName + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})
app.put('/api/update_group_todo/:group', (req, res,next) => {
	var token = req.cookies.todo_app;
	var id = req.body._id;
	var groupName = req.params.group;
	var completed = req.body.completed;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Group.findOne({name: groupName}, (err, result) => {
				if (!err) {
					Todo.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {completed: completed}}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
				} else {
					res.json({error: 'Group ' + groupName + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})
app.delete('/api/delete_group_todo/:group', (req, res,next) => {
	var token = req.cookies.todo_app;
	var groupName = req.params.group;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Group.findOne({name: groupName}, (err, result) => {
				if (!err) {
					Todo.findOneAndDelete({_id: new ObjectId(id) }, (err, result) => {if (!err){res.send(result)}else{next(err)}})
				} else {
					res.json({error: 'Group ' + groupName + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})

// USER
app.get('/api/user/:username/', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			User.findOne({username: req.params.username}, (err, ok) => {
				if (ok) {
					res.json({success: 'User Found'})
				} else {
					res.json({error: 'User, ' + req.params.username + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
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
app.put('/api/update_user:id', (req,res) => {
	res.send('<h1>Updating user...</h1>')
})
app.delete('/api/delete_user', (req,res) => {
	res.send('<h1>Deleting user...</h1>')
})

// FRIEND
app.get('/api/friends/', (req,res,next) => {
	var token = req.cookies.todo_app
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var agg = Friend.find(
				{
					$or: [
					{requestingUser: new ObjectId(decodedToken.id)},
					{requestedUser: new ObjectId(decodedToken.id)}
					]
				}
			).populate({
				path: 'requestingUser',
				select: '-_id -password -email'
			}).populate({
				path: 'requestedUser',
				select: '-_id -password -email'
			})
			agg.exec((err, result) => {
				res.json(result)
			})
		} else {
			next(err)
		}
	})
})
app.post('/api/friends/send_request/', (req,res,next) => {
	console.log(req.body)
	var token = req.cookies.todo_app,
	action = req.body.action,
	reqUser = req.body.requestedUser;
	let reqUserId
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			if (action && action === 'request') {
				User.findOne({username: reqUser}, (err, result) => {
					friend = {
						requestingUser: new ObjectId(decodedToken.id),
						requestedUser: new ObjectId(result._id),
						requestAccepted: false,
						association: [reqUser, decodedToken.username],
						friends: false
					}
					Friend.create(friend, (err,result) => {
						res.send(result)
					})
				})
			} else {
				res.json({error: err})
			}
		} else {
			next(err)
		}
	})
})
app.put('/api/friends/accept_request/', (req,res,next) => {
	console.log(req.body)
	var token = req.cookies.todo_app,
	action = req.body.action,
	friendId = req.body._id
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			if (action && action === 'accept') {
				Friend.findOneAndUpdate({_id: new ObjectId(friendId)}, {$set: {requestAccepted: true, friends: true}}, (err, result) => {
					if (!err) {

						res.json({success: 'request accepted'})
					} else {
						res.json({error: 'requested action does not match request'})
					}
				})
			} else {
				res.json({error: err})
			}
		} else {
			next(err)
		}
	})
})
app.delete('/api/friends/unfriend/', (req,res,next) => {
	console.log(req.body)
	var token = req.cookies.todo_app,
	action = req.body.action,
	friendId = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			if (action && action === 'unfriend') {
				Friend.findOneAndDelete({_id: new ObjectId(friendId)}, (err, result) => {if (!err){res.send(result)}else{next(err)}})
			} else {
				res.json({error: 'requested action does not match request'})
			}
		} else {
			next(err)
		}
	})
})

// GROUP
app.get('/api/groups/', (req,res,next) => {
	var token = req.cookies.todo_app
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var agg = Group.aggregate(
				[
					{
						$match: {associatedUsers: decodedToken.username}
					}
				]
			)
			agg.exec((err, result) => {
				res.send(result)
			})
		} else {
			next(err)
		}
	})
})
app.get('/api/groups/:group/', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			Group.findOne({name: req.params.group}, (err, ok) => {
				if (ok) {
					res.json({success: 'Group Found'})
				} else {
					res.json({error: 'Group page, ' + req.params.group + ' Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})
app.post('/api/create_group/', (req, res, next) => {
	var token = req.cookies.todo_app;
	var groupName = req.body.name
	var id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var group = {
				name: groupName,
				isPrivate: true,
				associatedUsers: [decodedToken.username]
			}
			Group.create(group, (err, result) => {
				if (!err) {
					res.json({success: 'group created'})
				} else {
					res.json({error: err})
				}
			})
		} else {
			next(err)
		}
	})
})
app.put('/api/groups/join_group/:group', (req,res,next) => {
	console.log(req.body)
	var token = req.cookies.todo_app,
	user = req.body.addedUser,
	group = req.params.group,
	action = req.body.action
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			if (action && action === 'join group') {
				Group.findOneAndUpdate({name: group}, {$addToSet: {associatedUsers: user}}, (err, result) => {
					if (!err) {

						res.json({success: 'joined group'})
					} else {
						res.json({error: 'requested action does not match request'})
					}
				})
			} else {
				res.json({error: err})
			}
		} else {
			next(err)
		}
	})
})
app.put('/api/groups/leave_group/:group', (req,res,next) => {
	console.log(req.body)
	var token = req.cookies.todo_app,
	user = req.body.removedUser,
	group = req.params.group,
	action = req.body.action
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			if (action && action === 'leave group') {
				Group.findOneAndUpdate({name: group}, {$pull: {associatedUsers: user}}, (err, result) => {
					if (!err) {

						res.json({success: 'removed from group'})
					} else {
						res.json({error: 'requested action does not match request'})
					}
				})
			} else {
				res.json({error: err})
			}
		} else {
			next(err)
		}
	})
})

// MESSAGE
app.get('/api/messages/', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			User.findOne({_id: new ObjectId(`${decodedToken.id}`)}, (err, ok) => {
				if (ok._id !== null && String(ok._id) === decodedToken.id) {
					Message.find({to: ok.username}, (err, result) => {
						if (!err) {
							res.json({success: 'User Found', message: result})
						} else {
							res.json({error: 'User Not Found'})
						}
					})
				} else {
					res.json({error: 'User Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})
app.get('/api/messages/:_id/', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			User.findOne({_id: new ObjectId(`${decodedToken.id}`)}, (err, ok) => {
				if (ok._id !== null && ok._id === new ObjectId(decodedToken.id)) {
					Message.findOne({_id: new ObjectId(req.params._id), to: ok.username}, (err, result) => {
						if (!err) {
							res.json({success: 'User Found', message: result})
						} else {
							res.json({error: 'Message Not Found'})
						}
					})
				} else {
					res.json({error: 'User Not Found'})
				}
			})
		} else {
			next(err)
		}
	})
})

// AUTH
app.post('/login/do/', (req,res,next) => {
	var userData = {
		username: req.body.username
	}
	User.findOne(userData, (err, user) => {
		if (user !== null) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				var token = jwt.sign({id: user._id, username: user.username}, secret, {expiresIn:'1h'});
				res.json({status:"success", token:token})
			} else {
				res.json({status:"error", message: "Invalid email/password!!!", data:null})
			}
		} else {
			res.json({status:"error", message: "Invalid email/password!!!", data:null})
		}
	}).catch(e => console.log(e))
})
app.get('/auth/', (req,res,next) => {
	var token = req.cookies.todo_app
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var id = decodedToken.id
			res.status(200).json({auth: decodedToken.username})
		} else {
			res.status(500).send(err)
			next()
		}
	})
})

// APP UTILS
app.get('/api/search/', (req,res,next) => {
	var token = req.cookies.todo_app;
	var q = req.headers.search
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			search = []
			var userAgg = User.aggregate([{$match:{username: new RegExp(`${q}`, "gi")}}, {$project: {email: 0, password: 0}}])
			var friendsAgg = Friend.aggregate([{$match:{$and: [{association: new RegExp(`${q}`, "gi")},{association: decodedToken.username}]}}, {$project: {_id: 1, association: 1}}])
			var groupsAgg = Group.aggregate([{$match:{name: new RegExp(`${q}`, "gi")}}])
			var todosAgg = Todo.aggregate([{$match: {$and: [{description: new RegExp(`${q}`, "gi")},{user: new ObjectId(decodedToken.id)}]}}, {$project: {email: 0, password: 0}}])
			var currentUser = User.aggregate([{$match:{description: new RegExp(`${q}`, "gi")}}, {$project: {username: 1}}])
			userAgg.exec((err, result) => {
				search.push(result)
				friendsAgg.exec((err, result) => {
					search.push(result)
					groupsAgg.exec((err, result) => {
						search.push(result)
						todosAgg.exec((err, result) => {
							search.push(result)
							currentUser.exec((err,result) => {
								search.push(result)
								res.send(search)
							})
						})
					})
				})
			})
		} else {
			next(err)
		}
	})
})
app.get('/api/dashboard/', (req,res,next) => {
	var token = req.cookies.todo_app;
	var q = req.headers.search
	id = req.body._id;
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var agg = User.aggregate(
				[
					{
						$match:	{_id: new ObjectId(decodedToken.id)}
					}, 
					{
						$lookup: {from: "messages", localField: "_id", foreignField: "from", as: "messages_from_user"}
					},
					{
						$lookup: {from: "groups", localField:"username", foreignField: "associatedUsers", as: "user_groups"}
					},
					{
						$lookup: {from: "friends", localField: "username", foreignField: "association", as: "friend_docs"}
					},
					{
						$lookup: {from: "todos", localField: "_id", foreignField: "user", as: "todo_docs"}
					},
					{$project: {email: 0, password: 0}}
				]
			)
			agg.exec((err, result) => {
				res.send(result)
			})
		} else {
			next(err)
		}
	})
})
app.get('/api/user_profile/:username', (req,res,next) => {
	var token = req.cookies.todo_app;
	id = req.body._id;
	reqUser = req.params.username
	jwt.verify(token, secret, (err, decodedToken) => {
		if (!err) {
			var agg = User.aggregate(
				[
					{
						$match:	{username: reqUser}
					}, 
					{
						$lookup: {from: "messages", localField: "_id", foreignField: "from", as: "messages_from_user"}
					},
					{
						$lookup: {from: "groups", localField:"username", foreignField: "associatedUsers", as: "user_groups"}
					},
					{
						$lookup: {from: "friends", localField: "username", foreignField: "association", as: "friend_docs"}
					},
					{
						$lookup: {from: "todos", localField: "_id", foreignField: "user", as: "todo_docs"}
					},
					{$project: {email: 0, password: 0}}
				]
			)
			agg.exec((err, result) => {
				res.send(result)
			})
		} else {
			next(err)
		}
	})
})

// MONGOOSE/SERVER PROCESS
mongoose.connect(process.env.MONGO_DB_URI_DEV, { useNewUrlParser: true }, err => {
	if (!err) {console.log('connected to db')} 
	else {console.log(err)}
})
.catch(e => console.log(e.message))
server.listen(process.env.API_PORT, () => {
	console.log('app running on port 3000...')
})