// nasa-project/nasa-app/models/collections.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionsSchema = new Schema({
    
    user: String,
    name: String,
    description: String,
    ratingPoints: Number,
    ratingNum: Number,
    visibility: String,
    images: [String]
    
});

module.exports = mongoose.model('Collection', CollectionsSchema)