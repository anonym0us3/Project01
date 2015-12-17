var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Wishlist = require('./wishlist');

// Unused; saving for version 2.0
// var Match = require('./match');


var ProspectSchema = new Schema({
	name: String,
	phone: Number,
	email: String,
	address: String,
	wishlists: [Wishlist.schema],
	// Unused; saving for version 2.0
	// matches: [Match.schema]
});

var Prospect = mongoose.model('Prospect', ProspectSchema);

module.exports = Prospect;