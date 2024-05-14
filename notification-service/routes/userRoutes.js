const express = require("express");
const { enrolUser } = require("../controllers/userController");

const router = express.Router();

// Enroll user route
router.post("/enrol", enrolUser);

module.exports = router;
