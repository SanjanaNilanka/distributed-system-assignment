require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const dbconfig = require("./config/dbConfig");

app.use(express.json());


const port = process.env.PORT||5000;
app.listen(port,() => console.log(`Node server started at ${port}`));
module.exports = app;
