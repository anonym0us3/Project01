// This file allows us to seed our application with data
// simply run: 'node seed.js' from the root of this project folder

var db = require("./models");

// Seeding with 2 base prospects to start off with
var prospectsList = [];
prospectsList.push({
					name: "John Doe",
					phone: 5551231111,
					email: "john@doe.com",
					address: "123 fake street"
				});
prospectsList.push({
					name: "Sally Sue",
					phone: 5551232222,
					email: "sally@sue.com",
					address: "987 fake lane"
				});

// Seeding each of the prospects with base desired cars to start off with
var wishCars = [];
wishCars.push({
				make: "Honda",
				model: "Accord",
				year: 2015,
				color: "purple",
				style: "sedan"
			});
wishCars.push({
				make: "GMC",
				model: "Sierra",
				year: 2015,
				color: "black",
				style: "pickup"
			});

// Populating each prospect's desired wishlist of cars
prospectsList.forEach(function(prospect) {
	prospect.wishlists = wishCars;
});

db.Prospect.remove({}, function(err, prospects) {

	db.Prospect.create(prospectsList, function(err, prospects) {
		if (err) {return  console.log('ERROR has occured: ', err); }
		console.log("Prospects: ", prospects);
		console.log("Created ", prospects.length, " prospects");
		process.exit();
	});
});