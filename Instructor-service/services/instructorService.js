const Instructor = require('../models/instructorModel');

async function createInstructor(instructorData) {
    try {
        const instructor = new Instructor(instructorData);
        const savedInstructor = await instructor.save();
        return savedInstructor;
    } catch (error) {
        throw error;
    }
}

async function getAllInstructors() {
    try {
        const instructors = await Instructor.find();
        return instructors;
    } catch (error) {
        throw error;
    }
}

async function getInstructorById(instructorId) {
    try {
        const instructor = await Instructor.findById(instructorId);
        return instructor;
    } catch (error) {
        throw error;
    }
}

async function updateInstructor(instructorId, updateData) {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId, updateData, { new: true });
        return updatedInstructor;
    } catch (error) {
        throw error;
    }
}

async function deleteInstructor(instructorId) {
    try {
        await Instructor.findByIdAndDelete(instructorId);
    } catch (error) {
        throw error;
    }
}

async function addCourseToInstructor(instructorId, courseId, status) {
    try {
        const instructor = await Instructor.findById(instructorId);
        if (!instructor) {
            throw new Error('Instructor not found');
        }
        instructor.courses.push({ course: courseId, status: status || 'pending' });
        const updatedInstructor = await instructor.save();
        return updatedInstructor;
    } catch (error) {
        throw error;
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
