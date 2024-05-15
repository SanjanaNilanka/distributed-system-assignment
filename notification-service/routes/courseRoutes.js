const express = require("express");
const router = express.Router();
const {
  enrolUserInCourse,
  createCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Enrol user in course route
router.post("/enrol", enrolUserInCourse);

// Create course route
router.post("/create", createCourse);

// Delete course route
router.delete("/delete/:courseId", deleteCourse);

router.post('/send-mail')

module.exports = router;
