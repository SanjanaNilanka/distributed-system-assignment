const express = require("express");
const router = express.Router();
const learnerController = require('../controllers/learnerController');

//create new learner
router.post("/create-learner", learnerController.createNewLearner);
//get all learners
router.get('/get-learners',learnerController.getAllLearners );
// get one learner
router.get('/get-learner/:learnerId',learnerController.getLearnerById );
//enroll learner
router.post('/enroll', learnerController.enroll);
//unenroll learner
router.delete('/unenroll', learnerController.unenroll);
//get courses of learner
router.get('/:learnerId', learnerController.getCoursesByUser);
// Update lesson completion status
router.post("/lesson/complete", learnerController.completeLesson);
// Retrieve progress for a specific course
router.get("/course/:learnerId/:courseId", learnerController.getCourseProgress);
// Retrieve progress for all courses enrolled by a learner
router.get("/course/progress/:learnerId", learnerController.getAllCourseProgress);

module.exports = router;