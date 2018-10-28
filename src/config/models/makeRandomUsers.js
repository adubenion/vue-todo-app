const faker = require('faker');

var fs = require('fs');

var obj = []

class User {
	constructor(email, username, password, passwordConf) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.passwordConf = passwordConf;
	}
}

function randomUser(email, username, password) {
	var email = faker.internet.email(),
	username = faker.internet.userName(),
	password = faker.internet.password(),
	user = {
		user: username,
		data: new User(email,username,password,password)
	}
	obj.push(user)

	return `User ${user.user} created.` 
}

for (var i = 0; i < 50; i++) {randomUser()}

var json = JSON.stringify(obj);
fs.writeFile('randomUsers.json', json, 'utf8', (error) => {if (!error){console.log('file made successfully')}else{console.log(error)}});
