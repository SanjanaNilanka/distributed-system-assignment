const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    bio: { type: String }, 
    joinDate: { type: Date, default: Date.now }, 
    courses: [{
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    }],
});

module.exports = mongoose.model('instructors', instructorSchema);