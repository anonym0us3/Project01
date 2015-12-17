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


 app.get('/api', function api_index (req, res){
   res.json({
     message: "Welcome to carTopiary!",
     documentation_url: "https://github.com/anonym0us3/Project01/blob/master/README.md",
     // base_url: "http://tunely.herokuapp.com",
     endpoints: [
       {method: "GET", path: "/api", description: "Describes available endpoints"}
     ]
   });
 });


// Reading all prospects
app.get('/api/prospects', function prospectsIndex (req, res) {
	db.Prospect.find({}, function(err, prospects) {
		res.json(prospects);
	});
});


// Creating a new prospect
app.post('/api/prospects', function prospectCreate (req, res) {
	console.log('body', req.body);

	db.Prospect.create(req.body, function(err, prospect) {
		if (err) { console.log('ERROR', err); }
		console.log(prospect);
		res.json(prospect);
	});
});


// Reading a single prospect by its ID
app.get('/api/prospects/:id', function prospectShow(req, res) {
	console.log('requested prospect id =', req.params.id);
	db.Prospect.findOne({_id: req.params.id}, function(err, prospect) {
		res.json(prospect);
	});
});


// Reading the vehicles (wishlists) for a single prospect by its ID
app.get('/api/prospects/:id/wishlists', function wishlistIndex (req, res) {
	db.Prospect.findOne({_id: req.params.id}, function(err, prospect) {
		res.json(prospect.wishlists);
	});
});


// Creating a new vehicle (wishlist) entry for a single prospect
app.post('/api/prospects/:id/wishlists', function wishlistsCreate(req, res) {
	console.log('body', req.body);
	db.Prospect.findOne({_id: req.params.id}, function(err, prospect) {
		if (err) { console.log('ERROR', err); }

		var wishlist = new db.Wishlist(req.body);
		prospect.wishlists.push(wishlist);
		prospect.save(function(err, savedProspect) {
			if (err) { console.log('ERROR', err); }
			console.log('prospect with new car saved:', savedProspect);
			res.json(wishlist);
		});
	});

});


// Delete a single prospect by its ID
app.delete('/api/prospects/:id', function prospectDelete(req, res) {
	console.log('deleting id:', req.params.id);
	db.Prospect.remove({_id: req.params.id}, function (err) {
		if (err) { console.log('ERROR', err); }
		console.log('prospect deleted');
		res.status(204).send();
	});
});


// Update a single prospect by its ID
app.put('/api/prospects/:id', function updateProspect(req, res) {
  console.log('updating id ', req.params.id);
  console.log('received body ', req.body);

  db.Prospect.findOne({_id: req.params.id}, function(err, foundProspect) {
    if (err) { console.log('error', err); }
    foundProspect.name = req.body.name;
    foundProspect.phone = req.body.phone;
    foundProspect.email = req.body.email;
    foundProspect.address = req.body.address;
    foundProspect.save(function(err, saved) {
      if(err) { console.log('ERROR', err); }
      res.json(saved);
    });
  });
});


// Updating single car (wishlist item) for a single prospect
app.put('/api/prospects/:prospectId/wishlists/:id', function updateCar(req, res) {
	var prospectId = req.params.prospectId;
	var wishlistId = req.params.id;
	db.Prospect.findOne({_id: prospectId}, function (err, foundProspect) {
		// Finding the individial car embedded within prospect
		var foundWishlist = foundProspect.wishlists.id(wishlistId);
		foundWishlist.make = req.body.make;
		foundWishlist.model = req.body.model;
		foundWishlist.year = req.body.year;
		foundWishlist.color = req.body.color;				
		foundWishlist.style = req.body.style;


		// Saving the updates/changes
		foundProspect.save(function(err, saved) {
			if (err) { console.log('ERROR', err); }
			res.json(saved);
		});
	});
});


// Deleting a single car (wishlist item) from a single prospect
app.delete('/api/prospects/:prospectId/wishlists/:id', function deleteCar(req, res) {
	var prospectId = req.params.prospectId;
	var wishlistId = req.params.id;
	console.log(req.params);
	db.Prospect.findOne({_id: prospectId}, function (err, foundProspect) {
		if (err) { console.log('ERROR', err); }
		// Finding the individial car embedded within prospect
		var foundWishlist = foundProspect.wishlists.id(wishlistId);

		// Deleting the found car
		console.log('Deleted car ', foundWishlist);
		foundWishlist.remove();
		// Saving the delete
		foundProspect.save(function(err, saved) {
			if (err) { console.log('ERROR', err); }
			res.json(saved);
		});
	});
});


/***********
 * SERVER * 
***********/

// listen on port 4000
app.listen(process.env.PORT || 4000, function () {
	console.log('Express server is running on http://localhost:4000/');
});