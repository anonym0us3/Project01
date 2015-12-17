var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
	              process.env.MONGOHQ_URL || 
	              "mongodb://localhost/cartopiary");

//Prospects db
var Prospect = require('./prospect');

// //Individual customer's desired cars 
var Wishlist = require('./wishlist');

// Unused; saving for version 2.0
// Cars matching individual customer's requirements
// var Match = require('./match');

module.exports.Prospect = Prospect;
module.exports.Wishlist = Wishlist;
// Unused; saving for version 2.0
// module.exports.Match = Match;