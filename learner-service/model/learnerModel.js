const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  learner_pic: {
    type: String,
    required: false,
  },
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      progress: {
        type: Number,
        default: 0, // percentage completion
      },
      lessons: [
        {
          lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
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
