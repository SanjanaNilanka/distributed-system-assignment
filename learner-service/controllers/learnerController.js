const express = require("express");
const router = express.Router();
const Learner = require("../model/learnerModel");

//create new learner
const createNewLearner = async (req, res) => {
  try {
    const { _id, name } = req.body;
    const existingLearner = await Learner.findById(_id);
    if (existingLearner) {
      return res.status(400).json({ error: `Learner already exist!` });
    }
    const newLearner = new Learner({
      _id,
      name,
    });

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
    const learnerId = req.params._id;

    const learner = await Learner.findById(learnerId);
    
    if (!learner) {
      return res.status(404).json({ error: `Learner not found` });
    }

    res.status(200).json(learner);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Internal server error` });
  }
};

//enroll learner
const enroll = async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;
    const learner = await Learner.findById(learnerId);

    //check if learner exists in db
    if (!learner) {
      return res.status(400).json({ error: `Learner does not exists!!` });
    }

    if (learner.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ error: "Learner is already enrolled in this course" });
    }
    learner.enrolledCourses.push(courseId);
    await learner.save();

    res.status(200).json({ message: "Student enrolled successfully" });
  } catch (error) {
    return res.status(400).json({ error: `Internal Server error` });
  }
};

//unenroll
const unenroll = async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;

    // Find the learner by ID
    const learner = await Learner.findById(learnerId);

    if (!learner) {
      return res.status(400).json({ error: "Learner not found" });
    }

    const enrolledCourses = learner.enrolledCourses;
    const index = enrolledCourses.indexOf(courseId);
    if (index === -1) {
      return res
        .status(400)
        .json({ error: "Learner is not enrolled in this course" });
    }

    // Remove the course from the learner's enrolled courses
    enrolledCourses.splice(index, 1);

    // Update the learner's enrolledCourses field and save the changes
    learner.enrolledCourses = enrolledCourses;
    await learner.save();

    res.status(200).json({ message: "Student unenrolled successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};

//get all courses of learner
const getCoursesByUser = async (req, res) => {
  try {
    const { learnerId } = req.params;
    const learner = await Learner.findById(learnerId).populate(
      "enrolledCourses"
    );

    if (!learner) {
      return res.status(400).json({ error: "Learner not found" });
    }

    // Return the enrolled courses of the learner
    res.status(200).json({ courses: learner.enrolledCourses });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = {
  createNewLearner,
  getAllLearners,
  getLearnerById,
  enroll,
  unenroll,
  getCoursesByUser,
};

