var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Wishlist = require('./wishlist');

var Match = require('./match');


var ProspectSchema = new Schema({
	name: String,
	phone: Number,
	email: String,
	address: String,
	wishlists: [Wishlist.schema],
	matches: [Match.schema]
});

var Prospect = mongoose.model('Prospect', ProspectSchema);

module.exports = Prospect;