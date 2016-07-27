var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));



app.use(express.static(__dirname + "/htmlpages"));
app.listen(process.env.PORT || 3000);
console.log("Server up on port 3000");


app.use(function(req, res) {
    res.sendFile(__dirname + '/htmlpages/index.html');
});


