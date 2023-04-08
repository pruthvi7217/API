const mongoose = require('mongoose');

const order = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    productId: String,
    quantity: Number
});

module.exports = mongoose.model('Order', order);