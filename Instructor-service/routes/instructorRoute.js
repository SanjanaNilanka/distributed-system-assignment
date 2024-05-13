const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.post('/create', instructorController.createInstructor);
router.get('/get', instructorController.getAllInstructors);
router.get('/get/:id', instructorController.getInstructorById);
router.put('/update/:id', instructorController.updateInstructor);
router.delete('/delete/:id', instructorController.deleteInstructor);
router.post('/add-course/:id', instructorController.addCourseToInstructor);

module.exports = router;
