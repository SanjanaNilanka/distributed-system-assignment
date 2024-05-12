require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

console.log(process.env.PORT); 
app.use(bodyParser.json());
app.use(cors());
const dbconfig = require("./config/dbConfig");

const learnerRoutes = require("./Routes/learnerRoutes");
const progressRoutes = require("./Routes/progressRoutes");


app.use("/learner", learnerRoutes);
app.use("/progress", progressRoutes)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node server is listening on port ${PORT}`);
});

module.exports = app;