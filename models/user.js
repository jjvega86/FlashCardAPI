const mongoose = require('mongoose');
const Joi = require('Joi');
const {cardSchema} = require('./card');

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    cardCollection: {type: [cardSchema], default: []} 
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;