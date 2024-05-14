const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoUrl = process.env.mongo_url;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('Mongo DB Connection Successful');
});

connection.on('error', (err) => {
    console.error('Mongo DB Connection failed:', err);
});

module.exports = connection;
