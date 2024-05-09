const courseService = require('../services/courseService');
const mongoose = require('mongoose');

const addCourse = async (req, res) => { 
    const newCourse = req.body;
    try {
        const data = await courseService.createCourse(newCourse);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to create the course, Error: ${error.message}`
        });
    }
}

const getCourses = async (req, res) => { 
    try {
        const data = await courseService.getCourses();
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const getCourseByID = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await courseService.getCourseByID(id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const updateCourse = async (req, res) => { 
    const { id } = req.params;
    const updatedCourse = req.body;
    try {
        const data = await courseService.updateCourse(id, updatedCourse);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to update the course, Error: ${error.message}`
        });
    }
}

const approveCourse = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await courseService.updateCourseStatus(id, { status: 'approved' });
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to update the course, Error: ${error.message}`
        });
    }
}

const rejectCourse = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await courseService.updateCourseStatus(id, { status: 'rejected' });
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to update the course, Error: ${error.message}`
        });
    }
}

const deleteCourse = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await courseService.deleteCourse(id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to delete the course, Error: ${error.message}`
        });
    }
}

const learnerEnrolling = async (req, res) => { 
    const courseID = req.body.courseID;
    const learnerID = req.body.learnerID;

    try {
        const data = await courseService.enrollToCourse(courseID, learnerID);
        if (data.success) {
            res.status(200).json({
                success: true,
                message: `Successfully enrolled to course`
            });
            
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to enroll to the course, Error: ${error.message}`
        });
    }
}



const learnerUnenrolling = async (req, res) => { 
    const courseID = req.body.courseID;
    const learnerID = req.body.learnerID;

    try {
        const data = await courseService.unenrollFromCourse(courseID, learnerID);
        if (data.success) {
            res.status(200).json({
                success: true,
                message: `Successfully unenrolled from course`
            });
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to unenroll from the course, Error: ${error.message}`
        });
    }
}

async function addReview(req, res) {
    try {
        const courseId = req.params.courseId;
        const reviewData = req.body;
        const result = await courseService.addReview(courseId, reviewData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addOutline(req, res) {
    try {
        const courseId = req.params.courseId;
        const outlineData = req.body;
        const result = await courseService.addOutline(courseId, outlineData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeOutline(req, res) {
    try {
        const courseId = req.params.courseId;
        const outlineId = req.params.outlineId;
        const result = await courseService.removeOutline(courseId, outlineId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    addCourse,
    getCourses,
    getCourseByID,
    updateCourse,
    addOutline,
    removeOutline,
    deleteCourse,
    approveCourse,
    rejectCourse,
    learnerEnrolling,
    learnerUnenrolling,
    addReview,
};