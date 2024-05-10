const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  maxEnrollment: {
    type: Number,
    required: true,
  },
  enrollment: {
    type: Number,
    default: 0,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
