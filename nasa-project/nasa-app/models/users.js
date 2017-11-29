// nasa-project/nasa-app/models/users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    
    isVerified: Boolean,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UsersSchema)