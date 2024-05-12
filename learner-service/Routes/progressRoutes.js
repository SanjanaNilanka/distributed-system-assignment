const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Update lesson completion status
router.patch('/update-Lesson-Status', progressController.updateLessonStatus);
router.patch('/update-Course-Progress', progressController.updateCourseProgress);
router.get('/:learnerId',progressController.getAllCourseProgress )
module.exports = router;
