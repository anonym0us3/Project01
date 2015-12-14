// SERVER-SIDE JAVASCRIPT

// Requiring express in the app
var express = require('express');
// Generating new express app called "app"
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Serving static files from the public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
************/

var db = require("./models");

/**********
 * ROUTES *
**********/

/*
 * HTML Endpoints
 */

 app.get('/', function homepage (req, res) {
 	res.sendFile(__dirname + '/views/prospects.html');
 });


 /*
 * JSON API Endpoints
 */

app.get('/api/prospects', function prospectsIndex (req, res) {
	db.Prospect.find({}, function(err, prospects) {
		res.json(prospects);
	});
});


app.post('/api/prospects', function prospectCreate (req, res) {
	console.logo('body', req.body);

	db.Prospect.create(req.body, function(err, prospect) {
		if (err) { console.log('ERROR', err); }
		console.log(prospect);
		res.json(prospect);
	});
});


app.get('/api/prospects/:id', function prospectShow(req, res) {
	console.log('requested prospect id= ', req.params.id);
	db.Prospect.findOne({_id: req.params.id}, function(err, prospect) {
		res.json(prospect);
	});
});


app.post('/api/prospects/:prospectId/wishlists', function wishlistsCreate(req, res) {
	console.log('body', req.body);
	db.Prospect.findOne({_id: req.params.prospectId}, function(err, prospect) {
		if (err) { console.log('ERROR', err); }

		var wishlist = new db.Wishlist(req.body);
		prospect.wishlists.push(wishlist);
		prospect.save(function(err, savedProspect) {
			if (err) { console.log('ERROR', err); }
			console.log('prospect with new wishlist saved: ', savedProspect);
			res.json(wishlist);
		});
	});
});


app.delete('/api/prospects/:id', function prospectDelete(req, res) {
	console.log('deleting prospect id: ', req.params.id);
	db.Prospect.remove({_id: req.params.id}, function (err) {
		if (err) { console.log('ERROR', err); }
		console.log('prospect deleted');
		res.status(204).send();
	});
});



/***********
 * SERVER * 
***********/

// listen on port 4000
app.listen(process.env.PORT || 4000, function () {
	console.log('Express server is running on http://localhost:4000/');
});