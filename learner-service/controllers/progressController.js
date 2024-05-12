const express = require("express");
const router = express.Router();
const Learner = require("../model/learnerModel");


// Controller to update lesson completion status
exports.updateLessonStatus = async (req, res) => {
    try {
      const { learnerId, courseId, lessonId, completed } = req.body;
      const learner = await Learner.findById(learnerId);
      if (!learner) return res.status(404).json({ message: 'Learner not found' });
  
      const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === courseId);
      if (courseIndex === -1) return res.status(404).json({ message: 'Course not found for this learner' });
  
      const lessonIndex = learner.enrolledCourses[courseIndex].lessons.findIndex(lesson => lesson.lessonId === lessonId);
      if (lessonIndex === -1) return res.status(404).json({ message: 'Lesson not found for this course' });
  
      learner.enrolledCourses[courseIndex].lessons[lessonIndex].completed = completed;
      await learner.save();
      
      res.status(200).json({ message: 'Lesson status updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.updateCourseProgress = async (req, res) => {
    try {
      const { learnerId, courseId } = req.body;
      const learner = await Learner.findById(learnerId);
      if (!learner) return res.status(404).json({ message: 'Learner not found' });
  
      const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === courseId);
      if (courseIndex === -1) return res.status(404).json({ message: 'Course not found for this learner' });
  
      const totalLessons = learner.enrolledCourses[courseIndex].lessons.length;
      const completedLessons = learner.enrolledCourses[courseIndex].lessons.filter(lesson => lesson.completed).length;
      const progress = (completedLessons / totalLessons) * 100;
  
      learner.enrolledCourses[courseIndex].progress = progress;
      await learner.save();
      
      res.status(200).json({ message: 'Course progress updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Controller to get all progress in each course for a learner
exports.getAllCourseProgress = async (req, res) => {
  try {
      const { learnerId } = req.params;
      const learner = await Learner.findById(learnerId);
      if (!learner) return res.status(404).json({ message: 'Learner not found' });

      const courseProgress = learner.enrolledCourses.map(course => {
          const totalLessons = course.lessons.length;
          const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
          const progress = (completedLessons / totalLessons) * 100;
          return {
              courseId: course.courseId,
              progress: progress.toFixed(2) // Round progress to 2 decimal places
          };
      });

      res.status(200).json(courseProgress);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

