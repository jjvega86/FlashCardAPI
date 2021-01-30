const {Card, validate} = require('../models/card');
const express = require('express');
const router = express.Router();

// All endpoints and route handlers go here

router.get('/', async (req, res) => {
    try{
        const cards = await Card.find();
        return res.send(cards);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try{
        const card = await Card.findById(req.params.id);

        if(!card)
            return res.status(400).send(`The product with id ${req.params.id} does not exist`);

        return res.send(card);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }

});

router.post('/', async (req, res) => {
    try{

        const {error} = validate(req.body);
        if(error)
            return res.status(400).send(error);

        const card = new Card ({
            title: req.body.title,
            description: req.body.description
        });

        await card.save();
        return res.send(card);

    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req,res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const card = await Card.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                dateLastModified: Date.now()
            },
            {new: true}
        );

        if (!card)
            return res.status(400).send(`The card with id ${req.params.id} does not exist`);

        await card.save();
        return res.send(card);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }

});

module.exports = router;