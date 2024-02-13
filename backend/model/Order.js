const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: { type: String, ref: 'User', required: true, index: true }, 
    subtotal: { type: Number, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
