const express = require("express");
const router = express.Router();
const learnerController = require('../controllers/learnerController');
//create new learner
router.post("/create-learner", learnerController.createNewLearner);
//get all learners
router.get('/get-learners',learnerController.getAllLearners );
// get one learner
router.get('/:_id',learnerController.getLearnerById );
//enroll learner
router.post('/enroll/:_id', learnerController.enroll);
//unenroll learner
router.delete('/:_id', learnerController.unenroll);
//get courses of learner
router.get('/:_id', learnerController.getCoursesByUser);



router.get('/courses', learnerController.getAllCourses);

module.exports = router;