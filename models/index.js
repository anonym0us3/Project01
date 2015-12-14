var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cartopiary");

//Prospects db
var Prospect = require('./prospect)');

//Individual customer's desired cars 
var Wishlist = require('./wishlist');

//Cars matching individual customer's requirements
var Match = require('./match');

//Whatever this does?
module.exports.Prospect = Prospect;
module.exports.Wishlist = Wishlist;
module.exports.Match = Match;