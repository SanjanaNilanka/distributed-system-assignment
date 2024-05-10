require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { enrolUser } = require("./controllers/userController");
const { sendSMS } = require("./service/sms.service");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/enrol", enrolUser);

//Connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

//listening to requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
