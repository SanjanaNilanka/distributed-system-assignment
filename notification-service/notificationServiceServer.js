require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes"); // Import course routes
const { enrolUserInCourse } = require("./controllers/courseController"); // Import course enrollment controller
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
app.use("/api/courses", courseRoutes);

app.post("/api/enrol", enrolUserInCourse);

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
