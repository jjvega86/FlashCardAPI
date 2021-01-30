const mongoose = require('mongoose');
const Joi = require('joi');

// cardSchema defines an individual Flashcard in the collection
const cardSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxLength: 30}, 
    description: { type: String, required: true, minlength: 2, maxLength: 500},
    dateAdded: {type: Date, default: Date.now },
    dateLastModified: {type: Date, default: Date.now}
});

// cardCollectionSchema defines a collection of FlashCards differentiated by title

const cardCollectionSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 2, maxLength: 30 },
    dateLastModified: {type: Date, default: Date.now},
    cards: [cardSchema] // allows for an array of cards in each collection
});

const Card = mongoose.model('Card', cardSchema);
const CardCollection = mongoose.model('Collection', cardCollectionSchema);

function validateCard(card){
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(2).max(500). required()
    });

    return schema.validate(card);
};

function validateCollection(collection){
    const schema = Joi.object({
        title: Joi.string().min(2).max(30).required()
    })

    return schema.validate(collection);
}


exports.CardCollection = CardCollection;
exports.Card = Card;
exports.validateCard = validateCard;
exports.validateCollection = validateCollection;
exports.cardSchema = cardSchema;