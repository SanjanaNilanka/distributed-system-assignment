const Course = require("../models/courseModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../service/sms.service");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// confirmation email
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Enrol user in a course
const enrolUserInCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.courses) {
      user.courses = [];
    }

    // Check if the user is already enrolled in the course
    if (user.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }

    if (course.enrollment >= course.maxEnrollment) {
      return res.status(400).json({ error: "Course enrollment limit reached" });
    }

    // Enroll user in the course
    user.courses.push(courseId);
    await user.save();

    course.enrollment += 1;
    await course.save();

    const message = `Hello ${user.name}, you have successfully enrolled in the course "${course.coursename}".`;

    await sendSMS(user.phone, message);

    const subject = "Course Enrollment Confirmation";
    const text = `Hello ${user.name},\n\nYou have successfully enrolled in the course "${course.coursename}".`;
    await sendEmail(user.email, subject, text);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { coursename, courseId, credits, maxEnrollment } = req.body;

    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      return res.status(400).json({ error: "Course ID already exists" });
    }

    const course = new Course({
      coursename,
      courseId,
      credits,
      maxEnrollment,
    });
    await course.save();

    const users = await User.find({});

    // Send email to each user
    const subject = "New Course Added to LearnVersa";
    const text = `Hello,\n\nA new course "${coursename}" has been added to LearnVersa. Check it out now!`;
    await Promise.all(
      users.map(async (user) => {
        await sendEmail(user.email, subject, text);
      })
    );

    res.status(201).json({ course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete the course
    await Course.findOneAndDelete({ courseId: courseId });

    // Fetch all users
    const users = await User.find({});

    const subject = "Course no longer on LearnVersa";
    const text = `Hello,\n\nThe course "${course.coursename}" has been removed from LearnVersa. \n\nBut don't miss out on everything else!`;
    await Promise.all(
      users.map(async (user) => {
        await sendEmail(user.email, subject, text);
      })
    );

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  enrolUserInCourse,
  createCourse,
  deleteCourse,
};
