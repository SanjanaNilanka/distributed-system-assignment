const Course = require('../models/courseModel');

const createCourse = async(course) => {
    try {
        const newCourse = new Course({
            title: course.title,
            thumbnail: course.thumbnail,
            previewVideo: course.previewVideo,
            author: course.author,
            description: course.description,
            price: course.price,
            discount: course.discount,
            category: course.category,
            subCategory: course.subCategory,
            learners: [],
            wishlist: [],
            review: [],
            outline: course.outline,
        })
        const createdCourse = await newCourse.save();
        return {success: true, message: "Course is created successfully", createdCourse: createdCourse}
    } catch (err) { 
        return { success: false, message: "Failed to create Course" + err.message };
    }
}

const getCourses = async () => { 
    try {
        const courses = await Course.find();
        return {success: true, message: "Courses are retrieved successfully", courses: courses}
    } catch (err) { 
        return { success: false, message: "Failed to get courses" + err.message };
    }
}

const getCourseByID = async (courseID) => { 
    try {
        const course = await Course.findById(courseID);
        return {success: true, message: "Course is retrieved successfully", course: course}
    } catch (err) { 
        return { success: false, message: "Failed to get course" + err.message };
    }
}

const updateCourse = async (courseID, updatedData) => { 
    try {
        const updatedCourse = {
            title: updatedData.title,
            thumbnail: updatedData.thumbnail,
            previewVideo: updatedData.previewVideo,
            description: updatedData.description,
            price: updatedData.price,
            discount: updatedData.discount,
            category: course.category,
            subCategory: course.subCategory,
            outline: updatedData.outline,
        };
        const updatedCourseData = await Course.findByIdAndUpdate(courseID, updatedCourse, { new: true });

        return { success: true, message: "Course is updated successfully", course: updatedCourse };
    } catch (err) { 
        return { success: false, message: "Failed to update course" + err.message };
    }
}

const updateCourseStatus = async (courseID, updatedData) => { 
    try {
        const updatedCourse = {
            status: updatedData.status,
        };
        const updatedCourseData = await Course.findByIdAndUpdate(courseID, updatedCourse, { new: true });

        return { success: true, message: "Course is updated successfully", course: updatedCourse };
    } catch (err) { 
        return { success: false, message: "Failed to update course" + err.message };
    }
}

const deleteCourse = async (courseID) => { 
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseID);
        return { success: true, message: "Course is deleted successfully", deletedCourse: deletedCourse };
    } catch (err) { 
        return { success: false, message: "Failed to delete course" + err.message };
    }
}

const enrollToCourse = async (courseID, learnerID) => {
    try {
        const course = await Course.findById(courseID);
        if (course) {
            if (!course.learners.includes(learnerID)) {
                course.learners.push(learnerID);
                await course.save();
                return {success: true, message: "Learner was successfully enrolled."};
            } else {
                return {success: false, message: "Learner is already enrolled."};
            }
        } else {
            return {success: false, message: "Failed to find course."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve course."};
    }
}


const unenrollFromCourse = async (courseID, learnerID) => {
    try {
        const course = await Course.findById(courseID);
        if (course) {
            const index = course.learners.findIndex(id => id.equals(learnerID));
            if (index !== -1) {
                course.learners.splice(index, 1);
                await course.save(); 
                return { success: true, message: "Learner is successfully unenrolled from the course." };
            } else {
                return { success: false, message: "Learner is not enrolled this course." };
            }
        } else {
            return { success: false, message: "Failed to find course." };
        }
    } catch (error) {
        return { success: false, message: "Failed to retrieve course." };
    }
}

async function addReview(courseId, reviewData) {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        course.review.push(reviewData);
        const updatedCourse = await course.save();
        return updatedCourse;
    } catch (error) {
        throw error;
    }
}

async function addOutline(courseId, outlineData) {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        course.outline.push(outlineData);
        const updatedCourse = await course.save();
        return updatedCourse;
    } catch (error) {
        throw error;
    }
}

async function removeOutline(courseId, outlineId) {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        course.outline.id(outlineId).remove();
        const updatedCourse = await course.save();
        return updatedCourse;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourseByID,
    updateCourse,
    updateCourseStatus,
    deleteCourse,
    enrollToCourse,
    unenrollFromCourse,
    addReview,
    addOutline,
    removeOutline,
};