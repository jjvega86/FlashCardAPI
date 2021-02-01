const {CardCollection, validateCollection} = require('../models/cardCollection');
const {Card, validateCard} = require('../models/card');
const express = require('express');
const router = express.Router();


// All endpoints and route handlers go here
// routes act on collections of cards. Using subdocuments to store cards in collection documents. Each collection is a different technology (i.e. JavaScript)

// TO DO
// DONE 1 - Modify all current endpoints to act on the collection level 
// DONE 2 - Consider refactoring to have two separate Card and CardCollection files for both models and routes
// 3 - Add endpoints to modify cards in each collection (by passing in an additional param to the URL)
// ex. router.get('/collectionId/:id') to access a collection, then a card in that collection
// 3 cont. Endpoints to add
// 3a - GET all cards in collection
// 3b - GET one card from collection by id
// 3c - POST one card to collection
// 3d - PUT one card in collection
// 3e - DELETE one card from collection
// 4 - Test all endpoints in Postman

// RESOURCES
// https://zellwk.com/blog/mongoose-subdocuments/


router.get('/collections', async (req, res) => { // GET all collections of cards (would return a collection containing an array of card objects)
    try{
        const collections = await CardCollection.find();
        //const cards = await Card.find();
        return res.send(collections);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/collections/:id', async (req, res) => { // GET an individual collection
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

router.post('/collections', async (req, res) => { // create a new collection
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

router.post('/collections/:id', async (req,res) => { // adds a new card to an existing collection
    try{

        // validate request body is correctly formatted
        const {error} = validateCard(req.body);
        if(error) return res.status(400).send(error);

        // find collection to add the card to, validate it exists
        const cardCollection = await CardCollection.findById(req.params.id);
        if(!cardCollection) return res.status(500).send(`Collection with id of ${req.params.id} does not exist!`);

        // new card object with request body added
        const newCard = new Card ({
            title: req.body.title,
            description: req.body.description
        });

        // add new card to the cards array on cardCollection schema
        cardCollection.cards.push(newCard);
        await cardCollection.save();

        return res.send(cardCollection.cards);
        
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

router.put('/collections/:id', async (req,res) => { // allows name change of card collection - does NOT modify cards. /cardCollectionId/:id would change a card
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

router.delete('collections/:id', async (req, res) => { // deletes the entire collection.
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