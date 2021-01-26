const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://jjvega86:BT0luk9h51vCpT7Z@jj1.6xseu.mongodb.net/development?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));