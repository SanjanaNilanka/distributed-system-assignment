const express = require("express");
const router = express.Router();
const Learner = require("../model/learnerModel");


// // Controller to update lesson completion status
// exports.updateLessonStatus = async (req, res) => {
//     try {
//       const { _id, courseId, lessonId, completed } = req.body;
//       const learner = await Learner.findById(_id);
//       if (!learner) return res.status(404).json({ message: 'Learner not found' });
  
//       const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === courseId);
//       if (courseIndex === -1) return res.status(404).json({ message: 'Course not found for this learner' });
  
//       const lessonIndex = learner.enrolledCourses[courseIndex].lessons.findIndex(lesson => lesson.lessonId === lessonId);
//       if (lessonIndex === -1) return res.status(404).json({ message: 'Lesson not found for this course' });
  
//       learner.enrolledCourses[courseIndex].lessons[lessonIndex].completed = completed;
//       await learner.save();
      
//       res.status(200).json({ message: 'Lesson status updated successfully' });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };



// exports.updateProgress = async (req, res) => {
//   try {
//     const { _id, courseId, lessonId } = req.body;

//     // Find the learner by ID
//     const learner = await Learner.findById(_id);

//     if (!learner) {
//       console.error(`Learner not found for ID: ${_id}`);
//       return res.status(404).json({ error: 'Learner not found' });
//     }

//     // Find the enrolled course by ID
//     const enrolledCourseIndex = learner.enrolledCourses.findIndex(
//       (course) => course.courseId.toString() === courseId
//     );

//     if (enrolledCourseIndex === -1) {
//       console.error(`Course not found for learner ${_id} and courseId ${courseId}`);
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     // Check if the lesson ID exists in the course's lessons
//     const lessonIndex = learner.enrolledCourses[enrolledCourseIndex].lessons.findIndex(
//       (lesson) => lesson.lessonId.toString() === lessonId
//     );

//     if (lessonIndex === -1) {
//       console.error(`Lesson not found for courseId ${courseId} and lessonId ${lessonId}`);
//       return res.status(404).json({ error: 'Lesson not found' });
//     }

//     // Update learner's progress for the lesson
//     learner.enrolledCourses[enrolledCourseIndex].lessons[lessonIndex].completed = true;

//     await learner.save();

//     res.status(200).json({ message: 'Progress updated successfully' });
//   } catch (error) {
//     console.error('Error updating progress:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// //*******************************************
//   exports.updateCourseProgress = async (req, res) => {
//     try {
//       const { learnerId, courseId } = req.body;
//       const learner = await Learner.findById(learnerId);
//       if (!learner) return res.status(404).json({ message: 'Learner not found' });
  
//       const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === courseId);
//       if (courseIndex === -1) return res.status(404).json({ message: 'Course not found for this learner' });
  
//       const totalLessons = learner.enrolledCourses[courseIndex].lessons.length;
//       const completedLessons = learner.enrolledCourses[courseIndex].lessons.filter(lesson => lesson.completed).length;
//       const progress = (completedLessons / totalLessons) * 100;
  
//       learner.enrolledCourses[courseIndex].progress = progress;
//       await learner.save();
      
//       res.status(200).json({ message: 'Course progress updated successfully' });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

//   // Controller to get all progress in each course for a learner
// exports.getAllCourseProgress = async (req, res) => {
//   try {
//       const { learnerId } = req.params;
//       const learner = await Learner.findById(learnerId);
//       if (!learner) return res.status(404).json({ message: 'Learner not found' });

//       const courseProgress = learner.enrolledCourses.map(course => {
//           const totalLessons = course.lessons.length;
//           const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
//           const progress = (completedLessons / totalLessons) * 100;
//           return {
//               courseId: course.courseId,
//               progress: progress.toFixed(2) // Round progress to 2 decimal places
//           };
//       });

//       res.status(200).json(courseProgress);
//   } catch (error) {
//       res.status(400).json({ message: error.message });
//   }
// };

// new progress__________________________________________________________________________________________________________

const ProgressController = {
  // Update progress
  async updateProgress(req, res) {
    const { _id, courseId } = req.params;
    const { progress } = req.body;
  
    try {
      console.log('Updating progress for _id:', _id, 'and courseId:', courseId);
  
      // Find the learner by _id
      const learner = await Learner.findById(_id);
  
      if (!learner) {
        return res.status(404).json({ message: 'Learner not found' });
      }
  
      // Find the enrolled course by courseId
      const enrolledCourse = learner.enrolledCourses.find(course => String(course.courseId) === courseId);
  
      if (!enrolledCourse) {
        return res.status(404).json({ message: 'Enrolled course not found' });
      }
  
      // Update the progress for the enrolled course
      enrolledCourse.progress = progress;
  
      // Save the updated learner
      await learner.save();
  
      console.log('Progress updated successfully for _id:', _id, 'and courseId:', courseId);
      res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
      console.error('Error updating progress:', error.message);
      res.status(500).json({ message: 'Error updating progress' });
    }
  },
  
  // Get progress
  async getProgress(req, res) {
    const { _id, courseId } = req.params;

    try {
      // Find progress record for the user and course
      const userProgress = await Progress.findOne({ _id, courseId });

      if (!userProgress) {
        return res.status(404).json({ message: 'Progress not found' });
      }

      res.status(200).json({ progress: userProgress.progress });
    } catch (error) {
      console.error('Error retrieving progress:', error);
      res.status(500).json({ message: 'Error retrieving progress' });
    }
  },
};

module.exports = ProgressController;