const Admin = require('../models/adminModel')

const createAdmin = async (admin) => {;
    try {
        const newAdmin = new Admin({
            _id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
            empID: admin.empID,
            phone: admin.phone,
            dob: admin.dob,
            profilePicture: admin.profilePicture,
            role: admin.role,
            bio: admin.bio,
        })
        const createdAdmin = await newAdmin.save();
        if (createdAdmin) {
            return {success: true, message: "Admin is registered successfully.", admin: createdAdmin };
        } else {
            return {success: false, message: "Failed to create admin."};
        }
        
    } catch (err) { 
        return { success: false, message: "Failed to create user." };
    }
}

const getAdmins = async () => {
    try {
        const admins = await Admin.find();
        if (admins) {
            return {success: true, message: "Admins are retrieved successfully.", admins: admins};
        } else {
            return {success: false, message: "Failed to retrieve admins."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve admins."};
    }
}

const getAdminByID = async (id) => { 
    try {
        const admin = await Admin.findById(id);
        if (admin) {
            return {success: true, message: "Admin is retrieved successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to retrieve admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve admin."};
    }
}

const updateAdmin = async (id, updatedData) => { 
    const updatedAdmin = {
        _id: updatedData._id,
        fullName: updatedData.fullName,
        email: updatedData.email,
        empID: updatedData.empID,
        phone: updatedData.phone,
        dob: updatedData.dob,
        profilePicture: updatedData.profilePicture,
        role: updatedData.role,
        bio: updatedData.bio,
    }
    try {
        const admin = await Admin.findByIdAndUpdate(id, updatedAdmin, { new: true });
        if (admin) {
            return {success: true, message: "Admin is updated successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to update admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to update admin."};
    }
}

const deleteAdmin = async (id) => { 
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (admin) {
            return {success: true, message: "Admin is deleted successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to delete admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to delete admin."};
    }
}

module.exports = { createAdmin, getAdmins, getAdminByID, updateAdmin, deleteAdmin };