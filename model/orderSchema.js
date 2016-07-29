
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var OrderSchema = new mongoose.Schema({
    name : String,
    orders: [{name: String, price:Number ,count: Number}],
    //totalCost: Number
});


// Return model
module.exports = restful.model('Orders', OrderSchema);