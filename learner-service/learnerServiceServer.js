require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();


app.use(bodyParser.json());
app.use(cors());
const dbconfig = require("./config/dbConfig");

const learnerRoutes = require("./Routes/learnerRoutes");


app.use("/learner", learnerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node server is listening on port ${PORT}`);
});

module.exports = app;