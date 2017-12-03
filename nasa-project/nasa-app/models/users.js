// nasa-project/nasa-app/models/users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    
    email:{
        type: String,
        //unique: true,
        required: true
    },
    
    hash: String,
    active: Boolean,
    activeHash: String,
});

module.exports = mongoose.model('User', UsersSchema)