// Imort the libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the order schema
const orderSchema = new Schema({
    username: { type: String, ref: 'User', required: true, index: true }, 
    subtotal: { type: Number, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
