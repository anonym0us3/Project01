var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MatchSchema = new Schema ( {
	make: String,
	model: String,
	year: Number,
	color: String,
	style: String,
	hasAutomatic: Boolean
});

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;