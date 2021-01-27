const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxLength: 30},
    description: { type: String, required: true, minlength: 2, maxLength: 500},
    dateAdded: {type: Date, default: Date.now }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;