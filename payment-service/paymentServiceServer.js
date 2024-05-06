const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(bodyParse.json());


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Payment Service Server is running on PORT ${PORT}`);
});