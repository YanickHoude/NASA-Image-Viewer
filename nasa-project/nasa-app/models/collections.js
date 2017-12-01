// nasa-project/nasa-app/models/collections.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionsSchema = new Schema({
    
    user: String,
    title: String,
    description: String,
    ratingPoints: Number,
    ratingNum: Number,
    private: Boolean,
    images: [String]
    
});

module.exports = mongoose.model('Collection', CollectionsSchema)