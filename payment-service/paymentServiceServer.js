const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(bodyParse.json());


const PORT = 5000;
const DB_URL = "mongodb+srv://hasinduranasingheb2098:o2ndrPgUPHjk6KlF@cluster0.fhhrtiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URL).then(() => {
    console.log("Payment Service Database Connected Successfully");
}).catch((error) => {
    console.log("Payment Service Database Connection Unsuccessful");
    console.log(error);
});

app.listen(PORT, () => {
    console.log(`Payment Service Server is running on PORT ${PORT}`);
});