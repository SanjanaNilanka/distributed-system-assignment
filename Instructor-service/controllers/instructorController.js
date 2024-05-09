const instructorService = require('../services/instructorService');

async function createInstructor(req, res) {
    try {
        const instructorData = req.body;
        const createdInstructor = await instructorService.createInstructor(instructorData);
        res.status(201).json(createdInstructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllInstructors(req, res) {
    try {
        const instructors = await instructorService.getAllInstructors();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getInstructorById(req, res) {
    try {
        const instructorId = req.params.id;
        const instructor = await instructorService.getInstructorById(instructorId);
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
        res.status(200).json(instructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateInstructor(req, res) {
    try {
        const instructorId = req.params.id;
        const updateData = req.body;
        const updatedInstructor = await instructorService.updateInstructor(instructorId, updateData);
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteInstructor(req, res) {
    try {
        const instructorId = req.params.id;
        await instructorService.deleteInstructor(instructorId);
        res.status(200).json({ message: 'Instructor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addCourseToInstructor(req, res) {
    try {
        const instructorId = req.params.id;
        const courseId = req.body.courseId;
        const courseStatus = req.body.status || 'pending'; // Default to 'pending' if not provided
        const updatedInstructor = await instructorService.addCourseToInstructor(instructorId, courseId, courseStatus);
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createInstructor,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    deleteInstructor,
    addCourseToInstructor
};
