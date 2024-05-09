const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    profilePicture: { type: String },
    role: { type: String, enum: ['admin', 'moderator'], default: 'admin' },
    bio: { type: String }, 
    joinDate: { type: Date, default: Date.now }, 
    //coursesManaged: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] 
});

module.exports = mongoose.model('Admin', adminSchema);
