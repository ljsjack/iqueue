var express = require('express');
var app = express();

app.use(express.static(__dirname + "/htmlpages"));
app.listen(process.env.PORT || 3000);
console.log("Server up on port 3000");


app.use(function(req, res) {
    res.sendFile(__dirname + '/htmlpages/index.html');
});

