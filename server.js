var express = require('express');
var bodyParser = require('body-parser');



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/iqueueproj', function(err){
    if (err){
        console.log('Connection Error',err);
    }
    else {
        console.log('Connection Successful');
    }
});

var app = express();


app.use(express.static(__dirname + "/htmlpages"));
app.listen(process.env.PORT || 3000);
console.log("Server up on port 3000");

// Routes
app.use('/api', require('./routes/api'));

// Routing to push client to home page.
app.use(function(req, res) {
    res.sendFile(__dirname + '/htmlpages/index.html');
});


// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





module.exports = app;
