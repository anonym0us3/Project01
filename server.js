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

var db = require('./models');

/**********
 * ROUTES *
**********/

/*
 * HTML Endpoints
 */

 app.get('/', function homepage (req, res) {
 	res.sendFile(__dirname + 'views/index.html');
 });


 /*
 * JSON API Endpoints
 */

