const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxLength: 30 },
  description: { type: String, required: true, minlength: 2, maxLength: 500 },
  dateAdded: { type: Date, default: Date.now },
  dateLastModified: { type: Date, default: Date.now },
});

function validateCard(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(500).required(),
  });

  return schema.validate(card);
}

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;
exports.validateCard = validateCard;
exports.cardSchema = cardSchema;
