const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../service/sms.service");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Function to send confirmation email
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

// Enrol user
const enrolUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Preprocess phone number to include country code if missing
    let formattedPhone = phone;
    if (!phone.startsWith("+")) {
      // Assuming default country code is +94 for Sri Lanka
      formattedPhone = "+94" + phone;
    }

    // Use the enrol method from User model
    const user = await User.enrol(name, email, phone);

    const message = `Welcome, ${user.name}! You have successfully enrolled.`;

    // Send SMS notification
    await sendSMS(user.phone, message);

    // Send confirmation email
    const subject = "Enrollment Confirmation";
    const text = `Hello ${user.name},\n\nYou have successfully enrolled.`;
    await sendEmail(user.email, subject, text);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { enrolUser };
