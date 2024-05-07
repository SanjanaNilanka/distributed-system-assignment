const express = require("express");
const router = express.Router();
const Learner = require("../models/learnerSchema");



router.post("/enroll", async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;

 
    const learner = await Learner.findById(learnerId);
    const course = await Course.findById(courseId);

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    
    if (learner.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ error: "Learner is already enrolled in this course" });
    }


    learner.enrolledCourses.push(courseId);
    await learner.save();

    res.status(200).json({ message: "Student enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
