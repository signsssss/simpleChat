"use strict";

let express = require("express");
let mongorito = require("mongorito");
let bodyParser = require("body-parser");
let co = require("co");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let db = require("./db");

app.use( express.static(__dirname + "/public") );
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

io.on("connection", (socket) => {
	console.log('socket.io connected!');

	socket.on("join_room", (roomId) => {
		socket.join(roomId);
		console.log('user joined '+roomId);
	});

	socket.on("chat_message", (data) => {
		var log = {
			sender: data.userId,
			content: data.message,
			created: data.created
		}
		socket.broadcast.to(data.roomId).emit("chat_message" ,log);

		co(function*() {
			var room = yield db.Room.findOne({ _id: data.roomId });

			var logs = room.get('log');
			if( logs.length >= 100 ) {
				logs.unshift();
			}
			logs.push(log);

			yield room.set('log', logs);
			yield room.save();
		})
	})
});

app.post("/login", (req, res) => {
	co(function*() {
		var user = yield db.User.findOne({ id: req.body.userId });

		if(user) {
			var password = user.get('pw');

			if(req.body.userPw == password) {
				res.json(user.get());
			} else {
				console.log('wrong password');
				res.json(false);
			}
		} else {
			console.log('no such user!');
			res.json(false);
		}
	})
});

app.post('/join', (req, res) => {
	co(function*() {
		var dup = yield db.User.findOne({ id: req.body.userId });

		if(dup) {
			console.log('ID already exists');
			res.json(false);
		} else {
			var id = req.body.userId;
			var pw = req.body.userPw;

			var user = new db.User({
				id: id,
				pw: pw
			});

			yield user.save();

			res.json(user.get());
		}
	})
});

//get list of rooms
app.get('/rooms/:id', (req, res) => {
	co(function*() {
		var user = yield db.User.findOne({ id: req.params.id });

		var rooms = user.get('rooms');

		var result = [];
		if(rooms) {
			for (var i = 0; i < rooms.length; i++) {
				var room = rooms[i];

				result.push({
					friend: room.friend,
					accessed: room.accessed,
					roomId: room.roomId
				});
			}

			res.json(result);
		} else {
			res.json(false);
		}
	})
});

//add new room
app.post('/rooms', (req, res) => {
	co(function*() {
		var friend = yield db.User.findOne({ id: req.body.friendId });

		if(friend) {
			var room = new db.Room({
				created: Date.now(),
				accessed: Date.now(),
				participants: [req.body.friendId, req.body.userId]
			});

			yield room.save();

			var roomId = room.get('_id');
			var roomAccessed = room.get('accessed');

			console.log('room created: ' ,roomId);

			var user = yield db.User.findOne({id: req.body.userId});

			var uRooms = user.get('rooms');
			var fRooms = friend.get('rooms');

			if (fRooms) {
				fRooms.push({
					friend: user.get('id'),
					accessed: roomAccessed,
					roomId: roomId
				});
			} else {
				fRooms = [{friend: user.get('id'), accessed: roomAccessed, roomId: roomId}];
			}

			if (uRooms) {
				uRooms.push({
					friend: friend.get('id'),
					accessed: roomAccessed,
					roomId: roomId
				});
			} else {
				uRooms = [{friend: friend.get('id'), accessed: roomAccessed, roomId: roomId}];
			}

			yield friend.set('rooms', fRooms);
			yield friend.save();
			yield user.set('rooms', uRooms);
			yield user.save();

			res.json(user.get('rooms'));
		}
	})
});

//join the selected chatting room
app.get('/room/:roomId', (req, res) => {
	co(function*() {
		var room = yield db.Room.findOne({ _id: req.params.roomId });

		if(room) {
			var accessed = Date.now();

			//yield room.set('accessed', accessed);
			//yield room.save();

			var log = room.get('log');

			if(!log) {
				log = [ {sender: "system", content: "this is the start of a conversation with your friend! enjoy! ;)", created: Date.now()} ];

				yield room.set('log', log);
				yield room.save();
			}
		}

		res.json(log);
	})
});

app.get('/home', (request, response) => {
	console.log('im home!');
});

http.listen(8181, () => console.log( "Listening on 8181" ));
