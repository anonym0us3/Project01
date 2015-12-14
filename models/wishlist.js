var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WishlistSchema = new Schema({
	make: String,
	model: String,
	year: Number,
	color: String,
	style: String,
	// hasAutomatic: Boolean
});

var Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;