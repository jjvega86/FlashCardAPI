const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const collections = require('./routes/cardCollections');

connectDB();

app.use(express.json());
app.use('/api/Flashcards/', collections);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

