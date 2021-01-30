const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cards = require('./routes/cards');
const users = require('./routes/users');

connectDB();

app.use(express.json());
app.use('/api/Flashcards/cards', cards);
app.use('/api/Flashcards/users', users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

