var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var bookSchema = new mongoose.Schema({
    name: String,
    image_url: String,
    owner_id: ObjectId,
    user_id: ObjectId
});

module.exports = mongoose.model('Book', bookSchema);
