
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var OrderSchema = new mongoose.Schema({
    userName : String,
    orders: [{name: String, price:Number ,count: Number}],
    total: Number
});


// Return model
module.exports = restful.model('Orders', OrderSchema);