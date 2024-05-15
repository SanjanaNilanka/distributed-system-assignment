const express = require("express");
const router = express.Router();
const ProgressController = require('../controllers/progressController');

// Route to update progress
router.patch('/:_id/:courseId', ProgressController.updateProgress);

// Route to retrieve progress
router.get('/:_id/:courseId', ProgressController.getProgress);

// Update lesson completion status
// router.patch('/update-Lesson-Status', progressController.updateLessonStatus);
// router.patch('/update-Course-Progress', progressController.updateCourseProgress);
// router.get('/:learnerId',progressController.getAllCourseProgress );

// router.post('/update-progress', progressController.updateProgress);


module.exports = router;
