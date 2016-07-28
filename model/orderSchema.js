
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var OrderSchema = new mongoose.Schema({
    username: String,
    orders: [{food: String}, {qty: Number}],
    totalCost: Number
});


// Return model
module.exports = restful.model('Orders', OrderSchema);