const {Card, CardCollection, validateCard, validateCollection} = require('../models/cardCollection');
const express = require('express');
const router = express.Router();


// All endpoints and route handlers go here
// routes act on collections of cards. Using subdocuments to store cards in collection documents. Each collection is a different technology (i.e. JavaScript)

// TO DO
// DONE 1 - Modify all current endpoints to act on the collection level DONE
// 2 - Add endpoints to modify cards in each collection (by passing in an additional param to the URL)
// ex. router.get('/collectionId/:id') to access a collection, then a card in that collection
// 2 cont. Endpoints to add
// 2a - GET all cards in collection
// 2b - GET one card from collection by id
// 2c - POST one card to collection
// 2d - PUT one card in collection
// 2e - DELETE one card from collection
// 3 - Test all endpoints in Postman
// 4 - Consider refactoring to have two separate Card and CardCollection files for both models and routes

// RESOURCES
// https://zellwk.com/blog/mongoose-subdocuments/

router.get('/', async (req, res) => { // GET all collections of cards (would return a collection containing an array of card objects)
    try{
        const collections = await CardCollection.find();
        //const cards = await Card.find();
        return res.send(collections);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => { // GET an individual collection
    console.log(req.params.id);
    try{
        const cardCollection = await CardCollection.findById(req.params.id);

        if(!cardCollection)
            return res.status(400).send(`The product with id ${req.params.id} does not exist`);

        return res.send(cardCollection);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }

});

router.post('/', async (req, res) => { // create a new collection
    try{

        const {error} = validateCollection(req.body);
        if(error)
            return res.status(400).send(error);

        const cardCollection = new CardCollection ({
            title: req.body.title
        });

        await cardCollection.save();
        return res.send(cardCollection);

    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req,res) => { // allows name change of card collection - does NOT modify cards. /cardCollectionId/:id would change a card
    try {
        const {error} = validateCollection(req.body);
        if (error) return res.status(400).send(error);

        const cardCollection = await CardCollection.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                dateLastModified: Date.now()
            },
            {new: true}
        );

        if (!cardCollection)
            return res.status(400).send(`The collection with id ${req.params.id} does not exist`);

        await cardCollection.save();
        return res.send(cardCollection);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }

});

router.delete('/:id', async (req, res) => { // deletes the entire collection.
    try{
        const cardCollection = await CardCollection.findByIdAndDelete(req.params.id);

        if(!cardCollection)
            return res.status(400).send(`The collection with id ${req.params.id} does not exist.`);
        
        return res.send(cardCollection);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }

});

module.exports = router;