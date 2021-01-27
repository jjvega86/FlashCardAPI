const Card = require('../models/card');
const express = require('express');
const router = express.Router();

// All endpoints and route handlers go here

router.post('/', async (req, res) => {
    try{
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

module.exports = router;