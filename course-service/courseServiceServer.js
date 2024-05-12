require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const courseRoute = require('./routes/courseRoute');

const app = express();

const port = config.server.port;
const dbURL = config.db.dbUrl;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/course', courseRoute);

mongoose.connect(dbURL).then(() => {
    console.log('Database was connected');
}).catch((err) => {
    console.log('Database was not connected, Error orccured: ');
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

module.exports = app;