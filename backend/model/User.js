const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    username: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true, index: true },
    phoneNumber: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('User', userSchema);