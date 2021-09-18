const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    name:{ type: String, required: true },
    rating: { type: String, required: true },
    feedback: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Feed', FeedSchema);
