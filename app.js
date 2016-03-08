"use strict";

let express = require("express");
let mongorito = require("mongorito");
let bodyParser = require("body-parser");
let co = require("co");
let db = require("./db");

let app = express();

app.use( express.static(__dirname + " /index.html") );
app.use( express.static(__dirname + "/public") );
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post("/login", (req, res) => {
	co(function*() {
		var user = yield db.User.findOne({ id: req.body.userId });

		if(user) {
			console.log(user);
			var password = user.get('pw');

			if(req.body.userPw == password) {
				res.json(user.get('_id'));
			} else {
				console.log('wrong password');
				res.json(false);
			}
		} else {
			console.log('no such user!');
			res.json(false);
		}
	})
})

app.get('/rooms', (req, res) => {
	co(function*() {
		var rooms = yield db.User.findOne({ id: req.body.userId}, {rooms: true});

		if(rooms) {
			console.log('there are rooms!');
		}
	})

})

app.get('/home', (request, response) => {
	console.log('im home!');
})

app.listen(8181, () => console.log( "Listening on 8181" ));
