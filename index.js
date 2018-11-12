var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var md5 = require('md5');

var app = express();

app.use(session({secret: 'asdfzxcv', saveUninitialized: false, resave: true}));
app.use(express.static(__dirname+'/dist/logs'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db = require('./config/database');
var Users = require('./config/usermodel');


app.post('/signup', function(req, res) {
	mongoose.connect(db.url, function(err) {
		if(err)
			return console.log(err);
		else {
			Users.find({email: req.body.email}, function(err, docs) {
				if(docs.length) {
					console.log('Exists');
					res.send(null);
				}
				else {
					var newUser = new Users ({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: md5(req.body.password)
					});
					newUser.save(function(err, data) {
						if(err)
							console.log(err);
						else {
							console.log('New User Added');
							req.session.logged = data._id;
							res.send(JSON.stringify(data));
						}
					});
				}
			});
		}
	});
});

app.post('/login', function(req, res) {
	mongoose.connect(db.url, function(err1) {
		if(err1)
			return console.log(err1);
		else {
			Users.findOne({email: req.body.email, password: md5(req.body.password)}, function(err2, docs) {
				if(err2)
					return console.log(err2)
				else {
					if(docs)
						req.session.logged = docs._id;
					res.send(JSON.stringify(docs));
				}
			});
		}
	});
});

app.post('/checkSession', function(req, res) {
	if(req.session.logged) {
		mongoose.connect(db.url, function(err) {
			if(err)
				return console.log(err);
			else {
				Users.findOne({_id: req.session.logged}, function(err, docs) {
					if(err)
						return console.log(err);
					else {
						res.send(JSON.stringify(docs));
					}
				});
			}
		});
	}
	else {
		res.send(null);
	}
});

app.post('/logout', function(req, res) {
	req.session.logged = "";
	res.send(true);
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname+'/dist/logs/index.html'));
});

app.listen(process.env.PORT || 4200, function(req, res) { 
	console.log('Listening at PORT 4200');
});