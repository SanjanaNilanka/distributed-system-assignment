const express = require("express");
const router = express.Router();
const Learner = require("../model/learnerModel");
const mongoose = require("mongoose");

//create new learner
const createNewLearner = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
     const newLearner = new Learner(req.body);
     await newLearner.save();
     return res.send({ success: true, message: "New learner added successfully!!!!" });

    await newLearner.save();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Can not create a new learner123!`,
    });
  }
};

//retrieve all learners
const getAllLearners = async (req, res) => {
  try {
    const allLearners = await Learner.find({}, "_id name");
    res.status(200).json(allLearners);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error! ` });
  }
};

// retrieve learner by id
const getLearnerById = async (req, res) => {
  try {
    const learnerId = req.params._id; // Use req.params._id if _id is the field name for learner ID

    const learner = await Learner.findOne({ _id: learnerId });
    
    if (!learner) {
      return res.status(404).json({ error: `Learner not found` });
    }

    res.status(200).json(learner);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Internal server error` });
  }
};






const enroll = async (req, res) => {
  try {
    const { _id } = req.params; 
    const { courseId, progress } = req.body;

    // Find the learner by ID
    const learner = await Learner.findById(_id);
    
    // Check if learner exists
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Check if the learner is already enrolled in the course
    const isEnrolled = learner.enrolledCourses.some(course => course.courseId.equals(courseId));
    if (isEnrolled) {
      return res.status(400).json({ error: "Learner is already enrolled in this course" });
    }

    // Push the new course data to the enrolledCourses array
    learner.enrolledCourses.push({ courseId, progress });
    await learner.save();

    res.status(200).json({ message: "Learner enrolled successfully", learner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//unenroll
const unenroll = async (req, res) => {
  try {
    const { courseId } = req.body; // Course ID to unenroll from

    // Find the learner by ID
    const learnerId = req.params._id;

    // Assuming Learner is the model for your learners
    const learner = await Learner.findById(learnerId);

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Find the index of the course in enrolledCourses array
    const index = learner.enrolledCourses.findIndex(course => course.courseId.toString() === courseId);

    if (index === -1) {
      return res.status(400).json({ error: "Learner is not enrolled in this course" });
    }

    // Remove the course and its progress
    learner.enrolledCourses.splice(index, 1);

    // Update the learner's enrolledCourses field and save the changes
    await learner.save();

    res.status(200).json({ message: "Student unenrolled successfully" });
  } catch (error) {
    console.error("Error unenrolling from course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





//get all courses of learner
const getCoursesByUser = async (req, res) => {
  try {
    const { _id } = req.params; // Use req.params._id if _id is the field name for learner ID

    // Find the learner by ID and populate the enrolled courses
    const learner = await Learner.findById(_id).populate('enrolledCourses');

    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }

    // Return the enrolled courses of the learner
    res.status(200).json({ courses: learner.enrolledCourses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server error' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    // Make a request to the course microservice to fetch all courses
    const response = await axios.get('http://course-service/api/courses');
    const courses = response.data;

    // Return the courses in the response
    res.status(200).json(courses);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  createNewLearner,
  getAllLearners,
  getLearnerById,
  enroll,
  unenroll,
  getCoursesByUser,
  getAllCourses
};

