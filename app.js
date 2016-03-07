"use strict";

let express = require("express");
let app = express();

let mongorito = require("mongorito");

app.use( express.static(__dirname + " /index.html") );
app.use( express.static(__dirname + "/public") );

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

//app.get("/login", (request, response) => {
//	console.log('login');
//});

app.post("/login", (request, response) => {
	let user = request.params.name;
	console.log(user);
})

/*
app.get("/sports/:name", (request, response) => {
	let sportName = request.params.name;

	let sports = mongoUtil.sports();
	sports.find({name: sportName}).limit(1).next((err,doc) => {
		if(err) {
			response.sendStatus(400);
		}
		console.log( "Sport doc: ", doc );
		response.json(doc);
	});

});


app.post("/sports/:name/medals", jsonParser, (request, response) => {
	let sportName = request.params.name;
	let newMedal = request.body.medal || {};

	if(!newMedal.division || !newMedal.year || !newMedal.country){
		response.sendStatus(400);
	}

	let sports = mongoUtil.sports();
	let query = {name: sportName};
	let update = {$push: {goldMedals: newMedal}};

	sports.findOneAndUpdate(query, update, (err, res) => {
		if(err){
			response.sendStatus(400);
		}
		response.sendStatus(201);
	});
});*/


app.listen(8181, () => console.log( "Listening on 8181" ));
