var mongoose = require('mongoose');

var user = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String
}, {collection: 'users'});

var Users = mongoose.model('Users', user);

module.exports = Users;