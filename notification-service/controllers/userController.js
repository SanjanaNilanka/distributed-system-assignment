const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../service/sms.service");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//use nodemailer
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

    let formattedPhone = phone;
    if (!phone.startsWith("+")) {
      formattedPhone = "+94" + phone;
    }

    // enrol method
    const user = await User.enrol(name, email, phone);

    const message = `Welcome, ${user.name}! You have successfully enrolled at LearnVerse. Check out our courses and enroll now!`;

    await sendSMS(user.phone, message);

    // Send email
    const subject = "Enrollment Confirmation";
    const text = `Hello ${user.name},\n\nYou have successfully enrolled at LearnVerse`;
    await sendEmail(user.email, subject, text);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { enrolUser };
