const express = require("express");
const router = express.Router();
const {
  enrolUserInCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Enrol user in course route
router.post("/enrol", enrolUserInCourse);

// Create course route
router.post("/create", createCourse);

// Update course route
router.patch("/update/:courseId", updateCourse);

// Delete course route
router.delete("/delete/:courseId", deleteCourse);

module.exports = router;
