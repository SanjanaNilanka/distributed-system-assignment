const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/create', courseController.addCourse);
router.get('/get', courseController.getCourses);
router.get('/get/:id', courseController.getCourseByID);
router.put('/approve/:id', courseController.approveCourse);
router.put('/reject/:id', courseController.rejectCourse);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);

router.post('/enroll', courseController.learnerEnrolling);
router.post('/unenroll', courseController.learnerUnenrolling);
router.post('/add-review/:id', courseController.addReview);

module.exports = router;