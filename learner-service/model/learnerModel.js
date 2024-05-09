const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true, // Ensure _id is required
  },
  name: {
    type: String,
    required: true, // Ensure name is required
  },
  enrolledCourses: [
    {
      courseId: {
        type: String,
        required: true,
      },
      progress: {
        type: Number,
        default: 0, // percentage completion
      },
      lessonsCompleted: [
        {
          lessonId: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Learner", learnerSchema);
