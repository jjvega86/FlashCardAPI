const mongoose = require('mongoose');
const Joi = require('joi');
const {cardSchema} = require('./card');

// cardCollectionSchema defines a collection of FlashCards differentiated by title

const cardCollectionSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 2, maxLength: 50 },
    dateLastModified: {type: Date, default: Date.now},
    cards: [cardSchema] // allows for an array of cards in each collection
});

const CardCollection = mongoose.model('Collection', cardCollectionSchema);

function validateCollection(collection){
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required()
    })

    return schema.validate(collection);
}


exports.CardCollection = CardCollection;
exports.validateCollection = validateCollection;
